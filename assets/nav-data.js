// =================================================================
//  ZOLTÁNFY ISTVÁN ISKOLA – WEBOLDAL BEÁLLÍTÁSOK
// =================================================================
//  CSAK EZT A FÁJLT KELL SZERKESZTENI:
//    - Elérhetőségek módosításához (cím, telefon, e-mail)
//    - Menüpontok hozzáadásához / törléséhez / átnevezéséhez
//    - Új oldalra mutató link hozzáadásához
//
//  MENTÉS UTÁN: töltsd fel FTP-n az assets/nav-data.js fájlt,
//  és az összes oldalon automatikusan frissül a menü.
// =================================================================

// ── ISKOLAI ALAPADATOK ───────────────────────────────────────────
// Ezek jelennek meg a fejlécben, láblécben és az elérhetőség panelen
const SITE_CONFIG = {
  nev:          "Zoltánfy István Iskola",
  helyszin:     "Deszk · Szegedi KLAI tagintézménye",
  cim:          "6772 Deszk, Móra Ferenc u. 2.",
  telefon:      "62/271-220",
  telefonLink:  "tel:+3662271220",
  email:        "titkarsag.zoltanfy@klai-szeged.hu",
  facebook:     "https://www.facebook.com/zoltanfy.iskola/",
  igazgato:     "Kovács Attila",
  igazgatoCim:  "Tagintézmény-igazgató",
};

// ── NAVIGÁCIÓS MENÜ ──────────────────────────────────────────────
//
//  Kétféle menüpont létezik:
//
//  1. Egyszerű link (nincs legördülő):
//     { label: "Oldalnév", url: "oldal.html" }
//
//  2. Legördülő mega menü (több oszloppal):
//     {
//       label: "Menüpont neve",
//       cols: [
//         {
//           head: "Oszlop fejléce",
//           links: [
//             { icon: "google_icon_neve", label: "Link neve", url: "oldal.html" },
//           ]
//         }
//       ]
//     }
//
//  Az "icon" egy Google Material Icon neve (szövegként).
//  Elérhető ikonok listája: https://fonts.google.com/icons
//  Pl.: "school", "phone", "description", "lock", "photo_library"
//
//  Az "url" a fájlnév (pl. "hirek.html").
// ────────────────────────────────────────────────────────────────

const NAV_MENU = [

  // ── 1. AZ ISKOLÁRÓL ──
  {
    label: "Az Iskoláról",
    cols: [
      {
        head: "Bemutatkozás",
        links: [
          { icon: "school",       label: "Intézmény bemutatása", url: "iskola.html" },
          { icon: "info",         label: "Iskola adatai",        url: "iskola_adatai.html" },
        ]
      },
      {
        head: "Elérhetőség",
        links: [
          { icon: "phone",        label: "Kapcsolat",            url: "kapcsolat.html" },
        ],
        featured: true   // megjelenik az igazgató neve és telefonszáma
      }
    ]
  },

  // ── 2. HÍREK & KÖZÖSSÉG ──
  {
    label: "Hírek & Közösség",
    cols: [
      {
        head: "Aktualitások",
        links: [
          { icon: "article",          label: "Iskolai hírek", url: "hirek.html" },
          { icon: "edit_note",        label: "Suliújság",    url: "suliujsag.html" },
        ]
      },
      {
        head: "Képek & Videók",
        links: [
          { icon: "photo_library",    label: "Galéria",       url: "galeria.html" },
          { icon: "play_circle",      label: "Videók",        url: "videok.html" },
        ]
      }
    ]
  },

  // ── 3. OKTATÁS ──
  {
    label: "Oktatás",
    cols: [
      {
        head: "Tanulmányok",
        links: [
          { icon: "menu_book",        label: "Helyi tantervek",  url: "helyitantervek.html" },
          { icon: "analytics",        label: "Kompetenciamérés", url: "kompetencia.html" },
          { icon: "workspace_premium",label: "Továbbtanulás",    url: "tovabbtanulas.html" },
        ]
      },
      {
        head: "Felvételi",
        links: [
          { icon: "child_care",       label: "Beiskolázás",      url: "beiskolazas.html" },
          { icon: "how_to_reg",       label: "Beiratkozás",      url: "beiratkozas.html" },
        ]
      }
    ]
  },

  // ── 4. PROGRAMJAINK ──
  {
    label: "Programjaink",
    cols: [
      {
        head: "Különleges programok",
        links: [
          { icon: "directions_run",   label: "Aktív iskola",  url: "aktiviskola.html" },
          { icon: "language",         label: "Kínai program", url: "kinai.html" },
        ]
      },
      {
        head: "Sikerek",
        links: [
          { icon: "emoji_events",     label: "Eredményeink",    url: "eredmenyeink.html" },
          { icon: "stars",            label: "Büszkeségeink",   url: "buszkesegeink.html" },
        ]
      }
    ]
  },

  // ── 5. SEGÍTSÉG ──
  {
    label: "Segítség",
    cols: [
      {
        head: "Szakemberek",
        links: [
          { icon: "psychology",       label: "Iskolapszichológus", url: "iskolapszichologus.html" },
          { icon: "handshake",        label: "Szociális segítő",   url: "szocialis.html" },
        ]
      }
    ]
  },

  // ── 6. DOKUMENTUMOK ──
  {
    label: "Dokumentumok",
    cols: [
      {
        head: "Jogi és hivatalos",
        links: [
          { icon: "description",      label: "Dokumentumok",      url: "dokumentumok.html" },
          { icon: "list_alt",         label: "Közzétételi lista",  url: "kozlista.html" },
          { icon: "lock",             label: "Adatvédelem",        url: "adatvedelem.html" },
        ]
      }
    ]
  },

];
