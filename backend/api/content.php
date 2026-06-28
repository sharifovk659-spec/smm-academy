<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/ContentRepository.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Cache-Control: no-cache, must-revalidate');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

try {
    $content = ContentRepository::get();
    echo json_encode($content, JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to load content']);
}
