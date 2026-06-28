<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/ContentRepository.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/includes/media-picker.php';
require_once __DIR__ . '/includes/nav.php';

requireAuth();

$content = ContentRepository::get();
$about = $content['about'] ?? [];
$flashSuccess = '';
$loadMediaPicker = true;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $about['badge'] = trim($_POST['badge'] ?? '');
    $about['title'] = trim($_POST['title'] ?? '');
    $about['titleHighlight'] = trim($_POST['titleHighlight'] ?? '');
    $about['image'] = parseImageField($_POST['image'] ?? '', $_POST['image_json'] ?? '');
    $about['imageAlt'] = trim($_POST['imageAlt'] ?? '');
    $about['paragraphs'] = array_values(array_filter(array_map('trim', explode("\n\n", $_POST['paragraphs'] ?? ''))));
    $about['highlights'] = array_values(array_filter(array_map('trim', explode("\n", $_POST['highlights'] ?? ''))));
    ContentRepository::updateSection('about', $about);
    logAction('update', 'about');
    $flashSuccess = 'About Course навсозӣ шуд!';
}

$pageTitle = 'About Course';
$currentPage = 'about';
require __DIR__ . '/includes/header.php';
adminPageHeader('About Course', 'Дар бораи курс — матн, сурат, highlights');
?>

<form method="POST">
  <div class="card">
    <div class="card-title">Заголовок</div>
    <div class="form-row">
      <div class="form-group"><label>Badge</label><input name="badge" value="<?= htmlspecialchars($about['badge'] ?? '') ?>"></div>
      <div class="form-group"><label>Highlight</label><input name="titleHighlight" value="<?= htmlspecialchars($about['titleHighlight'] ?? '') ?>"></div>
    </div>
    <div class="form-group"><label>Title</label><input name="title" value="<?= htmlspecialchars($about['title'] ?? '') ?>"></div>
  </div>
  <div class="card">
    <div class="card-title">Матн</div>
    <div class="form-group"><label>Paragraphs (ҷудо бо холӣ)</label><textarea name="paragraphs" rows="5"><?= htmlspecialchars(implode("\n\n", $about['paragraphs'] ?? [])) ?></textarea></div>
    <div class="form-group"><label>Highlights (як сатр — як item)</label><textarea name="highlights" rows="4"><?= htmlspecialchars(implode("\n", $about['highlights'] ?? [])) ?></textarea></div>
  </div>
  <div class="card">
    <div class="card-title">Сурат</div>
    <div class="form-group"><label>Image Alt</label><input name="imageAlt" value="<?= htmlspecialchars($about['imageAlt'] ?? '') ?>"></div>
    <?php renderMediaPicker('image', 'image_json', $about['image'] ?? '', 'About Image'); ?>
  </div>
  <button type="submit" class="btn btn-primary">💾 Навсозӣ кардан</button>
</form>

<?php require __DIR__ . '/includes/footer.php'; ?>
