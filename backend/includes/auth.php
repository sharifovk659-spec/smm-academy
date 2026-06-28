<?php
declare(strict_types=1);

require_once __DIR__ . '/../config.php';

function isLoggedIn(): bool
{
    return !empty($_SESSION['admin_logged_in']);
}

function requireAuth(): void
{
    if (!isLoggedIn()) {
        header('Location: /admin/index.php');
        exit;
    }
}

function attemptLogin(string $username, string $password): bool
{
    if ($username === ADMIN_USERNAME && $password === ADMIN_PASSWORD) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_user'] = $username;
        return true;
    }
    return false;
}

function logout(): void
{
    $_SESSION = [];
    session_destroy();
}

function logAction(string $action, ?string $section = null): void
{
    try {
        require_once __DIR__ . '/db.php';
        $stmt = db()->prepare('INSERT INTO admin_logs (action, section) VALUES (?, ?)');
        $stmt->execute([$action, $section]);
    } catch (Throwable) {
        // ignore if DB not ready
    }
}
