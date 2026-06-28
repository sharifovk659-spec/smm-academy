<?php
declare(strict_types=1);

define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
define('DB_NAME', getenv('DB_NAME') ?: 'smm_academy');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '');
define('DB_CHARSET', 'utf8mb4');

define('ADMIN_USERNAME', 'login-admin');
define('ADMIN_PASSWORD', 'Password-admin123');

define('ROOT_PATH', dirname(__DIR__));
define('BASE_PATH', ROOT_PATH);

define('UPLOAD_DIR', ROOT_PATH . '/public/uploads');
define('UPLOAD_URL', '/uploads');

define('MEDIA_BREAKPOINTS', [1920, 1440, 768, 390]);

define('SITE_JSON_PATH', ROOT_PATH . '/src/config/site.json');
define('PUBLIC_JSON_PATH', ROOT_PATH . '/public/content/site.json');

session_start();
