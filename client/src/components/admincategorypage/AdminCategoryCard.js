import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import axios from 'axios';
import Swal from 'sweetalert2';

function AdminCategoryCard({ ID, picture_1, name_th, description_th, name_en, description_en, itemType }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [isActive, setIsActive] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();


  useEffect(() => {
    // console.log(`${process.env.REACT_APP_API}/uploads/${picture_1}`)
  })

  const handledelete = () => {
    axios
      .delete(`${process.env.REACT_APP_API}/deletecategory?id=${ID}`, {
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



  return (
    <div
      className={`shadow-md z-0 ${itemType === "type2" ? "my-2 md:flex" : "flex flex-col justify-between"}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div className={`flex ${itemType === "type2" ? "md:w-[30%]" : "h-[60%] my-[auto]"}`}>
        <div className={`bg-black overflow-hidden flex justify-center my-[auto] mx-[auto] h-[100%] w-[100%] ${itemType === "type2" ? "" : ""}`}>
          <img
            className={`transition-transform duration-300 transform overflow-hidden w-full h-full ${itemType === "type2" ? "" : ""} ${isActive ? 'scale-110 opacity-75' : ''}`}
            src={`${process.env.REACT_APP_API}${picture_1}`}
            alt={name_th}
          />
        </div>
      </div>

      <div className={`px-5 py-5 ${itemType === "type2" ? "md:w-[70%] md:my-[auto]" : ""}`}>
        <div className="">
          <p className="text-[24px] text-[#E5B22C] truncate">{currentLang === 'th' ? name_th : name_en}</p>
          {/* Sliding effect only for type1 */}
          <div
            className="w-full flex items-center transition-all duration-500 overflow-hidden"
            style={{
              transition: 'max-height 0.5s ease-out',
            }}
          >
            <p
              className={`text-[14px] text-[#E5B22C] line-clamp-2 ${itemType === "type2" ? "w-[100%]" : ""
                }`}
            >
              {currentLang === 'th' ? description_th : description_en}
            </p>
          </div>
        </div>

        <div className={`${itemType === "type2" ? "items-center" : "py-2"}`}>
          <div className={`flex justify-center items-center  ${itemType === "type2" ? "my-4" : "my-1"}`}>
            <Link to={`/admineditcategory/${ID}`} className="w-[45%]">
              <button className="text-[14px] overflow-hidden truncate bg-[#5E993E] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 w-full">
                {t('admin.p27')}
              </button>
            </Link>
            <button onClick={() => handledelete()} className="ml-[5px] w-[45%] text-[14px] overflow-hidden truncate bg-[#EE0003] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">
              {t('admin.p28')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCategoryCard;



