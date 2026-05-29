import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import ru from './locales/ru.json'
import kz from './locales/kz.json'

const savedLang = localStorage.getItem('qaztu_lang') ?? 'en'

void i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ru: { translation: ru }, kz: { translation: kz } },
  lng: savedLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export function setLanguage(lng: string) {
  void i18n.changeLanguage(lng)
  localStorage.setItem('qaztu_lang', lng)
}

export default i18n
