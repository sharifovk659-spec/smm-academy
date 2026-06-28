<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/ContentRepository.php';
require_once __DIR__ . '/includes/nav.php';

requireAuth();

$content = ContentRepository::get();
$faq = $content['faq'] ?? [];
$items = $faq['items'] ?? [];
$flashSuccess = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $faq['badge'] = trim($_POST['badge'] ?? '');
    $faq['title'] = trim($_POST['title'] ?? '');
    $faq['titleHighlight'] = trim($_POST['titleHighlight'] ?? '');

    $newItems = [];
    $count = (int)($_POST['count'] ?? 0);
    for ($i = 0; $i < $count; $i++) {
        $newItems[] = [
            'question' => trim($_POST["question_$i"] ?? ''),
            'answer' => trim($_POST["answer_$i"] ?? ''),
        ];
    }
    $faq['items'] = $newItems;
    ContentRepository::updateSection('faq', $faq);
    logAction('update', 'faq');
    $items = $newItems;
    $flashSuccess = 'FAQ навсозӣ шуд!';
}

$pageTitle = 'FAQ';
$currentPage = 'faq';
require __DIR__ . '/includes/header.php';
adminPageHeader('FAQ', 'Accordion premium — саволҳо');
?>

<form method="POST">
  <div class="card">
    <div class="card-title">Section Header</div>
    <div class="form-row">
      <div class="form-group"><label>Badge</label><input name="badge" value="<?= htmlspecialchars($faq['badge'] ?? '') ?>"></div>
      <div class="form-group"><label>Title</label><input name="title" value="<?= htmlspecialchars($faq['title'] ?? '') ?>"></div>
      <div class="form-group"><label>Highlight</label><input name="titleHighlight" value="<?= htmlspecialchars($faq['titleHighlight'] ?? '') ?>"></div>
    </div>
  </div>

  <input type="hidden" name="count" value="<?= count($items) ?>">
  <?php foreach ($items as $i => $item): ?>
  <div class="item-block">
    <div class="item-block-header">#<?= $i + 1 ?></div>
    <div class="form-group"><label>Question</label><input name="question_<?= $i ?>" value="<?= htmlspecialchars($item['question'] ?? '') ?>"></div>
    <div class="form-group"><label>Answer</label><textarea name="answer_<?= $i ?>"><?= htmlspecialchars($item['answer'] ?? '') ?></textarea></div>
  </div>
  <?php endforeach; ?>

  <button type="submit" class="btn btn-primary">💾 Навсозӣ кардан</button>
</form>

<?php require __DIR__ . '/includes/footer.php'; ?>
