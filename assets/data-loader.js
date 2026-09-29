/* data-loader.js – dinamikus tartalom betöltő
   Minden oldal végén betöltve (nav-data.js és site.js ELŐTT).
   JSON fájlokat fetch-el a /data/ mappából, és a DOM-ba rendereli. */

(function () {
  'use strict';

  const HU_MONTHS = [
    '', 'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
    'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
  ];

  // A data/ mappa útvonalát a saját script (assets/data-loader.js) helyéből számoljuk,
  // így gyökérdomainen és alkönyvtárban (pl. github.io/iskola/) is jól működik.
  const SCRIPT_SRC = document.currentScript && document.currentScript.src;
  function dataUrl(file) {
    if (SCRIPT_SRC) return new URL('../data/' + file, SCRIPT_SRC).href;
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const base = depth > 1 ? '../'.repeat(depth - 1) : '';
    return base + 'data/' + file;
  }

  async function fetchJSON(file) {
    const url = dataUrl(file);
    const resp = await fetch(url, { cache: 'no-cache' });
    if (!resp.ok) throw new Error('HTTP ' + resp.status + ' – ' + url);
    return resp.json();
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── ESEMÉNYNAPTÁR (index.html) ──────────────────────────────────── */
  function renderCalendar(data) {
    const heading = document.getElementById('calendar-month-heading');
    const tbody   = document.getElementById('calendar-tbody');
    if (!heading || !tbody) return;

    heading.textContent = data.monthLabel || '';

    if (!data.events || data.events.length === 0) {
      tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:var(--gray-500);padding:20px;">Nincs esemény ebben a hónapban.</td></tr>';
      return;
    }

    tbody.innerHTML = data.events.map(ev => `
      <tr>
        <td class="event-date">${escHtml(ev.date)}</td>
        <td>${escHtml(ev.title)}</td>
        <td class="event-resp">${escHtml(ev.responsible || '—')}</td>
      </tr>`).join('');
  }

  /* ── BEIRATKOZÁS KÁRTYA (index.html főoldal) ─────────────────────── */
  function renderHomeEnrollment(data) {
    const el = document.getElementById('home-enrollment-content');
    if (!el) return;

    el.innerHTML = `
      <div class="info-box" style="margin-bottom:12px;">
        <span class="material-icons info-box-icon">event</span>
        <div>
          <strong>${escHtml(data.personalDates.display)}</strong><br>
          ${escHtml(data.personalDates.hours)} · ${escHtml(data.personalDates.venue)}
        </div>
      </div>
      <p style="font-size:13px; color:var(--gray-600); margin-bottom:12px;">
        Elektronikus adatszolgáltatás ${escHtml(data.onlineAvailableFrom)}-tól/-től elérhető az e-KRÉTA rendszerben
        (személyes megjelenés továbbra is kötelező).
      </p>
      <a href="beiratkozas.html" style="display:inline-flex; align-items:center; gap:6px; font-size:13px; font-weight:500; color:var(--navy-dark); text-decoration:none;">
        <span class="material-icons" style="font-size:16px;">arrow_forward</span> Részletek és nyomtatványok
      </a>`;

    // Frissítsük a kártya fejlécét is
    const title = document.getElementById('home-enrollment-title');
    if (title) title.textContent = 'Beiratkozás – ' + data.schoolYear + '. tanév';
  }

  /* ── KIEMELT HÍREK (index.html) ──────────────────────────────────── */
  function renderFeaturedNews(articles) {
    const container = document.getElementById('featured-news-container');
    if (!container) return;

    const featured = articles.filter(a => a.featured);
    if (featured.length === 0) { container.innerHTML = ''; return; }

    const cards = featured.map(a => {
      const firstPara = a.body.split('\n\n')[0];
      return `
        <div class="news-card">
          <h3>${escHtml(a.title)}</h3>
          <p>${escHtml(firstPara)}</p>
          <a href="hirek.html" style="display:inline-flex;align-items:center;gap:4px;font-size:13px;font-weight:500;color:var(--navy-dark);text-decoration:none;margin-top:8px;">
            <span class="material-icons" style="font-size:15px;">arrow_forward</span> Összes hír
          </a>
        </div>`;
    }).join('');

    container.innerHTML = `<h2>Legutóbbi hírek</h2>${cards}`;
  }

  /* ── HÍREK OLDAL (hirek.html) ────────────────────────────────────── */
  function renderNewsPage(articles) {
    const container = document.getElementById('news-container');
    if (!container) return;

    if (!articles || articles.length === 0) {
      container.innerHTML = '<p style="color:var(--gray-500);">Jelenleg nincs elérhető hír.</p>';
      return;
    }

    // Csoportosítás év és hónap szerint
    const byYear = {};
    articles.forEach(a => {
      if (!byYear[a.year]) byYear[a.year] = {};
      if (!byYear[a.year][a.month]) byYear[a.year][a.month] = [];
      byYear[a.year][a.month].push(a);
    });

    const years = Object.keys(byYear).sort((a, b) => b - a);

    container.innerHTML = years.map(year => {
      const months = Object.keys(byYear[year]).sort((a, b) => b - a);
      const monthsHtml = months.map(month => {
        const arts = byYear[year][month].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        const cardsHtml = arts.map(a => {
          const paras = String(a.body || '').split('\n\n').map(p => `<p>${escHtml(p)}</p>`).join('');
          return `<div class="news-card"><h3>${escHtml(a.title)}</h3>${paras}</div>`;
        }).join('');
        return `
          <div class="news-month">
            <div class="news-month-label">
              <span class="material-icons">calendar_month</span> ${HU_MONTHS[parseInt(month)] || month}
            </div>
            ${cardsHtml}
          </div>`;
      }).join('');

      return `<div class="news-year"><h2>${escHtml(year)}</h2>${monthsHtml}</div>`;
    }).join('');
  }

  /* ── BEIRATKOZÁS OLDAL (beiratkozas.html) ────────────────────────── */
  function renderEnrollmentPage(data) {
    const gridEl = document.getElementById('beiratkozas-grid-container');
    const docsEl = document.getElementById('beiratkozas-docs-container');

    if (gridEl) {
      gridEl.innerHTML = `
        <div class="beiratkozas-grid">
          <div class="beiratkozas-card">
            <h3><span class="material-icons">person_pin</span> Személyesen</h3>
            <div class="date-highlight">
              <strong>${escHtml(data.personalDates.display)}</strong>
              ${escHtml(data.personalDates.hours)}
            </div>
            <p>Helyszín: ${escHtml(data.personalDates.venue)}</p>
          </div>
          <div class="beiratkozas-card">
            <h3><span class="material-icons">computer</span> Elektronikusan</h3>
            <p><strong>${escHtml(data.onlineAvailableFrom)}-tól/-től</strong> elérhető az alábbi linken:</p>
            <p style="margin-top:10px;">
              <a href="${escHtml(data.onlineUrl)}" target="_blank" style="color:var(--navy-mid);word-break:break-all;">
                ${escHtml(data.onlineUrl.replace(/^https?:\/\//, ''))}
              </a>
            </p>
            <div class="info-box" style="margin-top:14px;font-size:13px;">
              <span class="material-icons info-box-icon" style="font-size:16px !important;">info</span>
              ${escHtml(data.onlineNote)}
            </div>
          </div>
        </div>`;
    }

    if (docsEl && data.documents && data.documents.length > 0) {
      docsEl.innerHTML = '<div class="doc-links">' +
        data.documents.map(d =>
          `<a class="doc-link" href="${escHtml(d.href)}" target="_blank">
            <span class="material-icons">${escHtml(d.icon)}</span> ${escHtml(d.label)}
          </a>`
        ).join('') + '</div>';
    }
  }

  /* ── HELYI TANTERVEK (helyitantervek.html) ───────────────────────── */
  function renderCurriculum(data) {
    const container = document.getElementById('curriculum-container');
    if (!container) return;

    container.innerHTML = data.sections.map(sec => `
      <h2>${escHtml(sec.title)}</h2>
      <div class="doc-links">
        ${sec.documents.map(d =>
          `<a class="doc-link" href="${escHtml(d.href)}" target="_blank">
            <span class="material-icons">${escHtml(d.icon)}</span> ${escHtml(d.label)}
          </a>`
        ).join('')}
      </div>`).join('');
  }

  /* ── KOMPETENCIAMÉRÉS (kompetencia.html) ─────────────────────────── */
  function renderCompetency(data) {
    const container = document.getElementById('competency-container');
    if (!container) return;

    container.innerHTML = data.years.map(y => `
      <div class="year-block">
        <h3>${escHtml(String(y.year))}</h3>
        <div class="doc-links">
          ${y.documents.map(d =>
            `<a class="doc-link" href="${escHtml(d.href)}" target="_blank">
              <span class="material-icons">${escHtml(d.icon)}</span> ${escHtml(d.label)}
            </a>`
          ).join('')}
        </div>
      </div>`).join('');
  }

  /* ── TOVÁBBTANULÁS (tovabbtanulas.html) ──────────────────────────── */
  function renderFurtherEducation(data) {
    const container = document.getElementById('further-education-container');
    if (!container) return;

    container.innerHTML = '<div class="doc-links">' +
      data.entries.map(e =>
        `<a class="doc-link" href="${escHtml(e.href)}" target="_blank">
          <span class="material-icons">${escHtml(e.icon)}</span> ${escHtml(e.label)}
        </a>`
      ).join('') + '</div>';
  }

  /* ── BEISKOLÁZÁS (beiskolazas.html) ──────────────────────────────── */
  function renderEnrollmentProgram(data) {
    const container = document.getElementById('enrollment-program-container');
    if (!container) return;

    container.innerHTML = `
      <img class="beiskolazas-img" src="${escHtml(data.imageSrc)}" alt="${escHtml(data.imageAlt)}">
      <div class="info-box" style="margin-top:24px;">
        <span class="material-icons info-box-icon">how_to_reg</span>
        <div>
          ${escHtml(data.infoText)}
          <a href="${escHtml(data.infoLinkHref)}">${escHtml(data.infoLinkLabel)}</a>.
        </div>
      </div>`;
  }

  /* ── SULIÚJSÁG (suliujsag.html) ──────────────────────────────────── */
  function renderNewspaper(data) {
    const container = document.getElementById('newspaper-container');
    if (!container) return;

    container.innerHTML = data.grades.map(g => `
      <h2>${escHtml(g.label)}</h2>
      <div class="doc-links">
        ${g.issues.map(iss =>
          `<a class="doc-link" href="${escHtml(iss.href)}" target="_blank">
            <span class="material-icons">${escHtml(iss.icon)}</span> ${escHtml(iss.label)}
          </a>`
        ).join('')}
      </div>`).join('');
  }

  /* ── VIDEÓK (videok.html) ────────────────────────────────────────── */
  function renderVideos(data) {
    const container = document.getElementById('videos-container');
    if (!container) return;

    container.innerHTML = data.years.map(y => `
      <div class="video-year">
        <h2>${escHtml(y.label)}</h2>
        <div class="video-grid">
          ${y.videos.map(v => `
            <div class="video-card">
              <div class="video-embed">
                <iframe src="https://www.youtube.com/embed/${escHtml(v.youtubeId)}"
                  title="${escHtml(v.title)}"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen loading="lazy"></iframe>
              </div>
              <div class="video-card-body">
                <h3>${escHtml(v.title)}</h3>
                <p>${escHtml(v.subtitle)}</p>
              </div>
            </div>`).join('')}
        </div>
      </div>`).join('');
  }

  /* ── EREDMÉNYEK (eredmenyeink.html) ──────────────────────────────── */
  function renderResults(data) {
    const container = document.getElementById('results-container');
    if (!container) return;

    container.innerHTML = data.years.map(y => `
      <div class="year-section">
        <h2>${escHtml(y.label)}</h2>
        ${y.categories.map(cat => `
          <div class="result-category">
            <h3><span class="material-icons">${escHtml(cat.icon)}</span> ${escHtml(cat.title)}</h3>
            ${cat.entries.map(e => {
              if (e.type === 'paragraph') return `<p style="font-size:14px; margin-bottom:10px;">${escHtml(e.text)}</p>`;
              if (e.type === 'subheading') return `<p style="font-size:13px; font-weight:600; color:var(--navy-mid); margin:12px 0 6px;">${escHtml(e.text)}</p>`;
              if (e.type === 'note') return `<p style="font-size:13px; color:var(--gray-600); margin:10px 0 4px 24px;">${escHtml(e.text)}</p>`;
              if (e.type === 'result') return `<div class="result-item"><span class="material-icons">emoji_events</span><span>${escHtml(e.text)}</span></div>`;
              return '';
            }).join('')}
          </div>`).join('')}
      </div>`).join('');
  }

  /* ── BÜSZKESÉGEINK (buszkesegeink.html) ──────────────────────────── */
  function renderHighlights(data) {
    const spotlightsEl = document.getElementById('highlights-spotlights');
    const studentsEl   = document.getElementById('highlights-students');
    const infoBoxEl    = document.getElementById('highlights-infobox');

    if (spotlightsEl && data.spotlights) {
      spotlightsEl.innerHTML = data.spotlights.map(s => `
        <div class="spotlight-card ${escHtml(s.color)}">
          <div class="spotlight-icon ${escHtml(s.color)}">
            <span class="material-icons">${escHtml(s.icon)}</span>
          </div>
          <h3>${escHtml(s.title)}</h3>
          <p>${escHtml(s.description)}</p>
          <span class="spotlight-badge ${s.color !== 'gold' ? escHtml(s.color) : ''}">${escHtml(s.badge)}</span>
        </div>`).join('');
    }

    if (studentsEl && data.students) {
      studentsEl.innerHTML = data.students.map(st => `
        <div class="student-item">
          <div class="student-avatar"><span class="material-icons">person</span></div>
          <div>
            <h4>${escHtml(st.name)}</h4>
            <p>${escHtml(st.description)}</p>
            ${st.medals.map(m => `
              <span class="medal medal-${escHtml(m.type)}">
                <span class="material-icons">emoji_events</span> ${escHtml(m.text)}
              </span>`).join('')}
          </div>
        </div>`).join('');
    }

    if (infoBoxEl && data.infoBox) {
      infoBoxEl.innerHTML = `
        <span class="material-icons info-box-icon">language</span>
        <div>
          <strong>${escHtml(data.infoBox.title)}</strong><br>
          ${escHtml(data.infoBox.text)}
        </div>`;
    }
  }

  /* ── HIBAKEZELŐ ──────────────────────────────────────────────────── */
  function showError(containerId, msg) {
    const el = document.getElementById(containerId);
    if (el) el.innerHTML = `<p style="color:var(--gray-500);font-style:italic;">${msg}</p>`;
  }

  /* ── INIT ────────────────────────────────────────────────────────── */
  let page = window.location.pathname.split('/').pop() || 'index.html';
  if (!/\.html?$/i.test(page)) page += '.html'; // "/hirek" -> "hirek.html" (tiszta URL-ek)

  if (page === 'index.html' || page === '') {
    fetchJSON('calendar.json').then(renderCalendar).catch(() =>
      showError('calendar-tbody', 'Az eseménynaptár jelenleg nem tölthető be.'));
    fetchJSON('enrollment.json').then(renderHomeEnrollment).catch(() => {});
    fetchJSON('news.json').then(d => renderFeaturedNews(d.articles)).catch(() => {});
  }

  if (page === 'hirek.html') {
    fetchJSON('news.json').then(d => renderNewsPage(d.articles)).catch(err => {
      console.error('Hírek betöltési hiba:', err);
      showError('news-container', 'A hírek jelenleg nem tölthetők be.');
    });
  }

  if (page === 'beiratkozas.html') {
    fetchJSON('enrollment.json').then(renderEnrollmentPage).catch(() => {
      showError('beiratkozas-grid-container', 'A beiratkozási információk jelenleg nem tölthetők be.');
    });
  }

  if (page === 'helyitantervek.html') {
    fetchJSON('curriculum.json').then(renderCurriculum).catch(() =>
      showError('curriculum-container', 'A helyi tantervek jelenleg nem tölthetők be.'));
  }

  if (page === 'kompetencia.html') {
    fetchJSON('competency.json').then(renderCompetency).catch(() =>
      showError('competency-container', 'A kompetenciamérések jelenleg nem tölthetők be.'));
  }

  if (page === 'tovabbtanulas.html') {
    fetchJSON('further-education.json').then(renderFurtherEducation).catch(() =>
      showError('further-education-container', 'Az adatok jelenleg nem tölthetők be.'));
  }

  if (page === 'beiskolazas.html') {
    fetchJSON('enrollment-program.json').then(renderEnrollmentProgram).catch(() =>
      showError('enrollment-program-container', 'Az adatok jelenleg nem tölthetők be.'));
  }

  if (page === 'suliujsag.html') {
    fetchJSON('newspaper.json').then(renderNewspaper).catch(() =>
      showError('newspaper-container', 'A suliújság számai jelenleg nem tölthetők be.'));
  }

  if (page === 'videok.html') {
    fetchJSON('videos.json').then(renderVideos).catch(() =>
      showError('videos-container', 'A videók jelenleg nem tölthetők be.'));
  }

  if (page === 'eredmenyeink.html') {
    fetchJSON('results.json').then(renderResults).catch(() =>
      showError('results-container', 'Az eredmények jelenleg nem tölthetők be.'));
  }

  if (page === 'buszkesegeink.html') {
    fetchJSON('highlights.json').then(renderHighlights).catch(() => {
      showError('highlights-spotlights', 'Az adatok jelenleg nem tölthetők be.');
    });
  }
})();
