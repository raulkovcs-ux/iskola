=====================================================================
  ZOLTÁNFY ISKOLA – ADMIN FELÜLET
  Használati útmutató
=====================================================================

Ezzel a felülettel az iskola weboldalának tartalmát (hírek, naptár,
beiratkozás, dokumentumok, videók stb.) egyszerűen, programozás nélkül
módosíthatja. A változtatások a "Közzétesz" gombbal kerülnek fel a
nyilvános weboldalra.


---------------------------------------------------------------------
1. BELÉPÉS
---------------------------------------------------------------------
1. Nyissa meg az admin oldalt a böngészőben:
      <weboldal címe>/admin/
2. Írja be a jelszót, majd nyomjon Entert vagy kattintson a
   "Belépés" gombra.
3. Hibás jelszó esetén piros figyelmeztetés jelenik meg – próbálja újra.

FONTOS:
 - Ha 10 percig nem csinál semmit, a rendszer AUTOMATIKUSAN
   kijelentkezteti. A jobb felső sarokban látja a visszaszámlálót
   ("Munkamenet: 9:41"). Az utolsó fél percben narancssárga lesz.
   Bármilyen kattintás vagy gépelés újraindítja az időt.
 - Befejezéskor mindig használja a jobb felső "Kijelentkezés" gombot.
 - Ha kijelentkezéskor vannak még nem közzétett változások, a
   rendszer rákérdez, hogy biztosan kilép-e.


---------------------------------------------------------------------
2. A FELÜLET FELÉPÍTÉSE
---------------------------------------------------------------------
 FELÜL (kék sáv):
   - "● Nem mentett változások" – narancssárga jelzés: van olyan
     módosítás, amit még nem tett közzé.
   - Munkamenet visszaszámláló.
   - GitHub Pages / FTP export kapcsoló (lásd 4. pont).
   - Kijelentkezés gomb.

 KÖZÉPEN – FÜLEK: minden fül a weboldal egy részét szerkeszti
   Hírek | Eseménynaptár | Beiratkozás | Helyi tantervek |
   Kompetenciamérés | Továbbtanulás | Beiskolázás | Suliújság |
   Videók | Eredmények | Büszkeségeink

 LENT (státusz sáv):
   - Bal oldalon üzenet arról, mi történt ("Adatok betöltve.",
     "Cikk mentve", "Közzétéve!" vagy hibaüzenet).
   - Jobb oldalon a "Közzétesz" gomb.


---------------------------------------------------------------------
3. AZ ALAPVETŐ MUNKAFOLYAMAT (ez a legfontosabb rész!)
---------------------------------------------------------------------
   1) Lépjen be.
   2) Válassza ki a megfelelő fület.
   3) Végezze el a módosítást (lásd lent fülenként).
   4) Kattintson a mezőn KÍVÜL (vagy nyomjon Tabot), hogy a rendszer
      rögzítse a beírt szöveget.
   5) Kattintson a lent lévő "Közzétesz" gombra.
   6) Várja meg a zöld "Közzétéve!" üzenetet.
   7) A weboldalon a változás kb. 1 perc múlva látszik
      (frissítse az oldalt: Ctrl+F5).

Amíg nem nyomja meg a "Közzétesz" gombot, semmi nem kerül fel a
nyilvános oldalra – nyugodtan próbálgathat. Ha elrontott valamit és
még nem tette közzé, egyszerűen töltse újra az admin oldalt (F5), és
minden a legutóbb közzétett állapotra áll vissza.

Általános gombok, amiket minden fülön talál:
   + ...  (zöld gomb)  – új elem hozzáadása
   ▲ ▼               – elem feljebb / lejjebb mozgatása a sorrendben
   ✕ vagy "Töröl"     – elem törlése (a sor/kártya eltűnik)


---------------------------------------------------------------------
4. FÜLEK RÉSZLETESEN
---------------------------------------------------------------------

