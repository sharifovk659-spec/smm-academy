<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/ContentRepository.php';
require_once __DIR__ . '/includes/nav.php';

requireAuth();

$content = ContentRepository::get();
$section = $content['studentResults'] ?? [];
$items = $section['items'] ?? [];
$flashSuccess = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $section['badge'] = trim($_POST['badge'] ?? '');
    $section['title'] = trim($_POST['title'] ?? '');
    $section['titleHighlight'] = trim($_POST['titleHighlight'] ?? '');
    $newItems = [];
    $count = (int)($_POST['count'] ?? 0);
    for ($i = 0; $i < $count; $i++) {
        $metrics = [];
        for ($m = 0; $m < 3; $m++) {
            $label = trim($_POST["m{$i}_{$m}_label"] ?? '');
            if ($label === '') continue;
            $metric = [
                'label' => $label,
                'before' => (float)($_POST["m{$i}_{$m}_before"] ?? 0),
                'after' => (float)($_POST["m{$i}_{$m}_after"] ?? 0),
                'suffix' => trim($_POST["m{$i}_{$m}_suffix"] ?? ''),
            ];
            $prefix = trim($_POST["m{$i}_{$m}_prefix"] ?? '');
            if ($prefix !== '') $metric['prefix'] = $prefix;
            $decimals = $_POST["m{$i}_{$m}_decimals"] ?? '';
            if ($decimals !== '') $metric['decimals'] = (int)$decimals;
            $metrics[] = $metric;
        }
        $newItems[] = [
            'name' => trim($_POST["name_$i"] ?? ''),
            'role' => trim($_POST["role_$i"] ?? ''),
            'period' => trim($_POST["period_$i"] ?? ''),
            'growthPercent' => (int)($_POST["growth_$i"] ?? 0),
            'metrics' => $metrics,
        ];
    }
    $section['items'] = $newItems;
    ContentRepository::updateSection('studentResults', $section);
    logAction('update', 'studentResults');
    $items = $newItems;
    $flashSuccess = 'Натиҷаҳои шогирдон навсозӣ шуд!';
}

$pageTitle = 'Натиҷаҳои шогирдон';
$currentPage = 'student-results';
require __DIR__ . '/includes/header.php';
adminPageHeader('Натиҷаҳои шогирдон', 'Before/After — натиҷаҳои донишҷӯён');
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
  <?php foreach ($items as $i => $item):
    $metrics = $item['metrics'] ?? [];
    while (count($metrics) < 3) $metrics[] = [];
  ?>
  <div class="item-block">
    <div class="item-block-header"><?= htmlspecialchars($item['name'] ?? "Шогирд #$i") ?></div>
    <div class="form-row">
      <div class="form-group"><label>Name</label><input name="name_<?= $i ?>" value="<?= htmlspecialchars($item['name'] ?? '') ?>"></div>
      <div class="form-group"><label>Role</label><input name="role_<?= $i ?>" value="<?= htmlspecialchars($item['role'] ?? '') ?>"></div>
      <div class="form-group"><label>Period</label><input name="period_<?= $i ?>" value="<?= htmlspecialchars($item['period'] ?? '') ?>"></div>
      <div class="form-group"><label>Growth %</label><input type="number" name="growth_<?= $i ?>" value="<?= (int)($item['growthPercent'] ?? 0) ?>"></div>
    </div>
    <?php for ($m = 0; $m < 3; $m++):
      $met = $metrics[$m] ?? [];
    ?>
    <div class="form-row" style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.05)">
      <div class="form-group"><label>Metric <?= $m+1 ?> Label</label><input name="m<?= $i ?>_<?= $m ?>_label" value="<?= htmlspecialchars($met['label'] ?? '') ?>"></div>
      <div class="form-group"><label>Before</label><input type="number" step="any" name="m<?= $i ?>_<?= $m ?>_before" value="<?= htmlspecialchars((string)($met['before'] ?? '')) ?>"></div>
      <div class="form-group"><label>After</label><input type="number" step="any" name="m<?= $i ?>_<?= $m ?>_after" value="<?= htmlspecialchars((string)($met['after'] ?? '')) ?>"></div>
      <div class="form-group"><label>Prefix</label><input name="m<?= $i ?>_<?= $m ?>_prefix" value="<?= htmlspecialchars($met['prefix'] ?? '') ?>"></div>
      <div class="form-group"><label>Suffix</label><input name="m<?= $i ?>_<?= $m ?>_suffix" value="<?= htmlspecialchars($met['suffix'] ?? '') ?>"></div>
      <div class="form-group"><label>Decimals</label><input name="m<?= $i ?>_<?= $m ?>_decimals" value="<?= htmlspecialchars((string)($met['decimals'] ?? '')) ?>"></div>
    </div>
    <?php endfor; ?>
  </div>
  <?php endforeach; ?>
  <button type="submit" class="btn btn-primary">💾 Навсозӣ кардан</button>
</form>

<?php require __DIR__ . '/includes/footer.php'; ?>
