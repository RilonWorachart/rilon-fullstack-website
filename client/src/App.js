import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import ItemPage from "./pages/ItemPage.js";
import FormPage from "./pages/FormPage.js";
import CategoryPage from './pages/CategoryPage.js'
import CatalogKeywordPage from "./pages/CatalogKeywordPage.js";
import AdminLoginPage from './adminpages/AdminLoginPage.js'
import AdminPanelPage from './adminpages/AdminPanelPage.js'
import AdminItemPage from './adminpages/AdminItemPage.js';
import AdminEditItemPage from './adminpages/AdminEditItemPage.js'
import AdminCreateItemPage from './adminpages/AdminCreateItemPage.js';
import AdminRecommendPage from './adminpages/AdminRecommendPage.js';
import AdminCategoryPage from "./adminpages/AdminCategoryPage.js";
import AdminEditCategoryPage from './adminpages/AdminEditCategoryPage.js';
import AdminCreateCategoryPage from "./adminpages/AdminCreateCategoryPage.js";
import AdminBrandPage from "./adminpages/AdminBrandPage.js";
import AdminSearchwordPage from "./adminpages/AdminSearchWordPage.js";
import AdminVideoPage from "./adminpages/AdminVideoPage.js";
import FixedButton from "./components/FixedButton.js";
import Header from "./components/header/Header.js";
import AdminBannerPage from "./adminpages/AdminBannerPage.js";
import ScrollToTop from "./utils/ScrollToTop.js";
import { I18nextProvider } from 'react-i18next'; // Provides the i18n instance to your app
import i18n from './i18n'; // Import your i18n configuration

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
          <ScrollToTop />
          <FixedButton />
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/item/:id" element={<ItemPage />} />
            <Route path="/catalog/keyword/:key" element={<CatalogKeywordPage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/requestform" element={<FormPage />} />
            <Route path="/adminlogin" element={<AdminLoginPage />} />
            <Route path="/adminpanel" element={<AdminPanelPage />} />
            <Route path="/adminitem" element={<AdminItemPage />} />
            <Route path="/admincreate" element={<AdminCreateItemPage />} />
            <Route path="/adminedit/:id" element={<AdminEditItemPage />} />
            <Route path="/adminrecommend" element={<AdminRecommendPage />} />
            <Route path="/admincategory" element={<AdminCategoryPage />} />
            <Route path="/admincreatecategory" element={<AdminCreateCategoryPage />} />
            <Route path="/admineditcategory/:id" element={<AdminEditCategoryPage />} />
            <Route path="/adminbrand" element={<AdminBrandPage />} />
            <Route path="/adminsearchword" element={<AdminSearchwordPage />} />
            <Route path="/adminvideo" element={<AdminVideoPage />} />
            <Route path="/adminbanner" element={<AdminBannerPage />} />
          </Routes>
      </BrowserRouter>
    </I18nextProvider>
  );
}


export default App;
