<?php
/**
 * `php -S localhost:3000 router.php` 用のルーティングスクリプト。
 * 本番Apacheの .htaccess (mod_rewrite) と同等の挙動をローカルで再現する。
 * 使い方: php -S localhost:3000 router.php
 */

$root = __DIR__;
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$path = $root . $uri;

function serve_404(string $root): bool
{
    http_response_code(404);
    readfile($root . '/404.html');
    return true;
}

// .env などドットファイルへの直接アクセスは404（.well-known/ は除外）
if (preg_match('#(^|/)\.#', $uri) && strpos($uri, '/.well-known/') !== 0) {
    return serve_404($root);
}

// lib/ 配下（内部共通処理）への直接アクセスも404
if (preg_match('#^/lib/#', $uri)) {
    return serve_404($root);
}

// .php への直接アクセスは拡張子なしURLへリダイレクト（GETのみ、api/配下は除外）
if ($_SERVER['REQUEST_METHOD'] === 'GET'
    && !preg_match('#(^|/)api/#', $uri)
    && preg_match('#\.php$#', $uri)) {
    header('Location: ' . preg_replace('#\.php$#', '', $uri), true, 301);
    return true;
}

// api/ 配下はフォーム送信専用（POST）のエンドポイントのため、GET等は403
if (preg_match('#(^|/)api/#', $uri) && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    echo 'Forbidden';
    return true;
}

// 実在するファイル・ディレクトリはビルトインサーバーにそのまま処理させる
// （.php はビルトインサーバーが実行、静的ファイルはそのまま返す）
if ($uri !== '/' && (is_file($path) || is_dir($path))) {
    return false;
}

// 拡張子なしURL → .php にマッピング
if (is_file($path . '.php')) {
    require $path . '.php';
    return true;
}

// 拡張子なしURL → .html にマッピング
if (is_file($path . '.html')) {
    readfile($path . '.html');
    return true;
}

// ディレクトリのインデックス（例: /fukushi/）
if (is_dir($path)) {
    $indexHtml = rtrim($path, '/') . '/index.html';
    if (is_file($indexHtml)) {
        readfile($indexHtml);
        return true;
    }
}

return serve_404($root);
