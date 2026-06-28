<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/ContentRepository.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/includes/media-picker.php';
require_once __DIR__ . '/includes/nav.php';

requireAuth();

$content = ContentRepository::get();
$videoCases = $content['videoCases'] ?? [];
$items = $videoCases['items'] ?? [];
$flashSuccess = '';
$loadMediaPicker = true;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $videoCases['badge'] = trim($_POST['badge'] ?? '');
    $videoCases['title'] = trim($_POST['title'] ?? '');
    $videoCases['titleHighlight'] = trim($_POST['titleHighlight'] ?? '');

    $newItems = [];
    $count = (int)($_POST['count'] ?? 0);
    for ($i = 0; $i < $count; $i++) {
        $newItems[] = [
            'title' => trim($_POST["title_$i"] ?? ''),
            'category' => trim($_POST["category_$i"] ?? ''),
            'description' => trim($_POST["description_$i"] ?? ''),
            'thumbnail' => parseImageField($_POST["thumbnail_$i"] ?? '', $_POST["thumbnail_{$i}_json"] ?? ''),
            'videoType' => trim($_POST["videoType_$i"] ?? 'youtube'),
            'videoUrl' => trim($_POST["videoUrl_$i"] ?? ''),
        ];
    }
    $videoCases['items'] = $newItems;
    ContentRepository::updateSection('videoCases', $videoCases);
    logAction('update', 'videos');
    $items = $newItems;
    $flashSuccess = 'Видеоҳо навсозӣ шуданд!';
}

$pageTitle = 'Видеоҳо';
$currentPage = 'videos';
require __DIR__ . '/includes/header.php';
adminPageHeader('Видеоҳо', 'Swiper slider — Reels, Кейс, Instagram');
?>

<form method="POST">
  <div class="card">
    <div class="card-title">Section Header</div>
    <div class="form-row">
      <div class="form-group"><label>Badge</label><input name="badge" value="<?= htmlspecialchars($videoCases['badge'] ?? '') ?>"></div>
      <div class="form-group"><label>Title</label><input name="title" value="<?= htmlspecialchars($videoCases['title'] ?? '') ?>"></div>
      <div class="form-group"><label>Highlight</label><input name="titleHighlight" value="<?= htmlspecialchars($videoCases['titleHighlight'] ?? '') ?>"></div>
    </div>
  </div>

  <input type="hidden" name="count" value="<?= count($items) ?>">
  <?php foreach ($items as $i => $item): ?>
  <div class="item-block">
    <div class="item-block-header">Видео #<?= $i + 1 ?> — <?= htmlspecialchars($item['category'] ?? '') ?></div>
    <div class="form-row">
      <div class="form-group"><label>Title</label><input name="title_<?= $i ?>" value="<?= htmlspecialchars($item['title'] ?? '') ?>"></div>
      <div class="form-group"><label>Category</label>
        <select name="category_<?= $i ?>">
          <?php foreach (['Reels', 'Кейс', 'Instagram'] as $cat): ?>
          <option <?= ($item['category'] ?? '') === $cat ? 'selected' : '' ?>><?= $cat ?></option>
          <?php endforeach; ?>
        </select>
      </div>
    </div>
    <div class="form-group"><label>Description</label><textarea name="description_<?= $i ?>"><?= htmlspecialchars($item['description'] ?? '') ?></textarea></div>
    <?php renderMediaPicker("thumbnail_$i", "thumbnail_{$i}_json", $item['thumbnail'] ?? '', 'Thumbnail'); ?>
    <div class="form-row">
      <div class="form-group"><label>Video Type</label>
        <select name="videoType_<?= $i ?>"><option value="youtube">youtube</option><option value="mp4">mp4</option></select>
      </div>
      <div class="form-group"><label>YouTube ID / Video URL</label><input name="videoUrl_<?= $i ?>" value="<?= htmlspecialchars($item['videoUrl'] ?? '') ?>"></div>
    </div>
  </div>
  <?php endforeach; ?>

  <button type="submit" class="btn btn-primary">💾 Навсозӣ кардан</button>
</form>

<?php require __DIR__ . '/includes/footer.php'; ?>
