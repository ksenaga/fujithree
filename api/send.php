<?php
declare(strict_types=1);

require __DIR__ . "/../lib/contact-mailer.php";

const REDIRECT_BASE = "/contact";

// 文字数の上限
const MAX_LENGTH_TYPE    = 20;
const MAX_LENGTH_NAME    = 100;
const MAX_LENGTH_COMPANY = 100;
const MAX_LENGTH_EMAIL   = 254;
const MAX_LENGTH_PHONE   = 20;
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
    contactRedirect(REDIRECT_BASE, "success=true");
}

$type    = trim((string)($_POST["type"] ?? ""));
$name    = trim((string)($_POST["name"] ?? ""));
$company = trim((string)($_POST["company"] ?? ""));
$email   = trim((string)($_POST["email"] ?? ""));
$phone   = trim((string)($_POST["phone"] ?? ""));
$message = trim((string)($_POST["message"] ?? ""));
$agree   = !empty($_POST["agree"] ?? "");

if ($type === "" || $name === "" || $company === "" || $email === "" || $phone === "" || $message === "" || !$agree) {
    contactRedirect(REDIRECT_BASE, "error=required");
}

if (
    mb_strlen($type) > MAX_LENGTH_TYPE
    || mb_strlen($name) > MAX_LENGTH_NAME
    || mb_strlen($company) > MAX_LENGTH_COMPANY
    || mb_strlen($email) > MAX_LENGTH_EMAIL
    || mb_strlen($phone) > MAX_LENGTH_PHONE
    || mb_strlen($message) > MAX_LENGTH_MESSAGE
) {
    contactRedirect(REDIRECT_BASE, "error=too_long");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    contactRedirect(REDIRECT_BASE, "error=email");
}

$type    = contactStripNewlines($type);
$name    = contactStripNewlines($name);
$company = contactStripNewlines($company);
$email   = contactStripNewlines($email);
$phone   = contactStripNewlines($phone);

$to = "information@fujithree.com";

$subject = "【FUJI THREE】お問い合わせがありました";

$body = "FUJI THREEのお問い合わせフォームより送信がありました。\n\n"
    . "お問い合わせ種別: {$type}\n"
    . "お名前: {$name}\n"
    . "会社名: {$company}\n"
    . "メールアドレス: {$email}\n"
    . "電話番号: {$phone}\n"
    . "お問い合わせ内容:\n{$message}\n";

$headers = "From: no-reply@fujithree.com\r\n"
    . "Reply-To: {$email}\r\n";

$sent = mb_send_mail($to, $subject, $body, $headers);

// 送信者本人への受付完了メール（管理者への通知が成功した場合のみ送る）
if ($sent) {
    $autoReplySubject = "【FUJI THREE】お問い合わせありがとうございます";

    $autoReplyBody = "{$name} 様\n\n"
        . "このたびは、FUJI THREEへお問い合わせいただき、誠にありがとうございます。\n"
        . "以下の内容にて、お問い合わせを受け付けいたしました。\n\n"
        . "────────────────────\n"
        . "お問い合わせ種別：{$type}\n"
        . "お名前：{$name}\n"
        . "会社名：{$company}\n"
        . "電話番号：{$phone}\n"
        . "お問い合わせ内容：\n{$message}\n"
        . "────────────────────\n\n"
        . "内容を確認のうえ、担当者より改めてご連絡いたしますので、\n"
        . "今しばらくお待ちくださいますようお願い申し上げます。\n\n"
        . "なお、このメールは送信専用となっております。\n"
        . "本メールへご返信いただいてもお答えできません。\n"
        . "お急ぎのご用件がございましたら、下記までご連絡ください。\n\n"
        . "050-3749-5455\n";

    $autoReplyHeaders = "From: FUJI THREE <information@fujithree.com>\r\n";

    mb_send_mail($email, $autoReplySubject, $autoReplyBody, $autoReplyHeaders);
}

contactRedirect(REDIRECT_BASE, $sent ? "success=true" : "error=send_failed");
