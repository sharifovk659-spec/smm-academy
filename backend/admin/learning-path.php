<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/ContentRepository.php';
require_once __DIR__ . '/includes/nav.php';

requireAuth();

$content = ContentRepository::get();
$section = $content['learningPath'] ?? [];
$items = $section['items'] ?? [];
$flashSuccess = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $section['badge'] = trim($_POST['badge'] ?? '');
    $section['title'] = trim($_POST['title'] ?? '');
    $section['titleHighlight'] = trim($_POST['titleHighlight'] ?? '');

    $newItems = [];
    $count = (int)($_POST['count'] ?? 0);
    for ($i = 0; $i < $count; $i++) {
        $newItems[] = [
            'step' => trim($_POST["step_$i"] ?? ''),
            'title' => trim($_POST["title_$i"] ?? ''),
            'description' => trim($_POST["desc_$i"] ?? ''),
            'image' => trim($_POST["image_$i"] ?? ''),
        ];
    }
    $section['items'] = $newItems;
    ContentRepository::updateSection('learningPath', $section);
    logAction('update', 'learningPath');
    $items = $newItems;
    $flashSuccess = 'Роҳи омӯзиш бомуваффақият сабт шуд!';
}

if (empty($items)) {
    $items = [[
        'step' => '01',
        'title' => '',
        'description' => '',
        'image' => '',
    ]];
}

$pageTitle = 'Роҳи омӯзиш';
$currentPage = 'learning-path';
require __DIR__ . '/includes/header.php';
adminPageHeader('Твой путь обучения', '3 қадам — сурат, сарлавҳа, тавсиф');
?>

<form method="POST">
  <div class="card">
    <div class="card-title">Заголовок</div>
    <div class="form-row">
      <div class="form-group"><label>Badge</label><input name="badge" value="<?= htmlspecialchars($section['badge'] ?? '') ?>"></div>
      <div class="form-group"><label>Title</label><input name="title" value="<?= htmlspecialchars($section['title'] ?? '') ?>"></div>
      <div class="form-group"><label>Highlight</label><input name="titleHighlight" value="<?= htmlspecialchars($section['titleHighlight'] ?? '') ?>"></div>
    </div>
  </div>

  <input type="hidden" name="count" value="<?= count($items) ?>">
  <?php foreach ($items as $i => $item): ?>
  <div class="item-block">
    <div class="item-block-header">Қадам <?= htmlspecialchars($item['step'] ?? (string)($i + 1)) ?></div>
    <div class="form-row">
      <div class="form-group"><label>Step</label><input name="step_<?= $i ?>" value="<?= htmlspecialchars($item['step'] ?? '') ?>"></div>
      <div class="form-group"><label>Title</label><input name="title_<?= $i ?>" value="<?= htmlspecialchars($item['title'] ?? '') ?>"></div>
    </div>
    <div class="form-group"><label>Description</label><textarea name="desc_<?= $i ?>" rows="2"><?= htmlspecialchars($item['description'] ?? '') ?></textarea></div>
    <div class="form-group"><label>Image URL</label><input name="image_<?= $i ?>" value="<?= htmlspecialchars($item['image'] ?? '') ?>"></div>
  </div>
  <?php endforeach; ?>

  <button type="submit" class="btn btn-primary">💾 Навсозӣ кардан</button>
</form>

<?php require __DIR__ . '/includes/footer.php'; ?>
