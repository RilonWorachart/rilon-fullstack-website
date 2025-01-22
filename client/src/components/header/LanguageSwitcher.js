import React, { useEffect } from 'react';

const LanguageSwitcher = () => {
  useEffect(() => {
    // Create a new script tag to load Google Translate API
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Add error handling for script load failure
    script.onerror = () => {
      console.error('Failed to load Google Translate script');
      alert('There was an issue loading the translation service.');
    };

    // Initialize the Google Translate widget once the script is loaded
    window.googleTranslateElementInit = function () {
      if (window.google && window.google.translate) {
        console.log("Google Translate API loaded successfully.");
        try {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'th',  // Default language is Thai
              includedLanguages: 'th,zh-CN,ja,my,lo,vi,en,id',  // Languages to include
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,  // Hide the dropdown by default
            },
            'google_translate_element' // The container to render the widget
          );
        } catch (error) {
          console.error("Error initializing Google Translate widget: ", error);
        }
      } else {
        console.error('Google Translate API is not available.');
      }
    };

    // Cleanup the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <div className="language-switcher w-1 h-1 text-[#E2B22C] flex justify-center items-center">
      {/* Google Translate Element Container */}
      <div id="google_translate_element" className="google_translate_element" role="region" aria-label="Language Selector"></div>
    </div>
  );
};

export default LanguageSwitcher;





