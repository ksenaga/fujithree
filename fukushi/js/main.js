/* ===============================
   LINE アイコン
================================ */
const lineIconSVG = `<svg class="line-icon" width="36" height="36" viewBox="0 0 640 640" fill="currentColor" aria-hidden="true"><path d="M375 260.8L375 342.1C375 344.2 373.4 345.8 371.3 345.8L358.3 345.8C357 345.8 355.9 345.1 355.3 344.3L318 294L318 342.2C318 344.3 316.4 345.9 314.3 345.9L301.3 345.9C299.2 345.9 297.6 344.3 297.6 342.2L297.6 260.9C297.6 258.8 299.2 257.2 301.3 257.2L314.2 257.2C315.3 257.2 316.6 257.8 317.2 258.8L354.5 309.1L354.5 260.9C354.5 258.8 356.1 257.2 358.2 257.2L371.2 257.2C373.3 257.1 375 258.8 375 260.7L375 260.8zM281.3 257.1L268.3 257.1C266.2 257.1 264.6 258.7 264.6 260.8L264.6 342.1C264.6 344.2 266.2 345.8 268.3 345.8L281.3 345.8C283.4 345.8 285 344.2 285 342.1L285 260.8C285 258.9 283.4 257.1 281.3 257.1zM249.9 325.2L214.3 325.2L214.3 260.8C214.3 258.7 212.7 257.1 210.6 257.1L197.6 257.1C195.5 257.1 193.9 258.7 193.9 260.8L193.9 342.1C193.9 343.1 194.2 343.9 194.9 344.6C195.6 345.2 196.4 345.6 197.4 345.6L249.6 345.6C251.7 345.6 253.3 344 253.3 341.9L253.3 328.9C253.3 327 251.7 325.2 249.8 325.2L249.9 325.2zM443.6 257.1L391.3 257.1C389.4 257.1 387.6 258.7 387.6 260.8L387.6 342.1C387.6 344 389.2 345.8 391.3 345.8L443.5 345.8C445.6 345.8 447.2 344.2 447.2 342.1L447.2 329C447.2 326.9 445.6 325.3 443.5 325.3L408 325.3L408 311.7L443.5 311.7C445.6 311.7 447.2 310.1 447.2 308L447.2 294.9C447.2 292.8 445.6 291.2 443.5 291.2L408 291.2L408 277.5L443.5 277.5C445.6 277.5 447.2 275.9 447.2 273.8L447.2 260.8C447.1 258.9 445.5 257.1 443.5 257.1L443.6 257.1zM576 157.4L576 483.4C575.9 534.6 533.9 576.1 482.6 576L156.6 576C105.4 575.9 63.9 533.8 64 482.6L64 156.6C64.1 105.4 106.2 63.9 157.4 64L483.4 64C534.6 64.1 576.1 106.1 576 157.4zM505.6 297.5C505.6 214.1 421.9 146.2 319.2 146.2C216.5 146.2 132.8 214.1 132.8 297.5C132.8 372.2 199.1 434.9 288.7 446.8C310.5 451.5 308 459.5 303.1 488.9C302.3 493.6 299.3 507.3 319.2 499C339.1 490.7 426.5 435.8 465.7 390.8C492.7 361.1 505.6 331 505.6 297.7L505.6 297.5z"/></svg>`;

/* ===============================
   電話・メール アイコン
================================ */
const phoneIconSVG = `<svg class="contact-icon-svg" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6l-39.6 48.6C234.3 334.7 177.3 277.7 144 207.3l48.6-39.6c13.7-11.1 18.4-30 11.6-46.3l-40-96z"/></svg>`;
const mailIconSVG = `<svg class="contact-icon-svg" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>`;

/* ===============================
   お問い合わせ方法 HTML
================================ */
const contactMethodsHTML = `
<section class="contact-methods" id="contactMethods">
  <div class="contact-item">
    <span class="contact-item-icon">${phoneIconSVG}</span>
    <span class="contact-item-divider"></span>
    <div class="contact-item-body">
      <span class="contact-item-label">お電話でのお問い合わせ</span>
      <a href="tel:05037495455" class="contact-phone">050-3749-5455</a>
      <span class="contact-fax">FAX：050-6868-9484</span>
    </div>
  </div>

  <div class="contact-item">
    <span class="contact-item-icon">${mailIconSVG}</span>
    <span class="contact-item-divider"></span>
    <div class="contact-item-body">
      <span class="contact-item-label">メールでのお問い合わせ</span>
      <a href="contact" class="contact-btn contact-btn--mail">→ メールフォームへ</a>
    </div>
  </div>

  <div class="contact-item contact-item--line">
    <span class="contact-item-icon contact-item-icon--line">${lineIconSVG}</span>
    <span class="contact-item-divider"></span>
    <div class="contact-item-body">
      <span class="contact-item-label">LINEでのお問い合わせ</span>
      <a href="https://lin.ee/XYxqGe5" class="contact-btn contact-btn--line" target="_blank" rel="noopener">→ LINEでお問い合わせ</a>
    </div>
  </div>
</section>
`;

/* ===============================
   お問い合わせ方法 注入
================================ */
const injectContactMethods = () => {
  const placeholder = document.getElementById("contactMethods");
  if (!placeholder) return;

  const temp = document.createElement("div");
  temp.innerHTML = contactMethodsHTML;
  placeholder.replaceWith(temp.firstElementChild);
};

