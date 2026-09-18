/* ===============================
   Header HTML
================================ */
const headerHTML = `
<header class="site-header">
  <div class="header-inner">
    <div class="header-spacer"></div>
    <div class="header-center">
      <a href="/index" class="logo">
        <img src="./images/FUJI-THREE_2.webp" alt="FUJI THREE">
      </a>
      <nav class="pc-nav">
        <a href="/design" data-ja="デザイン">
          Design
          <span class="nav-hover">
            <span class="nav-divider"></span>
            <span class="nav-ja-text">デザイン</span>
          </span>
        </a>

        <a href="/fukushi/" data-ja="福祉事業">
          Welfare
          <span class="nav-hover">
            <span class="nav-divider"></span>
            <span class="nav-ja-text">福祉事業</span>
          </span>
        </a>

        <a href="/about" data-ja="会社概要">
          About
          <span class="nav-hover">
            <span class="nav-divider"></span>
            <span class="nav-ja-text">会社概要</span>
          </span>
        </a>

        <a href="/contact" data-ja="お問い合わせ">
          Contact
          <span class="nav-hover">
            <span class="nav-divider"></span>
            <span class="nav-ja-text">お問い合わせ</span>
          </span>
        </a>
      </nav>
    </div>
    <div class="header-right">
      <button class="menu-btn" id="menuBtn" aria-label="menu">☰</button>
    </div>
  </div>
</header>

<div class="drawer" id="drawer">
  <button class="drawer-close" id="drawerClose" aria-label="close">×</button>

  <div class="drawer-inner">
    <a href="/index" class="drawer-logo">
      <img src="/images/FUJI-THREE_2.webp" alt="FUJI THREE">
    </a>

    <nav class="drawer-nav">
      <a href="/design" class="drawer-item">
        <span class="drawer-en">Design</span>
        <span class="drawer-divider"></span>
        <span class="drawer-ja">デザイン</span>
      </a>

      <a href="/fukushi/" class="drawer-item">
        <span class="drawer-en">Welfare</span>
        <span class="drawer-divider"></span>
        <span class="drawer-ja">福祉事業</span>
      </a>

      <a href="/about" class="drawer-item">
        <span class="drawer-en">About</span>
        <span class="drawer-divider"></span>
        <span class="drawer-ja">会社概要</span>
      </a>

      <a href="/contact" class="drawer-item">
        <span class="drawer-en">Contact</span>
        <span class="drawer-divider"></span>
        <span class="drawer-ja">お問い合わせ</span>
      </a>
    </nav>
  </div>
</div>


<div class="overlay" id="overlay"></div>
`;

/* ===============================
   Header 注入
================================ */
const injectHeader = () => {
  const existingHeaders = document.querySelectorAll("header, .site-header");

  if (existingHeaders.length > 0) {
    existingHeaders.forEach(header => {
      const temp = document.createElement("div");
      temp.innerHTML = headerHTML;
      header.replaceWith(temp.firstElementChild);
    });
  } else {
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
  }

  initHeaderEvents();
};

/* ===============================
   Drawer 制御
================================ */
const initHeaderEvents = () => {
  const menuBtn = document.getElementById("menuBtn");
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");
  const drawerClose = document.getElementById('drawerClose');

  if (!menuBtn || !drawer || !overlay) return;

  let scrollY = 0;

  const lockScroll = () => {
    scrollY = window.scrollY;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
  };

  const unlockScroll = () => {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';

    window.scrollTo(0, scrollY);
  };


  const openDrawer = () => {
    const siteWrapper = document.getElementById('siteWrapper');

    drawer.classList.add("open");
    overlay.classList.add("active");

    if (siteWrapper) {
      siteWrapper.classList.add("slide");
    }
    lockScroll();
  };

  const closeDrawer = () => {
    const siteWrapper = document.getElementById('siteWrapper');

    drawer.classList.remove("open");
    overlay.classList.remove("active");

    if (siteWrapper) {
      siteWrapper.classList.remove("slide");
    }
    unlockScroll();
  };

  menuBtn.addEventListener("click", openDrawer);
  overlay.addEventListener("click", closeDrawer);
  drawerClose.addEventListener('click', closeDrawer);
};


/* ===============================
   Footer HTML
================================ */
const footerHTML = `
<footer class="site-footer">
  <div class="footer-container">

    <!-- ロゴ -->
    <div class="footer-logo">
      <a href="/index" aria-label="トップへ">
        <img src="./images/FUJI-THREE_2.webp" alt="FUJI THREE">
      </a>
    </div>

    <!-- 下部情報 -->
    <div class="footer-bottom">
      <nav class="footer-nav">
        <a href="/design">デザイン</a>
        <a href="/fukushi/">福祉事業</a>
        <a href="/about">会社概要</a>
        <a href="/contact">お問い合わせ</a>
      </nav>

      <div class="footer-info">
        <p>TEL: 050-3749-5455</p>
        <p>FAX: 050-6868-9484</p>
        <div class="footer-address">
          <p>沖縄県那覇市</p>
          <p class="address-detail">山下町 7-19-305</p>
        </div>
      </div>
    </div>

    <div class="footer-divider"></div>

    <p class="footer-copy">
      FUJI THREE株式会社. All rights reserved.
    </p>

  </div>
</footer>
`;

/* ===============================
   Footer 注入
================================ */
const injectFooter = () => {
  const existingFooters = document.querySelectorAll("footer, .site-footer");

  if (existingFooters.length > 0) {
    existingFooters.forEach(footer => {
      const temp = document.createElement("div");
      temp.innerHTML = footerHTML;
      footer.replaceWith(temp.firstElementChild);
    });
  } else {
    document.body.insertAdjacentHTML("beforeend", footerHTML);
  }
};

const wrapSiteContent = () => {
  // すでに wrap されていたら何もしない
  if (document.getElementById('siteWrapper')) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'siteWrapper';

  // header〜footer を全部 wrapper に移動
  const bodyChildren = [...document.body.children];

  bodyChildren.forEach(child => {
    if (
      child.id !== 'drawer' &&
      child.id !== 'overlay'
    ) {
      wrapper.appendChild(child);
    }
  });

  document.body.appendChild(wrapper);
};


/* ===============================
   実行
================================ */
document.addEventListener("DOMContentLoaded", () => {
  injectHeader();
  injectFooter();
  wrapSiteContent();
});



