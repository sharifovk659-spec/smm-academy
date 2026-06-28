<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/ContentRepository.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/includes/media-picker.php';
require_once __DIR__ . '/includes/nav.php';

requireAuth();

$content = ContentRepository::get();
$testimonials = $content['testimonials'] ?? [];
$items = $testimonials['items'] ?? [];
$flashSuccess = '';
$loadMediaPicker = true;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $testimonials['badge'] = trim($_POST['badge'] ?? '');
    $testimonials['title'] = trim($_POST['title'] ?? '');
    $testimonials['titleHighlight'] = trim($_POST['titleHighlight'] ?? '');

    $newItems = [];
    $count = (int)($_POST['count'] ?? 0);
    for ($i = 0; $i < $count; $i++) {
        $newItems[] = [
            'name' => trim($_POST["name_$i"] ?? ''),
            'result' => trim($_POST["result_$i"] ?? ''),
            'image' => parseImageField($_POST["image_$i"] ?? '', $_POST["image_{$i}_json"] ?? ''),
            'thumbnail' => parseImageField($_POST["thumbnail_$i"] ?? '', $_POST["thumbnail_{$i}_json"] ?? ''),
            'videoType' => 'youtube',
            'videoUrl' => trim($_POST["videoUrl_$i"] ?? ''),
        ];
    }
    $testimonials['items'] = $newItems;
    ContentRepository::updateSection('testimonials', $testimonials);
    logAction('update', 'testimonials');
    $items = $newItems;
    $flashSuccess = 'Отзывы навсозӣ шуданд!';
}

$pageTitle = 'Отзывы';
$currentPage = 'testimonials';
require __DIR__ . '/includes/header.php';
adminPageHeader('Отзывы', 'Video Reviews — avatar, name, result');
?>

<form method="POST">
  <div class="card">
    <div class="card-title">Section Header</div>
    <div class="form-row">
      <div class="form-group"><label>Badge</label><input name="badge" value="<?= htmlspecialchars($testimonials['badge'] ?? '') ?>"></div>
      <div class="form-group"><label>Title</label><input name="title" value="<?= htmlspecialchars($testimonials['title'] ?? '') ?>"></div>
      <div class="form-group"><label>Highlight</label><input name="titleHighlight" value="<?= htmlspecialchars($testimonials['titleHighlight'] ?? '') ?>"></div>
    </div>
  </div>

  <input type="hidden" name="count" value="<?= count($items) ?>">
  <?php foreach ($items as $i => $item): ?>
  <div class="item-block">
    <div class="item-block-header">#<?= $i + 1 ?> — <?= htmlspecialchars($item['name'] ?? '') ?></div>
    <div class="form-row">
      <div class="form-group"><label>Name</label><input name="name_<?= $i ?>" value="<?= htmlspecialchars($item['name'] ?? '') ?>"></div>
      <div class="form-group"><label>Result</label><input name="result_<?= $i ?>" value="<?= htmlspecialchars($item['result'] ?? '') ?>"></div>
    </div>
    <?php renderMediaPicker("image_$i", "image_{$i}_json", $item['image'] ?? '', 'Avatar'); ?>
    <?php renderMediaPicker("thumbnail_$i", "thumbnail_{$i}_json", $item['thumbnail'] ?? '', 'Video Thumbnail'); ?>
    <div class="form-group"><label>YouTube Video ID</label><input name="videoUrl_<?= $i ?>" value="<?= htmlspecialchars($item['videoUrl'] ?? '') ?>"></div>
  </div>
  <?php endforeach; ?>

  <button type="submit" class="btn btn-primary">💾 Навсозӣ кардан</button>
</form>

<?php require __DIR__ . '/includes/footer.php'; ?>
