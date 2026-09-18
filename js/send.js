// Form Validation
const forms = document.querySelectorAll('.contact-form');

forms.forEach(form => {
    form.addEventListener('submit', e => {
        e.preventDefault();

        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field) return;

            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                showFieldError(field, '必須項目です');
            } else {
                field.classList.remove('error');
                clearFieldError(field);
            }

            // Email validation
            if (field.type === 'email' && field.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                    showFieldError(field, '正しいメールアドレスを入力してください');
                }
            }

            // Phone validation
            if (field.type === 'tel' && field.value) {
                const phoneRegex = /^[\d-]+$/;
                if (!phoneRegex.test(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                    showFieldError(field, '正しい電話番号を入力してください');
                }
            }
        });

        if (isValid) form.submit();
    });
});

// URLパラメータから成功/失敗メッセージを表示
const urlParams = new URLSearchParams(window.location.search);

const displayMessage = (type, message) => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const div = document.createElement('div');
    div.classList.add(type === 'success' ? 'success-message' : 'error-message');
    div.style.cssText = type === 'success'
        ? 'background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px; border: 1px solid #c3e6cb;'
        : 'background: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin-bottom: 20px; border: 1px solid #f5c6cb;';
    div.textContent = message;

    form.parentNode.insertBefore(div, form);

    setTimeout(() => {
        div.remove();
        window.history.replaceState({}, document.title, window.location.pathname);
    }, 5000);
};

if (urlParams.get('success') === 'true') {
    displayMessage('success', 'お問い合わせありがとうございます。担当者より連絡させていただきます。');
} else if (urlParams.get('error') === 'true') {
    displayMessage('error', 'メール送信に失敗しました。お電話でのお問い合わせをお願いいたします。');
}

// 補助関数もアロー関数に
const showFieldError = (field, message) => {
    let errorElement = field.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('span');
        errorElement.classList.add('error-message');
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    errorElement.textContent = message;
};

const clearFieldError = field => {
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
};
