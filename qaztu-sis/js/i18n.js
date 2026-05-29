const translations = {
  en: {
    welcome: "Welcome back",
    signInSubtitle: "Sign in to your QazTU account to continue.",
    username: "Username / IIN",
    usernamePlaceholder: "Enter your username or IIN",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    remember: "Remember me",
    forgot: "Forgot password?",
    signIn: "Sign in",
    orContinue: "or continue with",
    ssoLogin: "SSO Login",
    egovId: "eGov ID",
    trouble: "Having trouble? Contact",
    itSupport: "IT Support",
    heroTitle: "Empowering Education Through Technology",
    heroSubtitle:
      "The unified academic platform for students, teachers and administrators of Kazakhstan.",
    adminDashboard: "Admin Dashboard",
    studentDashboard: "Student Dashboard",
    teacherDashboard: "Teacher Dashboard",
    logout: "Log out",
    viewAll: "View all",
    demoMsg: "This feature is available in demo mode only.",
    forgotMsg: "Password reset link would be sent to your registered email.",
  },
  ru: {
    welcome: "С возвращением",
    signInSubtitle: "Войдите в аккаунт QazTU, чтобы продолжить.",
    username: "Логин / ИИН",
    usernamePlaceholder: "Введите логин или ИИН",
    password: "Пароль",
    passwordPlaceholder: "Введите пароль",
    remember: "Запомнить меня",
    forgot: "Забыли пароль?",
    signIn: "Войти",
    orContinue: "или продолжить с",
    ssoLogin: "SSO вход",
    egovId: "eGov ID",
    trouble: "Проблемы? Свяжитесь с",
    itSupport: "IT поддержкой",
    heroTitle: "Образование через технологии",
    heroSubtitle:
      "Единая академическая платформа для студентов, преподавателей и администраторов Казахстана.",
    adminDashboard: "Панель администратора",
    studentDashboard: "Панель студента",
    teacherDashboard: "Панель преподавателя",
    logout: "Выйти",
    viewAll: "Смотреть все",
    demoMsg: "Эта функция доступна только в демо-режиме.",
    forgotMsg: "Ссылка для сброса пароля будет отправлена на ваш email.",
  },
  kz: {
    welcome: "Қайта қош келдіңіз",
    signInSubtitle: "Жалғастыру үшін QazTU аккаунтыңызға кіріңіз.",
    username: "Пайдаланушы аты / ЖСН",
    usernamePlaceholder: "Пайдаланушы аты немесе ЖСН енгізіңіз",
    password: "Құпия сөз",
    passwordPlaceholder: "Құпия сөзді енгізіңіз",
    remember: "Мені есте сақта",
    forgot: "Құпия сөзді ұмыттыңыз ба?",
    signIn: "Кіру",
    orContinue: "немесе мына арқылы",
    ssoLogin: "SSO кіру",
    egovId: "eGov ID",
    trouble: "Қиындық бар ма? Хабарласыңыз",
    itSupport: "IT қолдау",
    heroTitle: "Технология арқылы білім беру",
    heroSubtitle:
      "Қазақстан студенттері, мұғалімдері және әкімшілері үшін бірыңғай академиялық платформа.",
    adminDashboard: "Әкімші панелі",
    studentDashboard: "Студент панелі",
    teacherDashboard: "Мұғалім панелі",
    logout: "Шығу",
    viewAll: "Барлығын көру",
    demoMsg: "Бұл функция тек демо режимінде қолжетімді.",
    forgotMsg: "Құпия сөзді қалпына келтіру сілтемесі email-ге жіберіледі.",
  },
};

let currentLang = localStorage.getItem("qaztu_lang") || "en";

function t(key) {
  return translations[currentLang]?.[key] || translations.en[key] || key;
}

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem("qaztu_lang", lang);
  applyTranslations();
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });
  const langSelect = document.getElementById("headerLang");
  if (langSelect) langSelect.value = lang;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (el.tagName === "INPUT" && el.placeholder !== undefined) {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
}

function initLanguageSwitcher() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });
  const langSelect = document.getElementById("headerLang");
  if (langSelect) {
    langSelect.addEventListener("change", (e) => setLanguage(e.target.value));
  }
  setLanguage(currentLang);
}

document.addEventListener("DOMContentLoaded", initLanguageSwitcher);
