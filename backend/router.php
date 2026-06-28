<?php
declare(strict_types=1);

$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

if (str_starts_with($uri, '/uploads/')) {
    $file = dirname(__DIR__) . '/public' . $uri;
    if (is_file($file)) {
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        $types = [
            'webp' => 'image/webp',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif',
        ];
        header('Content-Type: ' . ($types[$ext] ?? 'application/octet-stream'));
        header('Cache-Control: public, max-age=31536000, immutable');
        readfile($file);
        return true;
    }
    http_response_code(404);
    echo 'Not found';
    return true;
}

return false;
