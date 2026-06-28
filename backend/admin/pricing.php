<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/ContentRepository.php';
require_once __DIR__ . '/includes/nav.php';

requireAuth();

$content = ContentRepository::get();
$pricing = $content['pricing'] ?? [];
$plans = $pricing['plans'] ?? [];
$flashSuccess = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pricing['badge'] = trim($_POST['badge'] ?? '');
    $pricing['title'] = trim($_POST['title'] ?? '');
    $pricing['titleHighlight'] = trim($_POST['titleHighlight'] ?? '');

    $newPlans = [];
    $count = (int)($_POST['count'] ?? 0);
    for ($i = 0; $i < $count; $i++) {
        $features = array_values(array_filter(array_map('trim', explode("\n", $_POST["features_$i"] ?? ''))));
        $newPlans[] = [
            'name' => trim($_POST["name_$i"] ?? ''),
            'tier' => trim($_POST["tier_$i"] ?? ''),
            'price' => trim($_POST["price_$i"] ?? ''),
            'currency' => trim($_POST["currency_$i"] ?? ''),
            'period' => trim($_POST["period_$i"] ?? ''),
            'description' => trim($_POST["description_$i"] ?? ''),
            'features' => $features,
            'cta' => trim($_POST["cta_$i"] ?? ''),
        ];
    }
    $pricing['plans'] = $newPlans;
    ContentRepository::updateSection('pricing', $pricing);
    logAction('update', 'pricing');
    $plans = $newPlans;
    $flashSuccess = 'Тарифҳо навсозӣ шуданд!';
}

$pageTitle = 'Тарифҳо';
$currentPage = 'pricing';
require __DIR__ . '/includes/header.php';
adminPageHeader('Тарифҳо', 'Standard / Pro / VIP — 3 premium cards');
?>

<form method="POST">
  <div class="card">
    <div class="card-title">Section Header</div>
    <div class="form-row">
      <div class="form-group"><label>Badge</label><input name="badge" value="<?= htmlspecialchars($pricing['badge'] ?? '') ?>"></div>
      <div class="form-group"><label>Title</label><input name="title" value="<?= htmlspecialchars($pricing['title'] ?? '') ?>"></div>
      <div class="form-group"><label>Highlight</label><input name="titleHighlight" value="<?= htmlspecialchars($pricing['titleHighlight'] ?? '') ?>"></div>
    </div>
  </div>

  <input type="hidden" name="count" value="<?= count($plans) ?>">
  <?php foreach ($plans as $i => $plan): ?>
  <div class="item-block">
    <div class="item-block-header"><?= htmlspecialchars($plan['name'] ?? "Plan $i") ?> (<?= htmlspecialchars($plan['tier'] ?? '') ?>)</div>
    <div class="form-row">
      <div class="form-group"><label>Name</label><input name="name_<?= $i ?>" value="<?= htmlspecialchars($plan['name'] ?? '') ?>"></div>
      <div class="form-group"><label>Tier</label><input name="tier_<?= $i ?>" value="<?= htmlspecialchars($plan['tier'] ?? '') ?>"></div>
      <div class="form-group"><label>Price</label><input name="price_<?= $i ?>" value="<?= htmlspecialchars($plan['price'] ?? '') ?>"></div>
      <div class="form-group"><label>Currency</label><input name="currency_<?= $i ?>" value="<?= htmlspecialchars($plan['currency'] ?? '') ?>"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Period</label><input name="period_<?= $i ?>" value="<?= htmlspecialchars($plan['period'] ?? '') ?>"></div>
      <div class="form-group"><label>Description</label><input name="description_<?= $i ?>" value="<?= htmlspecialchars($plan['description'] ?? '') ?>"></div>
      <div class="form-group"><label>CTA</label><input name="cta_<?= $i ?>" value="<?= htmlspecialchars($plan['cta'] ?? '') ?>"></div>
    </div>
    <div class="form-group"><label>Features (як сатр — як feature)</label><textarea name="features_<?= $i ?>" rows="5"><?= htmlspecialchars(implode("\n", $plan['features'] ?? [])) ?></textarea></div>
  </div>
  <?php endforeach; ?>

  <button type="submit" class="btn btn-primary">💾 Навсозӣ кардан</button>
</form>

<?php require __DIR__ . '/includes/footer.php'; ?>
