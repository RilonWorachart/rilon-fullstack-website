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
  const [page, setPage] = useState(1); // Track the current page
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const { t } = useTranslation();


  const fetchAllProductByfilter = async () => {
    try {
      // Use Axios to send the GET request
      const response = await axios.get(`${process.env.REACT_APP_API}/getallcatelog`, {
        params: {
          key,
          page: page,
          limit: itemsPerPage,
        },
      });
      const result = response.data;

      if (result.status === "ok") {
        const { data, pagination } = result;
        setProductData(data); // Set the paginated and filtered products
        setTotalPages(pagination.totalPages); // Set the total number of pages
        setTotalProducts(pagination.totalProducts); // Set the total number of filtered products
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchAllProductByfilter(); // Fetch products whenever 'key', 'page', or language changes
  }, [key, page, t]);

  useEffect(() => {
    setPage(1); // Set the page to 1 when the key changes
  }, [key]); // This effect will trigger when 'key' changes


  // Pagination handlers
  const handlePageChange = (page) => {
    setPage(page); // Update the current page
    window.scrollTo(0, 0);
  };

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


        {
          (totalPages !== 0) && (
            <div className="mx-[10%] 2xl:mx-[20%] my-[20px] text-[#E2B22C] flex justify-between items-center">
              <div className="text-[24px]">
                <p>{t('pagination.page')} <span className="">{page}</span> {t('pagination.from')} <span>{totalPages}</span></p>
              </div>
              <div className="my-[20px] text-[#E2B22C] text-[30px] flex justify-end items-center">
                <CgMenuGridR className="hover:text-[#00009F] mr-1" onClick={() => setItemType("type1")} />
                <TfiMenuAlt className="hover:text-[#00009F] " onClick={() => setItemType("type2")} />
              </div>
            </div>
          )
        }
        <div className={`mb-[40px] mx-[10%] 2xl:mx-[20%] ${itemType === "type2" ? '' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-[20px]'} }`}>
          {productData.map((item) => {
            return (
              <ItemCard key={item.ID} picture_1={item.picture_1} ID={item.ID} name_th={item.name_th} category_id={item.category_id}
                description_th={item.description_th} search_word_th={item.search_word_th} brand_th={item.brand_th} brand_en={item.brand_en} name_en={item.name_en} description_en={item.description_en} search_word_en={item.search_word_en} itemType={itemType}
              />
            )
          })}
        </div>

        <div className="mx-[10%] 2xl:mx-[20%] flex justify-center pb-5">
          {
            (page !== 1) && (
              <button
                className="px-4 py-2 bg-[#E2B22C] border border-[#E2B22C] text-white  hover:text-[#00009F] hover:bg-white hover:border-[#00009F] rounded-lg mx-[10px] "
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                {t('pagination.prev')}
              </button>
            )
          }
          {
            (page !== totalPages && (totalPages !== 0)) && (
              <button
                className="px-4 py-2 bg-[#E2B22C] border border-[#E2B22C] text-white  hover:text-[#00009F] hover:bg-white hover:border-[#00009F] rounded-lg mx-[10px] "
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                {t('pagination.next')}
              </button>
            )
          }
        </div>
        {
          (totalPages === 0) && (
            <div className="text-center text-[24px] mb-[50px] text-[#E2B22C]">{t('pagination.noproduct')}</div>
          )
        }
        <CategorySearch />
        <Footer />
      </div>
    </>
  )
}

export default CatalogKeywordPage