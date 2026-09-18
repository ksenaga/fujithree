<?php
declare(strict_types=1);

require __DIR__ . "/../lib/contact-mailer.php";

const REDIRECT_BASE = "contact";

// 文字数の上限
const MAX_LENGTH_NAME    = 100;
const MAX_LENGTH_TEL     = 20;
const MAX_LENGTH_EMAIL   = 254;
const MAX_LENGTH_MESSAGE = 5000;

// レート制限（同一IPからの連続送信を抑制）
const RATE_LIMIT_COUNT  = 5;   // この回数まで
const RATE_LIMIT_WINDOW = 600; // 秒（10分）

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    contactRedirect(REDIRECT_BASE, "error=invalid_request");
}

if (!contactIsSameOriginRequest()) {
    contactRedirect(REDIRECT_BASE, "error=invalid_request");
}

$clientIp = $_SERVER["REMOTE_ADDR"] ?? "";
if (contactIsRateLimited($clientIp, RATE_LIMIT_COUNT, RATE_LIMIT_WINDOW)) {
    contactRedirect(REDIRECT_BASE, "error=rate_limited");
}

// ハニーポット対策：人間には見えない欄が埋まっていたら送信せず成功扱いにする
if (!empty($_POST["website"] ?? "")) {
    contactRedirect(REDIRECT_BASE, "sent=1");
}

$name    = trim((string)($_POST["name"] ?? ""));
$tel     = trim((string)($_POST["tel"] ?? ""));
$email   = trim((string)($_POST["email"] ?? ""));
$message = trim((string)($_POST["message"] ?? ""));

if ($name === "" || $tel === "" || $email === "" || $message === "") {
    contactRedirect(REDIRECT_BASE, "error=required");
}

if (
    mb_strlen($name) > MAX_LENGTH_NAME
    || mb_strlen($tel) > MAX_LENGTH_TEL
    || mb_strlen($email) > MAX_LENGTH_EMAIL
    || mb_strlen($message) > MAX_LENGTH_MESSAGE
) {
    contactRedirect(REDIRECT_BASE, "error=too_long");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    contactRedirect(REDIRECT_BASE, "error=email");
}

$name  = contactStripNewlines($name);
$tel   = contactStripNewlines($tel);
$email = contactStripNewlines($email);

// TODO: 実際の問い合わせ受信用メールアドレスに変更してください
$to = "example@exm.com";

$subject = "【FUJI THREE】お問い合わせがありました";

$body = "FUJI THREEのお問い合わせフォームより送信がありました。\n\n"
    . "お名前: {$name}\n"
    . "電話番号: {$tel}\n"
    . "メールアドレス: {$email}\n"
    . "お問い合わせ内容:\n{$message}\n";

// TODO: 実際の送信元ドメインのメールアドレスに変更してください
$headers = "From: no-reply@example.com\r\n"
    . "Reply-To: {$email}\r\n";

$sent = mb_send_mail($to, $subject, $body, $headers);

contactRedirect(REDIRECT_BASE, $sent ? "sent=1" : "error=send_failed");
