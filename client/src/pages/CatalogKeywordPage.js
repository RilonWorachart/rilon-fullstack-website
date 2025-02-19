import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import CategorySearch from '../components/CategorySearch'
import ItemCard from '../components/ItemCard'
import SearchKeyButton from '../components/SearchKeyButton'
import { Link, useParams } from 'react-router-dom'
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi"
import { FaAngleLeft } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";
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
        <div className="mt-[70px] bg-[#0079A9] text-white px-3 xl:px-24 py-3 md:flex md:justify-between items-center">
          <p className="py-1">
            <Link to="/">
              <span className="hover:text-[#EEE185]">{t('categorypage.p1')}</span>
            </Link>
            <span> » </span>
            <span className="">{t('categorypage.p2')}</span>
          </p>
          <h2 className="py-1 text-[20px]">{t('categorypage.p3')}</h2>
        </div>


        <div className="flex justify-end mx-[10%] 2xl:mx-[auto] max-w-[1300px]">
          <SearchKeyButton />
        </div>


        {
          (totalPages !== 0) && (
            <div className="mx-[10%] 2xl:mx-[auto] max-w-[1300px] my-[20px] text-[#0079A9] flex justify-between items-center">
              <div className="text-[24px]">
                <p className="text-[#C1C1C1] font-light ">{t('pagination.page')} <span className="">{page} /{totalPages}</span></p>
              </div>
              <div className="my-[20px] text-[30px] flex justify-end items-center">
                <CgMenuGridR className="hover:text-[#EEE185] cursor-pointer mr-1" onClick={() => setItemType("type1")} />
                <TfiMenuAlt className="hover:text-[#EEE185] cursor-pointer" onClick={() => setItemType("type2")} />
              </div>
            </div>
          )
        }
        <div className={`mb-[40px] mx-[10%] 2xl:mx-[auto] max-w-[1300px] ${itemType === "type2" ? '' : 'grid grid-cols-1 category1:grid-cols-2 category2:grid-cols-3 2xl:grid-cols-4 gap-[20px]'} }`}>
          {productData.map((item) => {
            return (
              <div className="mx-[auto]">
                <ItemCard key={item.ID} picture_1={item.picture_1} ID={item.ID} name_th={item.name_th} category_id={item.category_id}
                  description_th={item.description_th} name_en={item.name_en} description_en={item.description_en} brand_id={item.brand_id} searchword_id={item.searchword_id} itemType={itemType}
                />
              </div>
            )
          })}
        </div>

        {
          (totalPages !== 0) && (
            <div className="mx-[10%] 2xl:mx-[20%] flex justify-center items-center pb-5">
              <button
                className={`px-4 py-4 
                         rounded-full mr-[10px] ${page !== 1 ? "bg-[#E2B22C] border border-[#E2B22C] text-white  hover:text-[#00009F] hover:bg-white hover:border-[#00009F] " : "border border-[#E0E0E0] text-[#E0E0E0]"}`}
                onClick={() => handlePageChange(1)}
                disabled={page === 1}
              >
                <FaAnglesLeft />
              </button>
              <button
                className={`px-4 py-4 
                         rounded-full mr-[20px] ${page !== 1 ? "bg-[#E2B22C] border border-[#E2B22C] text-white  hover:text-[#00009F] hover:bg-white hover:border-[#00009F] " : "border border-[#E0E0E0] text-[#E0E0E0]"}`}
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                <FaAngleLeft />
              </button>

              <div className="text-[20px]">
                <p><span className="font-light text-[#959595]">{page} / {totalPages}</span></p>
              </div>

              <button
                className={`px-4 py-4 
                         rounded-full ml-[20px] ${page !== totalPages && (totalPages !== 0) ? "bg-[#E2B22C] border border-[#E2B22C] text-white  hover:text-[#00009F] hover:bg-white hover:border-[#00009F] " : "border border-[#E0E0E0] text-[#E0E0E0]"}`}
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                <FaAngleRight />
              </button>
              <button
                className={`px-4 py-4 
                         rounded-full ml-[10px] ${page !== totalPages && (totalPages !== 0) ? "bg-[#E2B22C] border border-[#E2B22C] text-white  hover:text-[#00009F] hover:bg-white hover:border-[#00009F] " : "border border-[#E0E0E0] text-[#E0E0E0]"}`}
                onClick={() => handlePageChange(totalPages)}
                disabled={page === totalPages}
              >
                <FaAnglesRight />
              </button>
            </div>
          )
        }
        {
          (totalPages === 0) && (
            <div className="text-center text-[24px] mb-[50px] text-[#E2B22C]">{t('pagination.noproduct')}</div>
          )
        }
        <div className="h-[50px]"></div>
        <CategorySearch />
        <Footer />
      </div>
    </>
  )
}

export default CatalogKeywordPage