import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ItemCard from '../ItemCard'
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

function ItemListbyCategory() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const { id } = useParams();
  const [productData, setProductData] = useState([])
  const [itemType, setItemType] = useState("type1")
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState(id);
  const [page, setPage] = useState(1); // State for pagination
  const [totalPages, setTotalPages] = useState(1); // Total number of pages from the API
  const [loading, setLoading] = useState(true);


  const fetchAllProductByCategory = async () => {
    setLoading(true);
    const params = {
      category,
      brand,
      page,
    };
    try {
      // Use Axios to send the GET request
      const response = await axios.get(`${process.env.REACT_APP_API}/getfilterproduct`, { params });
      const result = response.data;
      setProductData(result.data);
      setTotalPages(result.pagination.totalPages); // Set total pages from the response
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProductByCategory()
  }, [t, page, category, brand]); // Empty dependency array means this runs once when the component mounts


  const handleBrandClick = (input) => {
    setPage(1);
    setBrand(input)
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage); // Change the current page
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mx-[20px] ">
        <h1 className="text-[30px]">
          {t('categorypage.p5')}
        </h1>
        <div className="text-[#E2B22C] h-[3px] w-[60px] bg-[#E2B22C]" />
      </div>
      <div className="mx-[20px] my-[20px] text-[#E2B22C] flex justify-between items-center">
        <div className="md:flex" >
          <button onClick={() => handleBrandClick('')} className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 ${brand === "" ? 'bg-white text-[#42189F] border border-[#42189F]' : 'bg-[#E2B22C] border text-white'}`}>{currentLang === 'th' ? 'ทั้งหมด' : 'ALL'}</button>
          <button onClick={() => handleBrandClick('ไรล่อน')} className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300  ${brand === "ไรล่อน" ? 'bg-white text-[#42189F] border border-[#42189F]' : 'bg-[#E2B22C] border text-white'}`}>{currentLang === 'th' ? 'ไรล่อน' : 'RILON'}</button>
          <button onClick={() => handleBrandClick('JW INVERTER')} className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 ${brand === "JW INVERTER" ? 'bg-white text-[#42189F] border border-[#42189F]' : 'bg-[#E2B22C] border text-white'}`}>JW INVERTER</button>
          <button onClick={() => handleBrandClick('JW JINGWEITIP')} className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 ${brand === "JW JINGWEITIP" ? 'bg-white text-[#42189F] border border-[#42189F]' : 'bg-[#E2B22C] border text-white'}`}>JW JINGWEITIP</button>
        </div>

        <div className="flex text-[30px]">
          <CgMenuGridR className="hover:text-[#00009F] mr-1" onClick={() => setItemType("type1")} />
          <TfiMenuAlt className="hover:text-[#00009F] " onClick={() => setItemType("type2")} />
        </div>
      </div>
      {
        (totalPages !== 0) && (
          <div className="mx-[20px] text-[24px] text-[#E2B22C] mb-[20px]">
            <p>{t('pagination.page')} <span className="">{page}</span> {t('pagination.from')} <span>{totalPages}</span></p>
          </div>
        )
      }
      <div className={`mb-[40px] mx-[20px] ${itemType === "type2" ? '' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[20px]'} }`}>
        {productData.map((item) => {
          return (
            <ItemCard key={item.ID} picture_1={item.picture_1} picture_2={item.picture_2} ID={item.ID} name_th={item.name_th}
              description_th={item.description_th} search_word_th={item.search_word_th} brand_th={item.brand_th}
              name_en={item.name_en} description_en={item.description_en} search_word_en={item.search_word_en} brand_en={item.brand_en}
              itemType={itemType}
            />
          )
        })}
      </div>
      {/* Pagination */}
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
          ((page !== totalPages) && (totalPages !== 0)) && (
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
    </>
  )
}

export default ItemListbyCategory