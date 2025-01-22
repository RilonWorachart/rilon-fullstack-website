import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import CategorySearch from '../components/CategorySearch'
import ItemCard from '../components/ItemCard'
import SearchKeyButton from '../components/SearchKeyButton'
import { Link, useParams } from 'react-router-dom'
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi"
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';


function CatalogKeywordPage() {
  const { key } = useParams();
  const [productData, setProductData] = useState([])
  const [itemType, setItemType] = useState("type1")
  const { t } = useTranslation();


  useEffect(() => {
    // Every time the language changes, re-translate the key into the new language

    fetch(`/locales/${i18next.language}/products.json`)  // Fetch products based on current language
      .then((response) => response.json())
      .then((result) => {
        // Convert the object to an array of products
        const productsArray = Object.values(result);

        // If translatedKey exists, filter products based on the translated key
        const foundProducts = key
          ? productsArray.filter(item =>
            // Match `translatedKey` with searchword, brand, or categories (case-insensitive)
            item.searchword_filter.toLowerCase().includes(key.toLowerCase()) ||
            item.brand_filter.toLowerCase().includes(key.toLowerCase()) ||
            item.category_filter.some(category =>
              category.toLowerCase().includes(key.toLowerCase())
            )
          )
          : productsArray;  // If no key, return all products

        setProductData(foundProducts);  // Update state with filtered products
        console.log("Translated Key:", key);  // Log the translated key for debugging
      })
      .catch((error) => console.error('Error fetching data:', error));  // Handle errors
  }, [key, t]);  // Dependency on `key`, language change (`i18next.language`), and `t`


  return (
    <>
      <div className="min-h-screen font-plex-sans-thai">
        <div className="mt-[70px] bg-[#E2B22C] text-white px-3 xl:px-24 py-3 ">
          <p className="py-1">
            <Link to="/">
              <span className="hover:text-[#00007E]">{t('categorypage.p1')}</span>
            </Link>
            <span> » </span>
            <span className="">{t('categorypage.p2')}</span>
          </p>
          <h2 className="py-1 text-[20px]">{t('categorypage.p3')}</h2>
        </div>


        <div className="flex justify-end">
          <SearchKeyButton />
        </div>

        <div className="mx-[80px] my-[20px] text-[#E2B22C] text-[30px] flex justify-end items-center">
          <CgMenuGridR className="hover:text-[#00009F] mr-1" onClick={() => setItemType("type1")} />
          <TfiMenuAlt className="hover:text-[#00009F] " onClick={() => setItemType("type2")} />
        </div>

        <div className={`mb-[40px] mx-[80px] ${itemType === "type2" ? '' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-[20px]'} }`}>
          {productData.map((item) => {
            return (
              <ItemCard key={item.id} image={item.image} id={item.id} name={item.name} category={item.category}
                description={item.description} searchword={item.searchword} brand={item.brand} itemType={itemType}
              />
            )
          })}
        </div>


        <CategorySearch />
        <Footer />
      </div>
    </>
  )
}

export default CatalogKeywordPage