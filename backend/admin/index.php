<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';

if (isLoggedIn()) {
    header('Location: /admin/dashboard.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (attemptLogin($username, $password)) {
        logAction('login');
        header('Location: /admin/dashboard.php');
        exit;
    }
    $error = 'Логин ё парол нодуруст аст';
}
?>
<!DOCTYPE html>
<html lang="tg">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Воридшавӣ — SMM Admin</title>
  <link rel="stylesheet" href="/admin/assets/admin.css">
</head>
<body>
  <div class="login-page">
    <div class="login-box">
      <h1>⚡ SMM Admin</h1>
      <p>Идоракунии контенти лендинг</p>
      <p class="login-hint">
        Логин: <code>login-admin</code><br>
        Парол: <code>Password-admin123</code>
      </p>
      <?php if ($error): ?>
        <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
      <?php endif; ?>
      <form method="POST">
        <div class="form-group">
          <label>Логин</label>
          <input type="text" name="username" required autocomplete="username" placeholder="login-admin">
        </div>
        <div class="form-group">
          <label>Парол</label>
          <input type="password" name="password" required autocomplete="current-password" placeholder="Password-admin123">
        </div>
        <button type="submit" class="btn btn-primary">Воридшавӣ</button>
      </form>
    </div>
  </div>
</body>
</html>
