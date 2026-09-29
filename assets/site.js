// =================================================================
//  ZOLTÁNFY ISTVÁN ISKOLA – OLDAL MOTOR
//  Ezt a fájlt NEM KELL szerkeszteni.
//  A menü és elérhetőségek a nav-data.js fájlban módosíthatók.
// =================================================================

(function () {
  'use strict';

  // ── Google Material Icons betöltése ─────────────────────────────
  const iconLink = document.createElement('link');
  iconLink.rel  = 'stylesheet';
  iconLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
  document.head.appendChild(iconLink);

  // ── Aktuális oldal kiemelése a menüben ──────────────────────────
  function isActive(url) {
    let current = window.location.pathname.split('/').pop() || 'index.html';
    if (!/\.html?$/i.test(current)) current += '.html';
    return url === current;
  }

  // ── Topbar HTML ──────────────────────────────────────────────────
  function buildTopbar() {
    return `
<div class="topbar">
  <div class="topbar-inner">
    <div class="topbar-left">
      <span><span class="material-icons topbar-icon">location_on</span>${SITE_CONFIG.cim}</span>
      <span class="topbar-sep">|</span>
      <a href="${SITE_CONFIG.telefonLink}"><span class="material-icons topbar-icon">phone</span>${SITE_CONFIG.telefon}</a>
    </div>
    <div class="topbar-right">
      <a href="mailto:${SITE_CONFIG.email}"><span class="material-icons topbar-icon">mail</span>${SITE_CONFIG.email}</a>
      <span class="topbar-sep">|</span>
      <a href="${SITE_CONFIG.facebook}" target="_blank" rel="noopener"><span class="material-icons topbar-icon">facebook</span>Facebook</a>
    </div>
  </div>
</div>`;
  }

  // ── Mega menü oszlop HTML ────────────────────────────────────────
  function buildCol(col) {
    const links = col.links.map(l => {
      const active = isActive(l.url) ? ' aria-current="page"' : '';
      return `<li><a href="${l.url}"${active}><span class="icon icon-blue"><span class="material-icons">${l.icon}</span></span>${l.label}</a></li>`;
    }).join('');

    const featured = col.featured ? `
<div class="mega-featured">
  <strong>${SITE_CONFIG.igazgato}</strong>
  ${SITE_CONFIG.igazgatoCim}<br>
  <a href="${SITE_CONFIG.telefonLink}">Tel: ${SITE_CONFIG.telefon}</a>
</div>` : '';

    return `
<div class="mega-col">
  <div class="mega-col-head">${col.head}</div>
  <ul>${links}</ul>
  ${featured}
</div>`;
  }

  // ── Nav elem HTML ────────────────────────────────────────────────
  function buildNavItem(item) {
    // Egyszerű link
    if (item.url) {
      const active = isActive(item.url) ? ' class="active"' : '';
      return `<li class="nav-item"><a href="${item.url}" class="nav-link"${active}>${item.label}</a></li>`;
    }

    // Mega menü
    const cols = item.cols.map(buildCol).join('');
    return `
<li class="nav-item">
  <button class="nav-link" aria-expanded="false" aria-haspopup="true">
    ${item.label} <span class="arrow" aria-hidden="true">▾</span>
  </button>
  <div class="mega" role="region">
    ${cols}
  </div>
</li>`;
  }

  // ── Mobilmenü elemek ─────────────────────────────────────────────
  function buildMobileItem(item) {
    if (item.url) {
      return `<li><a href="${item.url}" class="mob-link">${item.label}</a></li>`;
    }
    const links = item.cols.flatMap(c => c.links).map(l =>
      `<li><a href="${l.url}" class="mob-link mob-sub"><span class="material-icons">${l.icon}</span>${l.label}</a></li>`
    ).join('');
    return `
<li class="mob-group">
  <span class="mob-group-head">${item.label}</span>
  <ul>${links}</ul>
</li>`;
  }

  // ── Navigáció HTML ───────────────────────────────────────────────
  function buildNav() {
    const items = NAV_MENU.map(buildNavItem).join('');
    const mobileItems = NAV_MENU.map(buildMobileItem).join('');

    return `
<nav id="main-nav">
  <div class="nav-inner">
    <a href="index.html" class="logo">
      <div class="logo-badge"></div>
      <div class="logo-text">
        <span class="logo-name">${SITE_CONFIG.nev}</span>
        <span class="logo-sub">${SITE_CONFIG.helyszin}</span>
      </div>
    </a>
    <ul class="nav-items" id="nav-items">${items}</ul>
    <a href="beiratkozas.html" class="nav-cta">Beiratkozás 2026</a>
    <button class="nav-burger" id="nav-burger" aria-label="Menü megnyitása" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="mob-menu" id="mob-menu" aria-hidden="true">
    <ul>${mobileItems}</ul>
  </div>
</nav>`;
  }

  // ── Lábléc HTML ──────────────────────────────────────────────────
  function buildFooter() {
    return `
<footer>
  <div class="contact-band">
    <div class="contact-inner">
      <div class="contact-block">
        <h4>Cím</h4>
        <p>${SITE_CONFIG.cim}</p>
      </div>
      <div class="contact-block">
        <h4>Telefon</h4>
        <p><a href="${SITE_CONFIG.telefonLink}">${SITE_CONFIG.telefon}</a></p>
      </div>
      <div class="contact-block">
        <h4>E-mail</h4>
        <p><a href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a></p>
      </div>
      <a href="kapcsolat.html" class="contact-map-btn"><span class="material-icons">map</span>Kapcsolat &amp; Térkép</a>
    </div>
  </div>
  <div class="footer-inner">
    <div class="footer-left">
      <div class="footer-badge">ZI</div>
      <span class="footer-copy">${SITE_CONFIG.nev} &copy; ${new Date().getFullYear()}</span>
    </div>
    <div class="footer-links">
      <a href="adatvedelem.html">Adatvédelem</a>
      <a href="kozlista.html">Közzétételi lista</a>
      <a href="kapcsolat.html">Kapcsolat</a>
    </div>
  </div>
</footer>`;
  }

  // ── DOM injektálás ───────────────────────────────────────────────
  function inject() {
    // Topbar
    const topbarEl = document.getElementById('site-topbar');
    if (topbarEl) topbarEl.innerHTML = buildTopbar();

    // Nav
    const navEl = document.getElementById('site-nav');
    if (navEl) navEl.innerHTML = buildNav();

    // Footer
    const footerEl = document.getElementById('site-footer');
    if (footerEl) footerEl.innerHTML = buildFooter();

    // Eseménykezelők csatolása az injektálás után
    attachEvents();
  }

  // ── Eseménykezelők ───────────────────────────────────────────────
  function attachEvents() {
    const burger = document.getElementById('nav-burger');
    const mobMenu = document.getElementById('mob-menu');

    if (burger && mobMenu) {
      burger.addEventListener('click', function () {
        const open = mobMenu.classList.toggle('open');
        burger.setAttribute('aria-expanded', open);
        mobMenu.setAttribute('aria-hidden', !open);
      });
    }

    // Mega menü billentyűzet-kezelés (akadálymentesség)
    document.querySelectorAll('.nav-item > button.nav-link').forEach(btn => {
      btn.addEventListener('click', function () {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        // Zárjuk be az összes többi nyitott menüt
        document.querySelectorAll('.nav-item > button.nav-link').forEach(b => {
          b.setAttribute('aria-expanded', 'false');
        });
        if (!expanded) this.setAttribute('aria-expanded', 'true');
      });
    });

    // Kattintás a menün kívülre → bezárás
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-item')) {
        document.querySelectorAll('.nav-item > button.nav-link').forEach(b => {
          b.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Escape billentyű → bezárás
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.nav-item > button.nav-link').forEach(b => {
          b.setAttribute('aria-expanded', 'false');
        });
        if (mobMenu) {
          mobMenu.classList.remove('open');
          mobMenu.setAttribute('aria-hidden', 'true');
        }
      }
    });
  }

  // ── Indítás ──────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
