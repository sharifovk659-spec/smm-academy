<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';

class MediaService
{
  private const SIZE_LABELS = [
    1920 => 'desktop',
    1440 => 'laptop',
    768 => 'tablet',
    390 => 'mobile',
  ];

  public static function breakpoints(): array
  {
    return MEDIA_BREAKPOINTS;
  }

  public static function ensureUploadDir(): void
  {
    if (!is_dir(UPLOAD_DIR)) {
      mkdir(UPLOAD_DIR, 0755, true);
    }
  }

  public static function upload(array $file, string $alt = ''): array
  {
    self::ensureUploadDir();

    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
      throw new RuntimeException('Хатогии upload');
    }

    $maxSize = 10 * 1024 * 1024;
    if (($file['size'] ?? 0) > $maxSize) {
      throw new RuntimeException('Андозаи файл зиёд аз 10MB аст');
    }

    $tmpPath = $file['tmp_name'] ?? '';
    $imageInfo = @getimagesize($tmpPath);
    if ($imageInfo === false) {
      throw new RuntimeException('Файл танҳо сурат бошад (JPG, PNG, WebP, GIF)');
    }

    $mime = $imageInfo['mime'];
    $allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!in_array($mime, $allowed, true)) {
      throw new RuntimeException('Формати нодуруст');
    }

    if (!function_exists('imagewebp')) {
      throw new RuntimeException('PHP GD бо WebP лозим аст');
    }

    $src = self::loadImage($tmpPath, $mime);
    if ($src === false) {
      throw new RuntimeException('Хондани сурат ноком шуд');
    }

    $origW = imagesx($src);
    $origH = imagesy($src);
    $id = bin2hex(random_bytes(8));
    $dir = UPLOAD_DIR . '/' . $id;
    mkdir($dir, 0755, true);

    $sizes = [];
    foreach (MEDIA_BREAKPOINTS as $width) {
      $label = self::SIZE_LABELS[$width];
      $resized = self::resizeToWidth($src, $width);
      $filename = $label . '-' . $width . '.webp';
      $path = $dir . '/' . $filename;
      imagewebp($resized, $path, 85);
      imagedestroy($resized);
      $sizes[(string) $width] = UPLOAD_URL . '/' . $id . '/' . $filename;
    }

    imagedestroy($src);

    $defaultUrl = $sizes['1920'] ?? $sizes['1440'] ?? reset($sizes);
    $originalName = basename($file['name'] ?? 'image.jpg');

    $media = [
      'id' => $id,
      'filename' => pathinfo($originalName, PATHINFO_FILENAME),
      'original_name' => $originalName,
      'mime_type' => 'image/webp',
      'width' => $origW,
      'height' => $origH,
      'webp' => true,
      'default' => $defaultUrl,
      'sizes' => $sizes,
      'alt' => $alt,
      'created_at' => date('c'),
    ];

    self::saveToDb($media);
    return $media;
  }

  public static function listAll(): array
  {
    try {
      $stmt = db()->query('SELECT * FROM media ORDER BY created_at DESC');
      $rows = $stmt->fetchAll();
      return array_map([self::class, 'formatRow'], $rows);
    } catch (Throwable) {
      return self::listFromFilesystem();
    }
  }

  public static function getById(string $id): ?array
  {
    try {
      $stmt = db()->prepare('SELECT * FROM media WHERE id = ?');
      $stmt->execute([$id]);
      $row = $stmt->fetch();
      return $row ? self::formatRow($row) : null;
    } catch (Throwable) {
      return null;
    }
  }

  public static function delete(string $id): bool
  {
    $id = preg_replace('/[^a-f0-9]/', '', $id);
    if (!$id) {
      return false;
    }

    $dir = UPLOAD_DIR . '/' . $id;
    if (is_dir($dir)) {
      self::removeDir($dir);
    }

    try {
      $stmt = db()->prepare('DELETE FROM media WHERE id = ?');
      $stmt->execute([$id]);
    } catch (Throwable) {
      // filesystem-only delete is fine
    }

    return true;
  }

  public static function toImageValue(array $media): array
  {
    return [
      'default' => $media['default'],
      'sizes' => $media['sizes'],
      'alt' => $media['alt'] ?? '',
      'webp' => true,
    ];
  }

  private static function saveToDb(array $media): void
  {
    try {
      $stmt = db()->prepare(
        'INSERT INTO media (id, filename, original_name, mime_type, width, height, sizes, default_url, alt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
      );
      $stmt->execute([
        $media['id'],
        $media['filename'],
        $media['original_name'],
        $media['mime_type'],
        $media['width'],
        $media['height'],
        json_encode($media['sizes'], JSON_UNESCAPED_UNICODE),
        $media['default'],
        $media['alt'],
      ]);
    } catch (Throwable) {
      // DB optional — files still work
    }
  }

  private static function formatRow(array $row): array
  {
    $sizes = is_string($row['sizes'] ?? null)
      ? json_decode($row['sizes'], true)
      : ($row['sizes'] ?? []);

    return [
      'id' => $row['id'],
      'filename' => $row['filename'],
      'original_name' => $row['original_name'],
      'mime_type' => $row['mime_type'],
      'width' => (int) ($row['width'] ?? 0),
      'height' => (int) ($row['height'] ?? 0),
      'webp' => true,
      'default' => $row['default_url'],
      'sizes' => $sizes ?: [],
      'alt' => $row['alt'] ?? '',
      'created_at' => $row['created_at'] ?? '',
    ];
  }

  private static function listFromFilesystem(): array
  {
    self::ensureUploadDir();
    $items = [];
    foreach (glob(UPLOAD_DIR . '/*', GLOB_ONLYDIR) ?: [] as $dir) {
      $id = basename($dir);
      $files = glob($dir . '/*.webp') ?: [];
      if (empty($files)) {
        continue;
      }
      $sizes = [];
      foreach ($files as $file) {
        if (preg_match('/(\d+)\.webp$/', $file, $m)) {
          $sizes[$m[1]] = UPLOAD_URL . '/' . $id . '/' . basename($file);
        }
      }
      ksort($sizes, SORT_NUMERIC);
      $items[] = [
        'id' => $id,
        'filename' => $id,
        'original_name' => $id,
        'webp' => true,
        'default' => $sizes['1920'] ?? reset($sizes),
        'sizes' => $sizes,
        'alt' => '',
        'created_at' => date('c', filemtime($dir)),
      ];
    }
    return $items;
  }

  private static function loadImage(string $path, string $mime)
  {
    return match ($mime) {
      'image/jpeg' => imagecreatefromjpeg($path),
      'image/png' => imagecreatefrompng($path),
      'image/webp' => imagecreatefromwebp($path),
      'image/gif' => imagecreatefromgif($path),
      default => false,
    };
  }

  private static function resizeToWidth($src, int $targetWidth)
  {
    $origW = imagesx($src);
    $origH = imagesy($src);

    if ($origW <= $targetWidth) {
      $dest = imagecreatetruecolor($origW, $origH);
      self::preserveAlpha($dest);
      imagecopy($dest, $src, 0, 0, 0, 0, $origW, $origH);
      return $dest;
    }

    $newH = (int) round($origH * ($targetWidth / $origW));
    $dest = imagecreatetruecolor($targetWidth, $newH);
    self::preserveAlpha($dest);
    imagecopyresampled($dest, $src, 0, 0, 0, 0, $targetWidth, $newH, $origW, $origH);
    return $dest;
  }

  private static function preserveAlpha($image): void
  {
    imagealphablending($image, false);
    imagesavealpha($image, true);
    $transparent = imagecolorallocatealpha($image, 0, 0, 0, 127);
    imagefill($image, 0, 0, $transparent);
  }

  private static function removeDir(string $dir): void
  {
    foreach (glob($dir . '/*') ?: [] as $file) {
      if (is_file($file)) {
        unlink($file);
      }
    }
    rmdir($dir);
  }
}