4.1 HÍREK
   Bal oldalon a cikkek listája (legújabb elöl), jobb oldalon a
   szerkesztő.
   ÚJ CIKK:
     1. Kattintson a "+ Új cikk" gombra.
     2. Töltse ki: Év, Hónap, Dátum, Cím, Tartalom.
        (A tartalomban a bekezdéseket üres sorral válassza el.)
     3. Ha bepipálja a "Megjelenjen a főoldalon (kiemelt hír)"
        jelölőnégyzetet, a cikk a főoldalon is látszik.
     4. Kattintson a "Mentés" gombra.  <-- HÍREKNÉL EZ KÜLÖN LÉPÉS!
     5. Végül "Közzétesz".
   MEGLÉVŐ CIKK SZERKESZTÉSE: kattintson a cikkre a listában, írja át,
   majd "Mentés" és "Közzétesz".
   TÖRLÉS: jelölje ki a cikket, "Törlés", majd erősítse meg a
   felugró kérdést.
   A Cím és a Tartalom megadása kötelező.

4.2 ESEMÉNYNAPTÁR
   - "Hónap felirata": a naptár címe, pl. "2026. április".
   - "+ Esemény hozzáadása": új sor jön létre – írja be a Dátumot,
     az Esemény nevét és a Felelőst.
   - ▲ ▼ gombokkal a sorrend módosítható, ✕ törli az eseményt.

4.3 BEIRATKOZÁS
   - "Beiratkozási adatok": tanév, személyes beiratkozás dátuma,
     időpont, helyszín, online elérhetőség dátuma, e-KRÉTA link,
     figyelmeztető szöveg. Egyszerűen írja át a mezőket.
   - "Kitöltendő nyilatkozatok": "+ Dokumentum hozzáadása".
     Adja meg a Megnevezést, válassza ki a típust (Informatív vagy
     Kitöltendő) és a fájl elérési útját (lásd 5. pont).

4.4 HELYI TANTERVEK
   Szakaszokba rendezett dokumentumlista.
   - "+ Szakasz hozzáadása": új szakasz (pl. évfolyam-csoport).
   - Szakaszon belül "+ Dokumentum": Megnevezés + Fájl elérési útja.
   - "Töröl" a szakasz törlése (rákérdez).

4.5 KOMPETENCIAMÉRÉS
   Évek szerint csoportosított dokumentumok.
   - "+ Év hozzáadása", majd az évben "+ Dokumentum".
   - Megnevezés + Fájl elérési útja.

4.6 TOVÁBBTANULÁS
   - "+ Bejegyzés hozzáadása": az új bejegyzés a lista ELEJÉRE kerül.
   - Megnevezés + Fájl elérési útja.

4.7 BEISKOLÁZÁS
   - "Kép elérési útja": a beiskolázási program képe (pl.
     beiskolazas/beiskolazas_2026-2027.jpg). Beírás közben
     előnézet jelenik meg alatta – ha nincs előnézet, az útvonal
     hibás.
   - Kép alt szövege (látássérültek felolvasó programjának szánt
     leírás), Info szöveg, Link szövege, Link URL.

4.8 SULIÚJSÁG
   - "+ Évfolyam hozzáadása" (pl. "5. évfolyam"), azon belül
     "+ Szám": Megnevezés + Fájl elérési útja.

4.9 VIDEÓK
   - "+ Tanév hozzáadása" (az új tanév a lista elejére kerül),
     azon belül "+ Videó".
   - YouTube ID: a YouTube-link azonosítója. Példa:
        https://www.youtube.com/watch?v=bIH9fZn4Cmg
        -> az ID:  bIH9fZn4Cmg
   - Cím és Felirat (pl. dátum).

4.10 EREDMÉNYEK
   - "+ Tanév hozzáadása" -> "+ Kategória" -> "+ Sor".
   - Minden sornak van "Típus"-a: Eredmény, Bekezdés, Alcím vagy
     Megjegyzés – ez határozza meg, hogyan jelenik meg a szöveg.

4.11 BÜSZKESÉGEINK
   Három részből áll:
   a) Kiemelkedő területek (kártyák): "+ Kártya hozzáadása".
      "Módosítás" gombbal nyílik az Ikon és Szín választó.
      Töltse ki a Címet, a Jelvény szöveget és a Leírást.
   b) Kiemelkedő tanulók: "+ Tanuló hozzáadása" – Név, Leírás
      (évfolyam, szak), és "+ Érem" (Arany / Ezüst / Bronz).
   c) Info box: Cím és Szöveg (pl. angol próbanyelvvizsga).


