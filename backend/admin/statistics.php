<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/ContentRepository.php';
require_once __DIR__ . '/includes/nav.php';

requireAuth();

$content = ContentRepository::get();
$items = $content['statistics']['items'] ?? [];
$flashSuccess = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $newItems = [];
    $count = (int)($_POST['count'] ?? 0);
    for ($i = 0; $i < $count; $i++) {
        $newItems[] = [
            'value' => trim($_POST["value_$i"] ?? ''),
            'label' => trim($_POST["label_$i"] ?? ''),
            'description' => trim($_POST["description_$i"] ?? ''),
            'icon' => trim($_POST["icon_$i"] ?? 'FiUsers'),
            'counter' => [
                'end' => (float)($_POST["counter_end_$i"] ?? 0),
                'suffix' => trim($_POST["counter_suffix_$i"] ?? ''),
                'decimals' => (int)($_POST["counter_decimals_$i"] ?? 0) ?: null,
            ],
        ];
        if ($newItems[$i]['counter']['decimals'] === null) {
            unset($newItems[$i]['counter']['decimals']);
        }
    }
    ContentRepository::updateSection('statistics', ['items' => $newItems]);
    logAction('update', 'statistics');
    $items = $newItems;
    $flashSuccess = 'Рақамҳо навсозӣ шуданд!';
}

$pageTitle = 'Рақамҳо';
$currentPage = 'statistics';
require __DIR__ . '/includes/header.php';
adminPageHeader('Statistics', '4 premium cards бо counter animation');
?>

<form method="POST">
  <input type="hidden" name="count" value="<?= count($items) ?>">
  <?php foreach ($items as $i => $item): ?>
  <div class="item-block">
    <div class="item-block-header">Карта #<?= $i + 1 ?></div>
    <div class="form-row">
      <div class="form-group">
        <label>Value (намоиш)</label>
        <input type="text" name="value_<?= $i ?>" value="<?= htmlspecialchars($item['value'] ?? '') ?>">
      </div>
      <div class="form-group">
        <label>Label</label>
        <input type="text" name="label_<?= $i ?>" value="<?= htmlspecialchars($item['label'] ?? '') ?>">
      </div>
    </div>
    <div class="form-group">
      <label>Description</label>
      <input type="text" name="description_<?= $i ?>" value="<?= htmlspecialchars($item['description'] ?? '') ?>">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Counter End</label>
        <input type="number" step="0.1" name="counter_end_<?= $i ?>" value="<?= htmlspecialchars((string)($item['counter']['end'] ?? '')) ?>">
      </div>
      <div class="form-group">
        <label>Counter Suffix</label>
        <input type="text" name="counter_suffix_<?= $i ?>" value="<?= htmlspecialchars($item['counter']['suffix'] ?? '') ?>">
      </div>
      <div class="form-group">
        <label>Decimals</label>
        <input type="number" name="counter_decimals_<?= $i ?>" value="<?= htmlspecialchars((string)($item['counter']['decimals'] ?? '')) ?>">
      </div>
      <div class="form-group">
        <label>Icon</label>
        <input type="text" name="icon_<?= $i ?>" value="<?= htmlspecialchars($item['icon'] ?? '') ?>">
      </div>
    </div>
  </div>
  <?php endforeach; ?>
  <button type="submit" class="btn btn-primary">💾 Навсозӣ кардан</button>
</form>

<?php require __DIR__ . '/includes/footer.php'; ?>
