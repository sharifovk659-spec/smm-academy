<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/../config.php';

class ContentRepository
{
    public static function get(): array
    {
        try {
            $stmt = db()->query('SELECT content FROM site_content WHERE id = 1');
            $row = $stmt->fetch();
            if ($row && $row['content']) {
                $data = json_decode($row['content'], true);
                if (is_array($data)) {
                    return $data;
                }
            }
        } catch (Throwable) {
            // fallback to file
        }
        return self::loadFromFile();
    }

    public static function save(array $content): bool
    {
        $json = json_encode($content, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        $pdo = db();

        $stmt = $pdo->prepare(
            'INSERT INTO site_content (id, content) VALUES (1, :content)
             ON DUPLICATE KEY UPDATE content = :content2, updated_at = CURRENT_TIMESTAMP'
        );
        $stmt->execute(['content' => $json, 'content2' => $json]);

        self::syncToFiles($content);
        return true;
    }

    public static function updateSection(string $section, array $sectionData): array
    {
        $content = self::get();
        $content[$section] = $sectionData;
        self::save($content);
        return $content;
    }

    public static function mergeSection(string $section, array $partial): array
    {
        $content = self::get();
        $existing = $content[$section] ?? [];
        if (!is_array($existing)) {
            $existing = [];
        }
        $content[$section] = array_replace_recursive($existing, $partial);
        self::save($content);
        return $content;
    }

    public static function getStats(): array
    {
        $content = self::get();
        $blockSections = [
            'hero', 'statistics', 'about', 'forWhom', 'whatYouLearn',
            'videoCases', 'courseProgram', 'studentResults', 'instructors',
            'testimonials', 'pricing', 'faq', 'cta',
        ];
        return [
            'blocks' => count(array_filter($blockSections, fn($k) => !empty($content[$k]))),
            'statistics' => count($content['statistics']['items'] ?? []),
            'videos' => count($content['videoCases']['items'] ?? []),
            'testimonials' => count($content['testimonials']['items'] ?? []),
            'pricing' => count($content['pricing']['plans'] ?? []),
            'faq' => count($content['faq']['items'] ?? []),
            'modules' => count($content['courseProgram']['items'] ?? []),
        ];
    }

    public static function loadFromFile(): array
    {
        $paths = [SITE_JSON_PATH, PUBLIC_JSON_PATH];
        foreach ($paths as $path) {
            if (file_exists($path)) {
                $data = json_decode(file_get_contents($path), true);
                if (is_array($data)) {
                    return $data;
                }
            }
        }
        return [];
    }

    public static function seedFromFile(): void
    {
        $data = self::loadFromFile();
        if (!empty($data)) {
            self::save($data);
        }
    }

    private static function syncToFiles(array $content): void
    {
        $json = json_encode($content, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

        if (file_exists(dirname(SITE_JSON_PATH))) {
            file_put_contents(SITE_JSON_PATH, $json);
        }

        $publicDir = dirname(PUBLIC_JSON_PATH);
        if (!is_dir($publicDir)) {
            mkdir($publicDir, 0755, true);
        }
        file_put_contents(PUBLIC_JSON_PATH, $json);
    }
}
