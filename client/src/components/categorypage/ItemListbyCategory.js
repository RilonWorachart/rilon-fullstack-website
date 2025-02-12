import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import ItemCard from '../ItemCard'
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

function ItemListbyCategory() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const { id } = useParams();
  const [productData, setProductData] = useState([])
  const [brandData, setBrandData] = useState([])
  const [itemType, setItemType] = useState("type1")
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState(id);
  const [page, setPage] = useState(1); // State for pagination
  const [totalPages, setTotalPages] = useState(1); // Total number of pages from the API
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [inView, setInView] = useState(false); // To track if the div is in the viewport
  const divRef = useRef(null); // Reference to the div

  useEffect(() => {
    // Store the ref value in a variable before observing it
    const currentDivRef = divRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true); // Set inView to true when the component is in the viewport
          }
        });
      },
      { threshold: 0.1 } // Trigger when 50% of the element is visible
    );

    if (currentDivRef) {
      observer.observe(currentDivRef); // Observe the target div
    }

    return () => {
      // Use the variable to ensure it's accessed correctly during cleanup
      if (currentDivRef) {
        observer.unobserve(currentDivRef); // Clean up observer on unmount
      }
    };
  }, []); // Empty dependency array to set up observer once

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY); // Update the scroll position
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up event listener on unmount
    };
  }, []);

  const scrollEffect = inView ? Math.min(scrollPosition / 3, 100) : 0;


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


  const fetchAllBrandData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/getallbrand`);
      const result = response.data;
      setBrandData(result.data);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    fetchAllProductByCategory()
    fetchAllBrandData()
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
    return (
      <div className="flex justify-center items-center py-[200px]">
        <ClipLoader color="#3498db" loading={true} size={50} />
      </div>
    );
  }


  return (
    <>
      <div className="mx-[20px] ">
        <h1 className="text-[30px]">
          {t('categorypage.p5')}
        </h1>
        <div className="text-[#E2B22C] h-[3px] w-[60px] bg-[#0079A9]" />
      </div>
      <div className="mx-[20px] my-[20px] text-[#E2B22C] flex justify-between items-center">
        <div className="md:flex" >
          <button onClick={() => handleBrandClick('')} className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition duration-300 ${brand === "" ? 'bg-white text-[#0079A9] border border-[#0079A9]' : 'bg-[#E2B22C] border text-white'}`}>{currentLang === 'th' ? 'ทั้งหมด' : 'ALL'}</button>
          {brandData.map((brandItem) => (
            <button
              key={brandItem.id}
              onClick={() => handleBrandClick(brandItem.id)}
              className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition duration-300 ${brand === brandItem.id ? 'bg-white text-[#0079A9] border border-[#0079A9]' : 'bg-[#E2B22C] border text-white'}`}
            >
              {currentLang === 'th' ? brandItem.name_th : brandItem.name_en}
            </button>
          ))}
        </div>

        <div className="flex text-[30px]">
          <CgMenuGridR className="text-[#0079A9] hover:text-[#E2B22C] mr-1" onClick={() => setItemType("type1")} />
          <TfiMenuAlt className="text-[#0079A9] hover:text-[#E2B22C] " onClick={() => setItemType("type2")} />
        </div>
      </div>
      {
        (totalPages !== 0) && (
          <div className="mx-[20px] text-[24px] text-[#E2B22C] my-[20px]">
            <p className="text-[#C1C1C1] font-light ">{t('pagination.page')} <span className="">{page} /{totalPages}</span></p>
          </div>
        )
      }
      <div ref={divRef} className={`mb-[40px] mx-[20px] transition-transform duration-500 ease-in-out overflow-hidden ${itemType === "type2" ? '' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px]'} }`}
        // style={{
        //   transform: `translateY(${100 - scrollEffect}%)`
        // }}
      >
        {productData.map((item) => {
          return (
            <ItemCard key={item.ID} picture_1={item.picture_1} picture_2={item.picture_2} ID={item.ID} name_th={item.name_th}
              description_th={item.description_th} searchword_id={item.searchword_id} brand_id={item.brand_id}
              name_en={item.name_en} description_en={item.description_en}
              itemType={itemType}
            />
          )
        })}
      </div>
      {/* Pagination */}
      <div className="mx-[10%] 2xl:mx-[20%] flex justify-center pb-5">
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