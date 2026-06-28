<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/ContentRepository.php';
require_once __DIR__ . '/includes/nav.php';

requireAuth();

$content = ContentRepository::get();
$cta = $content['cta'] ?? [];
$flashSuccess = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cta['title'] = trim($_POST['title'] ?? '');
    $cta['titleHighlight'] = trim($_POST['titleHighlight'] ?? '');
    $cta['subtitle'] = trim($_POST['subtitle'] ?? '');
    $cta['button'] = trim($_POST['button'] ?? '');
    $cta['guarantee'] = trim($_POST['guarantee'] ?? '');
    $cta['whatsapp']['label'] = trim($_POST['whatsapp_label'] ?? '');
    $cta['whatsapp']['href'] = trim($_POST['whatsapp_href'] ?? '');
    $cta['telegram']['label'] = trim($_POST['telegram_label'] ?? '');
    $cta['telegram']['href'] = trim($_POST['telegram_href'] ?? '');
    ContentRepository::updateSection('cta', $cta);
    logAction('update', 'cta');
    $flashSuccess = 'CTA навсозӣ шуд!';
}

$pageTitle = 'CTA';
$currentPage = 'cta';
require __DIR__ . '/includes/header.php';
adminPageHeader('Final CTA', 'Блоки охирин — тугма, WhatsApp, Telegram');
?>

<form method="POST">
  <div class="card">
    <div class="card-title">Матн</div>
    <div class="form-row">
      <div class="form-group"><label>Title</label><input name="title" value="<?= htmlspecialchars($cta['title'] ?? '') ?>"></div>
      <div class="form-group"><label>Highlight</label><input name="titleHighlight" value="<?= htmlspecialchars($cta['titleHighlight'] ?? '') ?>"></div>
    </div>
    <div class="form-group"><label>Subtitle</label><textarea name="subtitle"><?= htmlspecialchars($cta['subtitle'] ?? '') ?></textarea></div>
    <div class="form-row">
      <div class="form-group"><label>Button</label><input name="button" value="<?= htmlspecialchars($cta['button'] ?? '') ?>"></div>
      <div class="form-group"><label>Guarantee</label><input name="guarantee" value="<?= htmlspecialchars($cta['guarantee'] ?? '') ?>"></div>
    </div>
  </div>
  <div class="card">
    <div class="card-title">Контактҳо</div>
    <div class="form-row">
      <div class="form-group"><label>WhatsApp Label</label><input name="whatsapp_label" value="<?= htmlspecialchars($cta['whatsapp']['label'] ?? '') ?>"></div>
      <div class="form-group"><label>WhatsApp Link</label><input name="whatsapp_href" value="<?= htmlspecialchars($cta['whatsapp']['href'] ?? '') ?>"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Telegram Label</label><input name="telegram_label" value="<?= htmlspecialchars($cta['telegram']['label'] ?? '') ?>"></div>
      <div class="form-group"><label>Telegram Link</label><input name="telegram_href" value="<?= htmlspecialchars($cta['telegram']['href'] ?? '') ?>"></div>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">💾 Навсозӣ кардан</button>
</form>

<?php require __DIR__ . '/includes/footer.php'; ?>
