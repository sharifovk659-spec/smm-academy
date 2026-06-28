<?php
declare(strict_types=1);

/**
 * Parse image field from admin form (URL or responsive JSON object).
 */
function parseImageField(string $url, string $json): string|array
{
    $json = trim($json);
    if ($json !== '') {
        $decoded = json_decode($json, true);
        if (is_array($decoded) && !empty($decoded['default'])) {
            return $decoded;
        }
    }
    return trim($url);
}
