<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/MediaService.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, DELETE, OPTIONS');
header('Cache-Control: no-cache');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $items = MediaService::listAll();
    echo json_encode([
        'items' => $items,
        'breakpoints' => MediaService::breakpoints(),
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($method === 'DELETE') {
    if (!isLoggedIn()) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }

    $id = $_GET['id'] ?? '';
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID required']);
        exit;
    }

    MediaService::delete($id);
    logAction('delete', 'media:' . $id);
    echo json_encode(['success' => true]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
