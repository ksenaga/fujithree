<?php
declare(strict_types=1);

/**
 * お問い合わせフォーム共通処理。
 * fujithree ルートの api/send.php と fukushi/contact-send.php の両方から読み込まれる。
 * フォーム項目やリダイレクト先はサイトごとに異なるため、各エントリポイント側で組み立てる。
 */

mb_language("Japanese");
mb_internal_encoding("UTF-8");

function contactRedirect(string $base, string $query): never
{
    header("Location: " . $base . "?" . $query);
    exit;
}

/**
 * 同一IPからの送信回数を記録し、上限を超えていないか判定する。
 * ファイルが書き込めない環境ではフォームの可用性を優先し、制限しない。
 */
function contactIsRateLimited(string $ip, int $limitCount, int $windowSeconds): bool
{
    if ($ip === "") {
        return false;
    }

    $dir = rtrim(sys_get_temp_dir(), "/") . "/fujithree_contact_ratelimit";
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        return false;
    }

    $file = $dir . "/ratelimit_" . sha1($ip) . ".json";
    $fp = @fopen($file, "c+");
    if ($fp === false) {
        return false;
    }

    flock($fp, LOCK_EX);

    $now = time();
    $timestamps = [];
    $contents = stream_get_contents($fp);
    if ($contents !== false && $contents !== "") {
        $decoded = json_decode($contents, true);
        if (is_array($decoded)) {
            $timestamps = $decoded;
        }
    }

    $timestamps = array_values(array_filter(
        $timestamps,
        static fn($t) => is_int($t) && ($now - $t) < $windowSeconds
    ));

    $limited = count($timestamps) >= $limitCount;

    if (!$limited) {
        $timestamps[] = $now;
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($timestamps));
        fflush($fp);
    }

    flock($fp, LOCK_UN);
    fclose($fp);

    return $limited;
}

/**
 * フォームの送信元がこのサイト自身かどうかを Origin/Referer から判定する。
 * ヘッダーは詐称可能なため簡易的な軽減策であり、完全な防止にはならない。
 */
function contactIsSameOriginRequest(): bool
{
    $host = $_SERVER["HTTP_HOST"] ?? "";
    if ($host === "") {
        return false;
    }
    // HTTP_HOST はポート番号を含む場合があるため、Origin/Referer 側と
    // 同じ形式（ホスト名のみ）に揃えてから比較する
    $host = parse_url("http://" . $host, PHP_URL_HOST) ?? "";
    if ($host === "") {
        return false;
    }

    $origin = $_SERVER["HTTP_ORIGIN"] ?? "";
    if ($origin !== "") {
        $originHost = parse_url($origin, PHP_URL_HOST) ?? "";
        return $originHost !== "" && $originHost === $host;
    }

    $referer = $_SERVER["HTTP_REFERER"] ?? "";
    if ($referer !== "") {
        $refererHost = parse_url($referer, PHP_URL_HOST) ?? "";
        return $refererHost !== "" && $refererHost === $host;
    }

    // Origin も Referer も送られていない場合は判定できないため拒否する
    return false;
}

// メールヘッダーインジェクション対策：改行を除去
function contactStripNewlines(string $value): string
{
    return str_replace(["\r", "\n"], "", $value);
}
