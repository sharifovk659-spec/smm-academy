<?php
declare(strict_types=1);

$host = getenv('DB_HOST') ?: '127.0.0.1';
$user = getenv('DB_USER') ?: 'root';
$pass = getenv('DB_PASS') ?: '';
$dbName = getenv('DB_NAME') ?: 'smm_academy';

echo "Connecting to MySQL at {$host} as {$user}...\n";

try {
    $pdo = new PDO("mysql:host={$host};charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
    echo "✓ MySQL connected\n";

    $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$dbName}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "✓ Database {$dbName} ready\n";

    $pdo->exec("USE `{$dbName}`");

    $schema = file_get_contents(__DIR__ . '/schema.sql');
    $lines = preg_split('/\r\n|\n|\r/', $schema);
    $buffer = '';

    foreach ($lines as $line) {
        $trimmed = trim($line);
        if ($trimmed === '' || str_starts_with($trimmed, '--')) {
            continue;
        }
        if (preg_match('/^CREATE DATABASE/i', $trimmed) || preg_match('/^USE /i', $trimmed)) {
            continue;
        }
        $buffer .= $line . "\n";
        if (str_ends_with(rtrim($line), ';')) {
            $sql = trim($buffer);
            $buffer = '';
            if ($sql !== '') {
                $pdo->exec($sql);
            }
        }
    }

    echo "✓ Schema applied\n";

    require_once __DIR__ . '/../includes/ContentRepository.php';
    ContentRepository::seedFromFile();
    echo "✓ Content seeded\n";
    echo "✓ Setup complete!\n";
} catch (Throwable $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
    exit(1);
}