/* ===============================
   Header HTML
================================ */
const headerHTML = `
<header class="site-header">
  <div class="header-inner">
    <a href="./" class="header-logo">
      <img src="images/logo/three-smiles.webp" alt="FUJI THREE" fetchpriority="high">
      <img class="header-logo-smile" src="images/logo/three_smile.webp" alt="THREE smiles">
    </a>

    <nav class="pc-nav">
      <a href="about">About</a>
      <a href="group-homes">グループホーム一覧</a>
      <a href="employment-support">就労支援B型</a>
      <a href="recruit">採用情報</a>
      <a href="company">会社概要</a>
      <a href="https://lin.ee/XYxqGe5" class="nav-line" target="_blank" rel="noopener">${lineIconSVG}<span class="nav-cta-text">でお問い合わせ</span></a>
      <a href="tel:05037495455" class="nav-tel">${phoneIconSVG}<span class="nav-cta-text">050-3749-5455</span></a>
    </nav>

    <button class="menu-btn" id="menuBtn" aria-label="menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<div class="drawer" id="drawer">
  <button class="drawer-close" id="drawerClose" aria-label="close">×</button>

  <div class="drawer-inner">
    <a href="./" class="drawer-logo">
      <img src="images/logo/three-smiles.webp" alt="FUJI THREE">
    </a>

    <nav class="drawer-nav">
      <a href="about" class="drawer-item">About</a>
      <a href="group-homes" class="drawer-item">グループホーム一覧</a>
      <a href="employment-support" class="drawer-item">就労支援B型</a>
      <a href="recruit" class="drawer-item">採用情報</a>
      <a href="company" class="drawer-item">会社概要</a>
      <a href="https://lin.ee/XYxqGe5" class="drawer-item drawer-line" target="_blank" rel="noopener">${lineIconSVG}お問い合わせ</a>
      <a href="tel:05037495455" class="drawer-item drawer-tel">${phoneIconSVG}050-3749-5455</a>
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
  setActiveNav();
};

/* ===============================
   現在ページのナビをハイライト
================================ */
const setActiveNav = () => {
  const currentPage = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".pc-nav a, .drawer-nav a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
};

/* ===============================
   Drawer 制御
================================ */
const initHeaderEvents = () => {
  const menuBtn = document.getElementById("menuBtn");
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");
  const drawerClose = document.getElementById("drawerClose");

  if (!menuBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add("open");
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");
  };

  const closeDrawer = () => {
    drawer.classList.remove("open");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  };

  menuBtn.addEventListener("click", openDrawer);
  overlay.addEventListener("click", closeDrawer);
  drawerClose.addEventListener("click", closeDrawer);
};

/* ===============================
   Footer HTML
================================ */
const footerHTML = `
<footer class="site-footer">
  <div class="footer-container">
    <div class="footer-top">
      <a href="./" class="footer-logo">
        <img src="images/logo/three-smiles.webp" alt="FUJI THREE">
      </a>

      <nav class="footer-nav">
        <a href="about">About</a>
        <a href="group-homes">グループホーム一覧</a>
        <a href="employment-support">就労支援B型</a>
        <a href="recruit">採用情報</a>
        <a href="company">会社概要</a>
        <a href="https://lin.ee/XYxqGe5" class="footer-line" target="_blank" rel="noopener">${lineIconSVG}でお問い合わせ</a>
      </nav>
    </div>

    <div class="footer-divider"></div>

    <p class="footer-copy">&copy; FUJI THREE. All rights reserved.</p>
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

/* ===============================
   グループホーム LINE CTA
================================ */
const groupHomeLineCTAHTML = `${lineIconSVG}<span>でお問い合わせ</span>`;

const injectGroupHomeLineCTAs = () => {
  document.querySelectorAll("[data-line-cta]").forEach(el => {
    el.innerHTML = groupHomeLineCTAHTML;
  });
};

/* ===============================
   右下固定ボタンをフッターの上で止める
================================ */
const pinAboveFooter = (btn, footer, gap = 24) => {
  const update = () => {
    const overlap = window.innerHeight - footer.getBoundingClientRect().top;

    if (overlap > 0) {
      btn.style.position = "absolute";
      btn.style.bottom = "";
      btn.style.top = `${footer.offsetTop - gap - btn.offsetHeight}px`;
    } else {
      btn.style.position = "fixed";
      btn.style.top = "";
      btn.style.bottom = `${gap}px`;
    }
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
};

/* ===============================
   TOPへ戻るボタン（group-homes.html）
================================ */
const initBackToTop = () => {
  const btn = document.querySelector(".back-to-top");
  const footer = document.querySelector(".site-footer");
  if (!btn || !footer) return;

  pinAboveFooter(btn, footer);
};

/* ===============================
   LINEフローティングボタン（group-homes.html以外）
================================ */
const initFloatingLine = () => {
  if (location.pathname.includes("group-homes")) return;

  const footer = document.querySelector(".site-footer");
  if (!footer) return;

  const btn = document.createElement("a");
  btn.href = "https://lin.ee/XYxqGe5";
  btn.className = "nav-line floating-line";
  btn.target = "_blank";
  btn.rel = "noopener";
  btn.setAttribute("aria-label", "LINEでお問い合わせ");
  btn.innerHTML = `${lineIconSVG}<span class="floating-line-text">でお問い合わせ</span>`;
  document.body.appendChild(btn);

  const update = () => {
    const overlap = window.innerHeight - footer.getBoundingClientRect().top;
    btn.classList.toggle("is-hidden", overlap > 0);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("load", update);
};

/* ===============================
   実行
================================ */
document.addEventListener("DOMContentLoaded", () => {
  injectHeader();
  injectFooter();
  injectContactMethods();
  injectGroupHomeLineCTAs();
  initBackToTop();
  initFloatingLine();
});
