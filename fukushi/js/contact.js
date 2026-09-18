document.addEventListener("DOMContentLoaded", () => {
  const messageBox = document.getElementById("formMessage");
  if (!messageBox) return;

  const params = new URLSearchParams(location.search);

  if (params.has("sent")) {
    messageBox.innerHTML =
      '<span class="form-message-line">お問い合わせありがとうございます。</span>' +
      '<span class="form-message-line">送信が完了しました。</span>';
    messageBox.hidden = false;
  } else if (params.has("error")) {
    const messages = {
      required: "すべての項目を入力してください。",
      email: "メールアドレスの形式が正しくありません。",
      send_failed: "送信に失敗しました。時間をおいて再度お試しください。",
      invalid_request: "不正なリクエストです。",
      too_long: "入力内容が長すぎます。文字数を減らして再度お試しください。",
      rate_limited: "短時間に送信が集中しています。しばらくしてから再度お試しください。",
    };
    messageBox.textContent = messages[params.get("error")] || "エラーが発生しました。";
    messageBox.classList.add("is-error");
    messageBox.hidden = false;
  }
});
