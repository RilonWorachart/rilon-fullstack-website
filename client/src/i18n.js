import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend'; // Import the backend plugin

// Initialize i18next with the backend plugin
i18n
  .use(initReactI18next) // Passes the i18n instance to React
  .use(HttpBackend) // Use the HTTP backend to load translations
  .init({
    lng: 'th', // Default language
    fallbackLng: 'th', // Fallback language

    backend: {
      // Define the URL path for the translation files
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to your translation files in public
    },
    ns: ['translation', 'products'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false, // Not needed for React
    },
  });

export default i18n;