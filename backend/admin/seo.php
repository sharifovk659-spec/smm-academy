<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/ContentRepository.php';
require_once __DIR__ . '/includes/nav.php';

requireAuth();

$content = ContentRepository::get();
$site = $content['site'] ?? [];
$flashSuccess = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $site['name'] = trim($_POST['name'] ?? '');
    $site['title'] = trim($_POST['title'] ?? '');
    $site['description'] = trim($_POST['description'] ?? '');
    $site['url'] = trim($_POST['url'] ?? '');
    $site['locale'] = trim($_POST['locale'] ?? 'tg_TJ');
    $keywords = array_values(array_filter(array_map('trim', explode(',', $_POST['keywords'] ?? ''))));
    $site['keywords'] = $keywords;
    ContentRepository::updateSection('site', $site);
    logAction('update', 'seo');
    $flashSuccess = 'SEO навсозӣ шуд!';
}

$pageTitle = 'SEO';
$currentPage = 'seo';
require __DIR__ . '/includes/header.php';
adminPageHeader('SEO', 'Title, Description, Keywords, Open Graph');
?>

<form method="POST">
  <div class="card">
    <div class="card-title">Мета-тегҳо</div>
    <div class="form-row">
      <div class="form-group"><label>Site Name</label><input name="name" value="<?= htmlspecialchars($site['name'] ?? '') ?>"></div>
      <div class="form-group"><label>URL</label><input name="url" value="<?= htmlspecialchars($site['url'] ?? '') ?>"></div>
    </div>
    <div class="form-group"><label>Title</label><input name="title" value="<?= htmlspecialchars($site['title'] ?? '') ?>"></div>
    <div class="form-group"><label>Description</label><textarea name="description" rows="3"><?= htmlspecialchars($site['description'] ?? '') ?></textarea></div>
    <div class="form-group"><label>Keywords (бо вергул)</label><input name="keywords" value="<?= htmlspecialchars(implode(', ', $site['keywords'] ?? [])) ?>"></div>
    <div class="form-group"><label>Locale</label><input name="locale" value="<?= htmlspecialchars($site['locale'] ?? 'tg_TJ') ?>"></div>
  </div>
  <button type="submit" class="btn btn-primary">💾 Навсозӣ кардан</button>
</form>

<?php require __DIR__ . '/includes/footer.php'; ?>
