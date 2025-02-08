import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import AdminCategoryCard from '../components/admincategorypage/AdminCategoryCard';
import { Link } from 'react-router-dom';
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Swal from 'sweetalert2';

function AdminCategoryPage() {
  const [categoryData, setCategoryData] = useState([]);
  const [itemType, setItemType] = useState("type1"); // Default to grid view
  const { t } = useTranslation()

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
  }, [t]);


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


  // Toggle between grid and list views
  const toggleItemType = () => {
    setItemType((prevType) => (prevType === "type1" ? "type2" : "type1"));
  };


  return (
    <>
      <div className="min-h-screen font-plex-sans-thai">
        <div className="mt-[70px] bg-[#E2B22C] text-white px-3 xl:px-24 py-3 md:flex md:justify-between">
          <p className="py-1">
            <Link to="/">
              <span className="hover:text-[#00007E]">{t('categorypage.p1')}</span>
            </Link>
            <span> » </span>
            <Link to="/adminpanel"><span className="hover:text-[#00007E]">{t('admin.p5')}</span></Link>
            <span> » </span>
            <span className="">{t('admin.p47')}</span>
          </p>
          <div className="flex">
            <Link to="/admincreatecategory">
              <button className="text-[14px] overflow-hidden truncate bg-[#5E993E] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 w-[120px]">
                {t('admin.p54')}
              </button>
            </Link>
            <button onClick={handleLogout} className="text-[14px] overflow-hidden truncate bg-[#EE0003] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 w-[120px] ml-[10px]">
              {t('admin.p23')}
            </button>
          </div>
        </div>

        <div className="pt-[20px]">
          <h1 className="pt-2 text-[30px] text-center">
            {t('admin.p47')}
          </h1>
          <div className="text-[#E2B22C] h-[3px] w-[60px] mx-[auto] bg-[#E2B22C]" />
        </div>


        {/* Toggle View Button */}
        <div className="mx-[10%] 2xl:mx-[20%] my-[20px] text-[#E2B22C] flex justify-between items-center">
          <div></div>
          <div className="flex text-[30px]">
            <CgMenuGridR className="hover:text-[#00009F] mr-1" onClick={toggleItemType} />
            <TfiMenuAlt className="hover:text-[#00009F]" onClick={toggleItemType} />
          </div>
        </div>


        {/* Item Grid */}
        <div className={`mb-[40px] mx-[10%] 2xl:mx-[20%] ${itemType === "type2" ? '' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 4xl:grid-cols-4 gap-[20px]'}`}>
          {categoryData.map((item) => (
            <AdminCategoryCard
              key={item.ID}
              ID={item.ID}
              picture_1={item.picture_1}
              name_th={item.name_th}
              description_th={item.description_th}
              name_en={item.name_en}
              description_en={item.description_en}
              itemType={itemType}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AdminCategoryPage