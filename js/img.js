document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.grid-wrapper img').forEach(img => {
    img.addEventListener('click', e => {
      e.stopPropagation();

      const wrapper = img.closest('.grid-wrapper');
      wrapper.classList.add('disable-hover');

      // スクロール禁止
      document.body.style.overflow = 'hidden';

      // オーバーレイ作成
      const overlay = document.createElement('div');
      overlay.classList.add('img-overlay');

      // 画像ラッパー（×ボタン配置用）
      const imgWrapper = document.createElement('div');
      imgWrapper.style.position = 'relative';
      imgWrapper.style.display = 'inline-block';

      // 拡大画像
      const enlargedImg = document.createElement('img');
      enlargedImg.src = img.src;
      imgWrapper.appendChild(enlargedImg);

      // ×ボタン
      const closeBtn = document.createElement('button');
      closeBtn.classList.add('close-btn');
      closeBtn.innerHTML = '×';
      imgWrapper.appendChild(closeBtn);

      overlay.appendChild(imgWrapper);
      document.body.appendChild(overlay);

      // 閉じる関数
      const closeOverlay = () => {
        document.body.removeChild(overlay);
        wrapper.classList.remove('disable-hover');
        document.body.style.overflow = ''; // スクロール再開
      };

      // ×ボタンクリックで閉じる
      closeBtn.addEventListener('click', e => {
        e.stopPropagation();
        closeOverlay();
      });

      // 背景クリックで閉じる
      overlay.addEventListener('click', e => {
        if (e.target === overlay) closeOverlay();
      });
    });
  });
});
