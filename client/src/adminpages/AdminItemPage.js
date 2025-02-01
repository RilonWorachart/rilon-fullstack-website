import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import AdminItemCard from '../components/adminitempage/AdminItemCard';
import { Link } from 'react-router-dom';
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Swal from 'sweetalert2';

function AdminItemPage() {
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
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
          `${process.env.REACT_APP_API}/authen`,
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

      const response = await axios.get(`${process.env.REACT_APP_API}/getfilterproduct`, { params });
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
      const response = await axios.get(`${process.env.REACT_APP_API}/getallcategory`);
      const result = response.data;
      setCategoryData(result.data);
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

  const handleFilterChange = () => {
    setPage(1); // Reset to the first page when any filter changes
    fetchAllProductByPage();
  };


  const handleSearchTermClick = () => {
    handleFilterChange(); // Apply filters and reset page to 1
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage); // Change the current page
    }
  };

  // Toggle between grid and list views
  const toggleItemType = () => {
    setItemType((prevType) => (prevType === "type1" ? "type2" : "type1"));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="min-h-screen font-plex-sans-thai">
        <div className="mt-[70px] bg-[#E2B22C] text-white px-3 xl:px-24 py-3 md:flex md:justify-between">
          <p className="py-1">
            <Link to="/">
              <span className="hover:text-[#00007E]">{t('categorypage.p1')}</span>
            </Link>
            <span> » </span>
            <Link to="/adminpanel"><span className="">{t('admin.p5')}</span></Link>
            <span> » </span>
            <span className="">{t('admin.p9')}</span>
          </p>
          <div className="flex">
            <Link to="/admincreate">
              <button className="text-[14px] overflow-hidden truncate bg-[#5E993E] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 w-[120px]">
                {t('admin.p22')}
              </button>
            </Link>
            <button onClick={handleLogout} className="text-[14px] overflow-hidden truncate bg-[#EE0003] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 w-[120px] ml-[10px]">
              {t('admin.p23')}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex justify-end mx-[10%] 2xl:mx-[20%]">
          <div className="flex items-center border-[1px] border-lightgray py-1 px-3 mt-[30px] rounded-full text-[#6C757D]">
            <input
              type="text"
              placeholder={t('categorypage.p4')}
              className="flex-grow p-1 border-none outline-none rounded-l-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => handleSearchTermClick()}>click</button>
          </div>
        </div>

        {/* Product Category Filter */}
        <div>
          <div className="mx-[10%] 2xl:mx-[20%]">
            <div>
              <h1 className="pt-2 text-[30px] text-center">
                {t('itempage.p6')}
              </h1>
              <div className="text-[#E2B22C] h-[3px] w-[60px] text-center mx-[auto] bg-[#E2B22C]" />
            </div>
            <div className="flex flex-wrap justify-center items-center mx-[auto] py-10">
              <button
                onClick={() => setCategory('')}
                className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 ${category === '' ? 'bg-white text-[#42189F] border border-[#42189F]' : 'bg-[#E2B22C] border text-white'}`}
              >
                {t('admin.p25')}
              </button>
              {categoryData.map((categoryItem) => (
                <button
                  key={categoryItem.ID}
                  onClick={() => setCategory(categoryItem.ID)}
                  className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 ${category === categoryItem.ID ? 'bg-white text-[#42189F] border border-[#42189F]' : 'bg-[#E2B22C] border text-white'}`}
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
              <div className="text-[#E2B22C] h-[3px] w-[60px] text-center mx-[auto] bg-[#E2B22C]" />
            </div>
            <div className="flex flex-wrap justify-center items-center mx-[auto] py-10">
              <button onClick={() => setBrand('')} className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 ${brand === "" ? 'bg-white text-[#42189F] border border-[#42189F]' : 'bg-[#E2B22C] border text-white'}`}>{t('admin.p25')}</button>
              <button onClick={() => setBrand('ไรล่อน')} className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 ${brand === "ไรล่อน" ? 'bg-white text-[#42189F] border border-[#42189F]' : 'bg-[#E2B22C] border text-white'}`}>{t('admin.p26')}</button>
              <button onClick={() => setBrand('JW INVERTER')} className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 ${brand === "JW INVERTER" ? 'bg-white text-[#42189F] border border-[#42189F]' : 'bg-[#E2B22C] border text-white'}`}>JW INVERTER</button>
              <button onClick={() => setBrand('JW JINGWEITIP')} className={` py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 ${brand === "JW JINGWEITIP" ? 'bg-white text-[#42189F] border border-[#42189F]' : 'bg-[#E2B22C] border text-white'}`}>JW JINGWEITIP</button>
            </div>
          </div>
        </div>

        {/* Toggle View Button */}
        <div className="mx-[10%] 2xl:mx-[20%] my-[20px] text-[#E2B22C] text-[30px] flex justify-end items-center">
          <CgMenuGridR className="hover:text-[#00009F] mr-1" onClick={toggleItemType} />
          <TfiMenuAlt className="hover:text-[#00009F]" onClick={toggleItemType} />
        </div>

        {/* Item Grid */}
        <div className={`mb-[40px] mx-[10%] 2xl:mx-[20%] ${itemType === "type2" ? '' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-[20px]'}`}>
          {productData.map((item) => (
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
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mx-[10%] 2xl:mx-[20%] flex justify-center pb-5">
          <button
            className="px-4 py-2 bg-[#E2B22C] text-white rounded-lg mx-[10px] "
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            {t('pagination.prev')}
          </button>
          <button
            className="px-4 py-2 bg-[#E2B22C] text-white rounded-lg mx-[10px] "
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            {t('pagination.next')}
          </button>
        </div>

      </div>
      <Footer />
    </>
  );
}

export default AdminItemPage;



