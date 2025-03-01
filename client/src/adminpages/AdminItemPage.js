import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import AdminItemCard from '../components/adminitempage/AdminItemCard';
import { Link } from 'react-router-dom';
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaSearch } from "react-icons/fa";
import { ClipLoader } from 'react-spinners';

function AdminItemPage() {
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [itemType, setItemType] = useState("type1"); // Default to grid view
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [searchTerm, setSearchTerm] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // State for pagination
  const [totalPages, setTotalPages] = useState(1); // Total number of pages from the API

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .post(
          `${process.env.REACT_APP_API}/api/authen`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.status === "ok") {
            fetchAllProductByPage();
            fetchAllCategoryData();
            fetchAllBrandData();
          } else {
            localStorage.removeItem("token");
            window.location = "/adminlogin";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          localStorage.removeItem("token");
          window.location = "/adminlogin";
          Swal.fire({
            title: 'Oops!',
            text: 'Please login again.',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        });
    } else {
      window.location = "/adminlogin";
    }
  }, [t, page, category, brand]);

  const fetchAllProductByPage = async () => {
    try {
      setLoading(true);
      const params = {
        searchTerm,
        category,
        brand,
        page,
      };

      const response = await axios.get(`${process.env.REACT_APP_API}/api/getfilterproduct`, { params });
      const result = response.data;
      setProductData(result.data);
      setTotalPages(result.pagination.totalPages); // Set total pages from the response
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  };

  const fetchAllCategoryData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/getallcategory`);
      const result = response.data;
      setCategoryData(result.data);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const fetchAllBrandData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/getallbrand`);
      const result = response.data;
      setBrandData(result.data);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    Swal.fire({
      title: 'Success!',
      text: 'Logout successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    setTimeout(() => {
      window.location = "/adminlogin";
    }, 1000);
  };

  const handleSearchTermClick = () => {
    setPage(1);
    fetchAllProductByPage();
  };

  const handleBrandClick = (input) => {
    setPage(1);
    setBrand(input)
  };


  const handleCategoryClick = (input) => {
    setPage(1);
    setCategory(input)
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
      <div className="min-h-screen font-plex-sans-thai">
        <div className="mt-[84px] px-10 xl:px-24 py-3 bg-[#0079A9] text-white md:flex md:justify-between items-center">
          <p className="py-1">
            <Link to="/">
              <span className="hover:text-[#EEE185]">{t('categorypage.p1')}</span>
            </Link>
            <span> » </span>
            <Link to="/adminpanel"><span className="hover:text-[#EEE185]">{t('admin.p5')}</span></Link>
            <span> » </span>
            <span className="">{t('admin.p7')}</span>
          </p>
          <div className="flex justify-start items-center">
            <Link to="/admincreate">
              <button className="text-[14px] overflow-hidden truncate bg-[#5E993E] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition duration-300 w-[120px]">
                {t('admin.p22')}
              </button>
            </Link>
            <button onClick={handleLogout} className="text-[14px] overflow-hidden truncate bg-[#EE0003] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition duration-300 w-[120px] ml-[10px]">
              {t('admin.p23')}
            </button>
          </div>
        </div>


        {/* Product Category Filter */}
        <div>
          <div className="mx-[10%] 2xl:mx-[20%] mt-[50px]">
            <div>
              <h1 className="pt-2 text-[30px] text-center">
                {t('itempage.p6')}
              </h1>
              <div className="text-[#E2B22C] h-[3px] w-[60px] text-center mx-[auto] bg-[#0079A9]" />
            </div>
            <div className="flex flex-wrap justify-center items-center mx-[auto] py-10">
              <button
                onClick={() => handleCategoryClick('')}
                className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition duration-300 ${category === '' ? 'bg-white text-[#0079A9] border border-[#0079A9]' : 'bg-[#E2B22C] border text-white'}`}
              >
                {t('admin.p25')}
              </button>
              {categoryData.map((categoryItem) => (
                <button
                  key={categoryItem.ID}
                  onClick={() => handleCategoryClick(categoryItem.ID)}
                  className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition duration-300 ${category === categoryItem.ID ? 'bg-white text-[#0079A9] border border-[#0079A9]' : 'bg-[#E2B22C] border text-white'}`}
                >
                  {currentLang === 'th' ? categoryItem.name_th : categoryItem.name_en}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="mx-[10%] 2xl:mx-[20%]">
            <div>
              <h1 className="pt-2 text-[30px] text-center">
                {t('search.p16')}
              </h1>
              <div className="text-[#E2B22C] h-[3px] w-[60px] text-center mx-[auto] bg-[#0079A9]" />
            </div>
            <div className="flex flex-wrap justify-center items-center mx-[auto] py-10">
              <button onClick={() => handleBrandClick('')} className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition duration-300 ${brand === "" ? 'bg-white text-[#0079A9] border border-[#0079A9]' : 'bg-[#E2B22C] border text-white'}`}>{t('admin.p25')}</button>
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
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex justify-end mx-[10%] 2xl:mx-[auto] max-w-[1300px]">
          <div className="flex items-center border-[1px] border-lightgray py-1 px-3 mt-[30px] rounded-full text-[#6C757D]">
            <input
              type="text"
              placeholder={t('categorypage.p4')}
              className="flex-grow p-1 border-none outline-none rounded-l-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => handleSearchTermClick()}>
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Toggle View Button */}
        {
          (totalPages !== 0) && (
            <div className="mx-[10%] 2xl:mx-[auto] max-w-[1300px] my-[20px] text-[#0079A9] flex justify-between items-center">
              <div className="text-[24px]">
                <p className="text-[#C1C1C1] font-light ">{t('pagination.page')} <span className="">{page} /{totalPages}</span></p>
              </div>
              <div className="flex text-[30px]">
                <CgMenuGridR className="hover:text-[#EEE185] mr-1 cursor-pointer" onClick={() => setItemType("type1")} />
                <TfiMenuAlt className="hover:text-[#EEE185] cursor-pointer" onClick={() => setItemType("type2")} />
              </div>
            </div>
          )
        }

        {/* Item Grid */}
        <div className={`mb-[40px] mx-[10%] 2xl:mx-[auto] max-w-[1300px] ${itemType === "type2" ? '' : 'grid grid-cols-1 category1:grid-cols-2 category2:grid-cols-3 2xl:grid-cols-4 gap-[20px]'}`}>
          {productData.map((item) => (
            <div className="mx-[auto]">
              <AdminItemCard
                key={item.ID}
                item={item}
                category_id={item.category_id}
                ID={item.ID}
                picture_1={item.picture_1}
                picture_2={item.picture_2}
                name_th={item.name_th}
                description_th={item.description_th}
                search_word_th={item.search_word_th}
                brand_th={item.brand_th}
                name_en={item.name_en}
                description_en={item.description_en}
                search_word_en={item.search_word_en}
                brand_en={item.brand_en}
                itemType={itemType}
                searchword_id={item.searchword_id}
                brand_id={item.brand_id}
              />
            </div>
          ))}
        </div>

        {/* Pagination */}

        {
          (totalPages !== 0) && (
            <div className="mx-[10%] 2xl:mx-[20%] flex justify-center items-center pb-5">
              <button
                className={`px-4 py-4 
                         rounded-full mr-[10px] ${page !== 1 ? "bg-[#E2B22C] border border-[#E2B22C] text-white  hover:text-[#0079A9] hover:bg-white hover:border-[#0079A9] " : "border border-[#E0E0E0] text-[#E0E0E0]"}`}
                onClick={() => handlePageChange(1)}
                disabled={page === 1}
              >
                <FaAnglesLeft />
              </button>
              <button
                className={`px-4 py-4 
                         rounded-full mr-[20px] ${page !== 1 ? "bg-[#E2B22C] border border-[#E2B22C] text-white  hover:text-[#0079A9] hover:bg-white hover:border-[#0079A9] " : "border border-[#E0E0E0] text-[#E0E0E0]"}`}
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
                         rounded-full ml-[20px] ${page !== totalPages && (totalPages !== 0) ? "bg-[#E2B22C] border border-[#E2B22C] text-white  hover:text-[#0079A9] hover:bg-white hover:border-[#0079A9] " : "border border-[#E0E0E0] text-[#E0E0E0]"}`}
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                <FaAngleRight />
              </button>
              <button
                className={`px-4 py-4 
                         rounded-full ml-[10px] ${page !== totalPages && (totalPages !== 0) ? "bg-[#E2B22C] border border-[#E2B22C] text-white  hover:text-[#0079A9] hover:bg-white hover:border-[#0079A9] " : "border border-[#E0E0E0] text-[#E0E0E0]"}`}
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
      </div>
      <div className="h-[50px]"></div>
      <Footer />
    </>
  );
}

export default AdminItemPage;



