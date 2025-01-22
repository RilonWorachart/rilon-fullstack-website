import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import CatalogPage from "./pages/CatalogPage.js";
import ItemPage from "./pages/ItemPage.js";
import FormPage from "./pages/FormPage.js";
import CatalogKeywordPage from "./pages/CatalogKeywordPage.js";
import FixedButton from "./components/FixedButton.js";
import Header from "./components/header/Header.js";
import ScrollToTop from "./utils/ScrollToTop.js";
import { ScrollProvider } from './components/header/ScrollContext.js';
import { I18nextProvider } from 'react-i18next'; // Provides the i18n instance to your app
import i18n from './i18n'; // Import your i18n configuration

function App() {
  return (
    <I18nextProvider i18n={i18n}>
       <BrowserRouter>
      <ScrollProvider>
        <ScrollToTop />
        <FixedButton />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/keyword/:key" element={<CatalogKeywordPage />} />
          <Route path="/catalog/item/:id" element={<ItemPage />} />
          <Route path="/catalog/item/:id/request-form" element={<FormPage />} />
        </Routes>
      </ScrollProvider>
    </BrowserRouter>

    </I18nextProvider>
   
  );
}

export default App;
