
/* =========================
   1. ELEMEN WEBSITE
========================= */

const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const languageToggle = document.getElementById("languageToggle");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const downloadCv = document.getElementById("downloadCv");

const defaultLanguage = "id";
const defaultTheme = "dark";

/* =========================
   2. PENYIMPANAN PREFERENSI
========================= */

function readPreference(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Website tetap berfungsi jika penyimpanan tidak tersedia.
  }
}

/* =========================
   3. MODE TERANG DAN GELAP
========================= */

function applyTheme(theme) {
  const isLight = theme === "light";

  body.classList.toggle("light-theme", isLight);
  themeIcon.textContent = isLight ? "☀" : "☾";

  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Aktifkan mode gelap" : "Aktifkan mode terang"
  );

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", isLight ? "#f7f8fb" : "#111318");

  savePreference("rasyid-theme", theme);
}

const initialTheme = readPreference("rasyid-theme", defaultTheme);
applyTheme(initialTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = body.classList.contains("light-theme")
    ? "dark"
    : "light";

  applyTheme(nextTheme);
});

/* =========================
   4. BAHASA INDONESIA / INGGRIS
========================= */

function applyLanguage(language) {
  const selectedLanguage = language === "en" ? "en" : "id";

  document.documentElement.lang = selectedLanguage;

  document.querySelectorAll("[data-id][data-en]").forEach((element) => {
    element.textContent = element.dataset[selectedLanguage];
  });

  languageToggle.textContent = selectedLanguage === "id" ? "EN" : "ID";

  languageToggle.setAttribute(
    "aria-label",
    selectedLanguage === "id"
      ? "Switch to English"
      : "Ganti ke Bahasa Indonesia"
  );

  savePreference("rasyid-language", selectedLanguage);
}

const initialLanguage = readPreference(
  "rasyid-language",
  defaultLanguage
);

applyLanguage(initialLanguage);

languageToggle.addEventListener("click", () => {
  const nextLanguage =
    document.documentElement.lang === "id" ? "en" : "id";

  applyLanguage(nextLanguage);
});

/* =========================
   5. MENU HAMBURGER
========================= */

function closeMenu() {
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka menu navigasi");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
  );
});

navMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", closeMenu);
});

/* Tutup menu dengan tombol Escape */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    menuToggle.focus();
  }
});

/* =========================
   6. TOMBOL UNDUH CV PDF
========================= */

/*
  Tombol tetap nonaktif sampai file cv-rasyid.pdf
  benar-benar sudah disiapkan.

  Setelah PDF tersedia, ubah bagian HTML tombol:
  - hapus aria-disabled="true"
  - hapus tabindex="-1"
  - ubah teks tombol menjadi "Unduh CV PDF"
*/

downloadCv.addEventListener("click", (event) => {
  if (downloadCv.getAttribute("aria-disabled") === "true") {
    event.preventDefault();
  }
});

/* =========================
   7. TAHUN FOOTER
========================= */

document.getElementById("currentYear").textContent =
  new Date().getFullYear();