---------------------------------------------------------------------
5. FÁJLOK (PDF-ek, képek) HOZZÁADÁSA – FONTOS!
---------------------------------------------------------------------
Az admin felület csak a fájlok ELÉRÉSI ÚTJÁT rögzíti, magát a fájlt
NEM tölti fel. Új PDF vagy kép esetén két lépés kell:

   1) Töltse fel a fájlt a weboldal megfelelő mappájába
      (pl. Dokumentumok/ vagy beiskolazas/) – GitHub-on vagy FTP-n.
   2) Az admin felületen a "Fájl elérési útja" mezőbe írja be az
      útvonalat a mappa nevével együtt, PONTOSAN a fájlnévvel.
      Példa:
         Dokumentumok/tovabbtanulas2025_26.pdf

Tippek a fájlnevekhez: kerülje az ékezeteket és a szóközöket, használjon
aláhúzást ( _ ). A kis- és nagybetű számít!


---------------------------------------------------------------------
6. KÖZZÉTÉTEL – KÉT MÓD
---------------------------------------------------------------------
A jobb felső kapcsolóval választhat:

A) GitHub Pages (alapértelmezett)
   Első alkalommal (vagy új gépen) töltse ki a kék beállító sávot:
     - GitHub repo (tulajdonos/repo)
     - Branch (általában: main)
     - Personal Access Token (ghp_... kezdetű kód)
   Ezeket a böngésző megjegyzi az adott gépen.
   A token jelszó jellegű adat – ne ossza meg másokkal, és csak saját
   gépen mentse el.
   Ezután a "Közzétesz" gomb közvetlenül feltölti a változásokat.
   Siker: "Közzétéve! A GitHub Pages frissítése ~60 másodpercet vesz
   igénybe."

B) FTP export
   1. Kattintson az "FTP export" gombra a jobb felső sarokban.
   2. Kattintson az "Exportálás (ZIP)" gombra – letölt egy
      data-export-DÁTUM.zip fájlt.
   3. Kibontás után a data mappában lévő fájlokat töltse fel FTP-vel
      (Total Commander / FileZilla) a szerver /data/ mappájába,
      felülírva a régieket ("Igen az összes").
      A felugró ablak lépésről lépésre végigvezeti ezen.


---------------------------------------------------------------------
7. HIBAELHÁRÍTÁS
---------------------------------------------------------------------
"Néhány adatfájl nem töltődött be – ellenőrizze a /data/ mappát."
   -> Hiányzik vagy sérült egy fájl a /data/ mappából. Ne közzétegyen,
      amíg nem rendeződik; kérjen segítséget.

"Adja meg a GitHub repót és a Personal Access Tokent..."
   -> Töltse ki a kék beállító sávot (6/A pont).

"Hiba a közzétés során: ..."
   -> Leggyakrabban a token lejárt vagy hibás, vagy nincs
      internetkapcsolat. Generáljon új tokent, illetve ellenőrizze a
      repo nevét (tulajdonos/repo).

A weboldalon nem látszik a változás.
   -> Várjon 1-2 percet, majd frissítsen: Ctrl+F5. Ellenőrizze, hogy
      látta-e a zöld "Közzétéve!" üzenetet.

A kép/PDF nem nyílik meg az oldalon.
   -> A fájl nincs feltöltve, vagy az elérési út (mappa, fájlnév,
      kis/nagybetű) eltér. Lásd 5. pont.

Kijelentkeztetett munka közben.
   -> 10 perc tétlenség után történik. Mivel a nem közzétett munka
      ilyenkor elveszik, hosszabb szerkesztésnél közben is nyomjon
      "Közzétesz"-t.

Elfelejtett jelszó.
   -> A jelszót a fejlesztő tudja módosítani; forduljon hozzá.


---------------------------------------------------------------------
8. BIZTONSÁGI TANÁCSOK
---------------------------------------------------------------------
 - A jelszót és a GitHub tokent ne ossza meg, ne írja fel a
   monitorra.
 - Közös vagy nyilvános számítógépen ne mentse el a tokent, és
   használat után mindig jelentkezzen ki.
 - Rendszeresen (pl. tanévente) érdemes lecserélni a tokent.


---------------------------------------------------------------------
Kérdés esetén forduljon a weboldal fejlesztőjéhez.
=====================================================================
