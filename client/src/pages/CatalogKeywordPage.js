import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import CategorySearch from '../components/CategorySearch'
import ItemCard from '../components/ItemCard'
import SearchKeyButton from '../components/SearchKeyButton'
import { Link, useParams } from 'react-router-dom'
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi"
import { useTranslation } from 'react-i18next';
import axios from 'axios';


function CatalogKeywordPage() {
  const { key } = useParams();
  const [productData, setProductData] = useState([])
  const [itemType, setItemType] = useState("type1")
  const { t } = useTranslation();

  
  const fetchAllProductByfilter = async () => {
    try {
      // Use Axios to send the GET request
      const response = await axios.get(`${process.env.REACT_APP_API}/getallproduct`);
      const result = response.data;
      const productsArray = result.data || [];

      const foundProducts = key
        ? productsArray.filter(item =>
            (item.search_word_th && item.search_word_th.toLowerCase().includes(key.toLowerCase())) ||
            (item.brand_th && item.brand_th.toLowerCase().includes(key.toLowerCase())) ||
            (item.category_th && item.category_th.some(category => category.toLowerCase().includes(key.toLowerCase())))
          )
        : productsArray; // If no key, return all products

      setProductData(foundProducts); // Update state with filtered products
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchAllProductByfilter(); // Fetch products whenever 'key' or language changes
  }, [key, t]);


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
              <ItemCard key={item.ID} picture_1={item.picture_1} ID={item.ID} name_th={item.name_th} category_id={item.category_id}
                description_th={item.description_th} search_word_th={item.search_word_th} brand={item.brand_th} name_en={item.name_en}  description_en={item.description_en} search_word_en={item.search_word_en} itemType={itemType}
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