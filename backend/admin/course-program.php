<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/ContentRepository.php';
require_once __DIR__ . '/includes/nav.php';

requireAuth();

$content = ContentRepository::get();
$section = $content['courseProgram'] ?? [];
$items = $section['items'] ?? [];
$flashSuccess = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $section['badge'] = trim($_POST['badge'] ?? '');
    $section['title'] = trim($_POST['title'] ?? '');
    $section['titleHighlight'] = trim($_POST['titleHighlight'] ?? '');
    $section['progressLabel'] = trim($_POST['progressLabel'] ?? '');
    $newItems = [];
    $count = (int)($_POST['count'] ?? 0);
    for ($i = 0; $i < $count; $i++) {
        $topics = array_values(array_filter(array_map('trim', explode(',', $_POST["topics_$i"] ?? ''))));
        $newItems[] = [
            'number' => (int)($_POST["number_$i"] ?? $i + 1),
            'title' => trim($_POST["title_$i"] ?? ''),
            'description' => trim($_POST["desc_$i"] ?? ''),
            'duration' => trim($_POST["duration_$i"] ?? ''),
            'topics' => $topics,
        ];
    }
    $section['items'] = $newItems;
    ContentRepository::updateSection('courseProgram', $section);
    logAction('update', 'courseProgram');
    $items = $newItems;
    $flashSuccess = 'Барномаи курс навсозӣ шуд!';
}

$pageTitle = 'Барномаи курс';
$currentPage = 'course-program';
require __DIR__ . '/includes/header.php';
adminPageHeader('Барномаи курс', 'Timeline — 6 модул');
?>

<form method="POST">
  <div class="card">
    <div class="card-title">Заголовок</div>
    <div class="form-row">
      <div class="form-group"><label>Badge</label><input name="badge" value="<?= htmlspecialchars($section['badge'] ?? '') ?>"></div>
      <div class="form-group"><label>Title</label><input name="title" value="<?= htmlspecialchars($section['title'] ?? '') ?>"></div>
      <div class="form-group"><label>Highlight</label><input name="titleHighlight" value="<?= htmlspecialchars($section['titleHighlight'] ?? '') ?>"></div>
    </div>
    <div class="form-group"><label>Progress Label</label><input name="progressLabel" value="<?= htmlspecialchars($section['progressLabel'] ?? '') ?>"></div>
  </div>
  <input type="hidden" name="count" value="<?= count($items) ?>">
  <?php foreach ($items as $i => $item): ?>
  <div class="item-block">
    <div class="item-block-header">Модул #<?= (int)($item['number'] ?? $i + 1) ?></div>
    <div class="form-row">
      <div class="form-group"><label>Number</label><input type="number" name="number_<?= $i ?>" value="<?= (int)($item['number'] ?? $i + 1) ?>"></div>
      <div class="form-group"><label>Duration</label><input name="duration_<?= $i ?>" value="<?= htmlspecialchars($item['duration'] ?? '') ?>"></div>
    </div>
    <div class="form-group"><label>Title</label><input name="title_<?= $i ?>" value="<?= htmlspecialchars($item['title'] ?? '') ?>"></div>
    <div class="form-group"><label>Description</label><textarea name="desc_<?= $i ?>"><?= htmlspecialchars($item['description'] ?? '') ?></textarea></div>
    <div class="form-group"><label>Topics (бо вергул)</label><input name="topics_<?= $i ?>" value="<?= htmlspecialchars(implode(', ', $item['topics'] ?? [])) ?>"></div>
  </div>
  <?php endforeach; ?>
  <button type="submit" class="btn btn-primary">💾 Навсозӣ кардан</button>
</form>

<?php require __DIR__ . '/includes/footer.php'; ?>
