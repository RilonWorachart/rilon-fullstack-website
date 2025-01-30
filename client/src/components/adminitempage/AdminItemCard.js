import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTags } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Swal from 'sweetalert2';

function AdminItemCard({ ID, picture_1, picture_2, name_th, description_th, search_word_th, brand_th, name_en, description_en, search_word_en, brand_en, category_id, itemType }) {
  const { t, i18n } = useTranslation();
  const [categoryData, setCategoryData] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const currentLang = i18n.language;

  // Fetch category data
  const fetchCategoryData = async () => {
    if (category_id) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/getcategorybyid?id=${category_id}`);
        const result = response.data;
        if (result && result.data && result.data.length > 0) {
          setCategoryData(result.data[0]);
          // console.log(t)
        } else {
          console.error("Category not found");
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    } else {
      console.error("category_id is missing");
    }
  };

  useEffect(() => {
    if (category_id) {
      fetchCategoryData();  // Fetch category data after product data is available
    } else {
      console.error("category_id is missing!");
    }
  }, [category_id]);

  // Handle delete
  const handledelete = () => {
    axios
      .delete(`${process.env.REACT_APP_API}/deleteproduct?id=${ID}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "ok") {
          Swal.fire({
            title: 'Success!',
            text: 'Deleted successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          setTimeout(() => {
            navigate(0);
          }, 1000);
        }
      })
      .catch((error) => {
        console.error("Error deleting product", error.response ? error.response.data : error);
        if (error.response && error.response.status === 401) {
          Swal.fire({
            title: 'Unauthorized!',
            text: 'Please login to continue.',
            icon: 'warning',
            confirmButtonText: 'OK',
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      });
  };

  if (!categoryData) {
    return <div>Loading...</div>; // Show loading state until data is ready
  }

  return (
    <div
      className={`shadow-md z-0 ${itemType === "type2" ? "md:flex my-2" : "max-h-[600px]"}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {/* Image Section */}
      <div className={`overflow-hidden flex ${itemType === "type2" ? "md:w-[30%]" : "h-[50%] md:h-[45%]"}`}>
        <img
          className={`transition-transform duration-300 transform ${itemType === "type2" ? "sm:w-full md:mx-[auto] md:my-[auto]" : "w-full h-full"} ${isActive ? 'scale-110 opacity-75' : ''}`}
          src={`${process.env.REACT_APP_API}${picture_1}`}
          alt={name_th}
        />
      </div>

      {/* Content Section */}
      <div className={`px-5 py-5 my-[auto] ${itemType === "type2" ? "md:w-[70%]" : "flex flex-col justify-between h-[50%] md:h-[55%]"}`}>
        <div className="">
          <p className="text-[28px] text-[#E5B22C] truncate">{currentLang === 'th' ? name_th : name_en}</p>
          <p className={`text-[14px] uppercase ${itemType === "type2" ? "w-full" : ""}`}>
            {currentLang === 'th' ? brand_th : brand_en}
          </p>
          <p
            className={`text-[14px] text-[#E5B22C] line-clamp-2 overflow-hidden pt-2 ${itemType === "type2" ? "w-full" : ""}`}
          >
            {currentLang === 'th' ? description_th : description_en}
          </p>

          {/* Second Image */}
          <img
            className={`h-[40%] w-[40%] 2xl:h-[25%] 2xl:w-[25%] my-[10px] mx-[auto] ${itemType === "type2" ? "" : "hidden"}`}
            src={`${process.env.REACT_APP_API}${picture_2}`}
            alt={name_th}
          />
        </div>

        {/* Additional Info Section */}
        <div className={`${itemType === "type2" ? "items-center" : ""}`}>
          <p className={`text-[14px] text-[#E5B22C] truncate ${itemType === "type2" ? "w-full" : ""}`}>
            Category: {currentLang === 'th' ? categoryData.name_th : categoryData.name_en}
          </p>
          <div className={`text-[#E5B22C] py-[2px] flex items-center overflow-hidden mb-2 ${itemType === "type2" ? "w-full" : ""}`}>
            <FaTags className="mr-1 w-[24px]" />
            <span className="text-[14px] truncate mr-1">{currentLang === 'th' ? search_word_th : search_word_en}</span>
          </div>

          {/* Buttons Section */}
          <div className={`flex justify-center ${itemType === "type2" ? "mx-[auto]" : ""}`}>
            <Link to={`/adminedit/${ID}`} className="w-[45%]">
              <button className="text-[14px] overflow-hidden truncate bg-[#5E993E] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 w-full">
                {t('admin.p27')}
              </button>
            </Link>
            <button
              onClick={() => handledelete()}
              className="ml-[2%] text-[14px] overflow-hidden truncate bg-[#EE0003] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 w-[45%]"
            >
              {t('admin.p28')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminItemCard;



