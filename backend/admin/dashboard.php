<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/ContentRepository.php';
require_once __DIR__ . '/includes/nav.php';

requireAuth();

$stats = ContentRepository::getStats();
$updatedAt = null;

try {
    require_once __DIR__ . '/../includes/db.php';
    $row = db()->query('SELECT updated_at FROM site_content WHERE id = 1')->fetch();
    $updatedAt = $row['updated_at'] ?? null;
} catch (Throwable) {}

$pageTitle = 'Dashboard';
$currentPage = 'dashboard';
$showSaveBtn = false;
require __DIR__ . '/includes/header.php';
adminPageHeader('Dashboard', 'Хуш омадед — идоракунии контенти ' . adminSiteName());
?>

<div class="stats-grid stats-grid--premium">
  <div class="stat-card stat-card--premium stat-card--blocks">
    <div class="stat-card-icon"><?= adminIcon('blocks') ?></div>
    <div class="stat-card-body">
      <div class="value"><?= $stats['blocks'] ?></div>
      <div class="label">Блокҳо</div>
    </div>
  </div>
  <div class="stat-card stat-card--premium stat-card--videos">
    <div class="stat-card-icon"><?= adminIcon('video') ?></div>
    <div class="stat-card-body">
      <div class="value"><?= $stats['videos'] ?></div>
      <div class="label">Видеоҳо</div>
    </div>
  </div>
  <div class="stat-card stat-card--premium stat-card--reviews">
    <div class="stat-card-icon"><?= adminIcon('star') ?></div>
    <div class="stat-card-body">
      <div class="value"><?= $stats['testimonials'] ?></div>
      <div class="label">Отзывы</div>
    </div>
  </div>
  <div class="stat-card stat-card--premium stat-card--pricing">
    <div class="stat-card-icon"><?= adminIcon('diamond') ?></div>
    <div class="stat-card-body">
      <div class="value"><?= $stats['pricing'] ?></div>
      <div class="label">Тарифҳо</div>
    </div>
  </div>
</div>

<div class="card card--premium last-update-card">
  <div class="last-update-inner">
    <div class="last-update-icon"><?= adminIcon('clock') ?></div>
    <div>
      <div class="last-update-label">Охирин тағйирот</div>
      <div class="last-update-value"><?= $updatedAt ? htmlspecialchars($updatedAt) : 'Ҳоло вуҷуд надорад' ?></div>
    </div>
  </div>
</div>

<div class="card card--premium">
  <div class="card-title">Quick Edit</div>
  <div class="quick-grid quick-grid--premium">
    <?php foreach (adminQuickEditItems() as $item): ?>
      <a href="<?= htmlspecialchars($item['href']) ?>" class="quick-link quick-link--premium">
        <span class="quick-link-icon"><?= adminIcon($item['icon']) ?></span>
        <span class="quick-link-label"><?= htmlspecialchars($item['label']) ?></span>
        <span class="quick-link-arrow">→</span>
      </a>
    <?php endforeach; ?>
  </div>
</div>

<?php require __DIR__ . '/includes/footer.php'; ?>
