import i18n from "i18next";
import Backend from "i18next-http-backend";
import Cache from 'i18next-localstorage-cache';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

i18n
   // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
   // learn more: https://github.com/i18next/i18next-http-backend
   .use(Backend)
   .use(Cache)
   .use(LanguageDetector)
   .use(initReactI18next) // passes i18n down to react-i18next
   .init({
      backend: {
         loadPath: "/locales/{{lng}}.json", // resource path
      },
      fallbackLng: "en",
      supportedLngs: ["en", "my", "vn", "ch"], // Allowed languages
      detection: {
         order: ['cookie', 'localStorage', 'htmlTag', 'querystring', 'path', 'subdomain'],
         caches: ['cookie', 'localStorage']
      },
      interpolation: {
         escapeValue: false, // react already safes from xss
      },
      // debug: true,
   });

export default i18n;