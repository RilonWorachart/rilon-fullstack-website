import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import { FaTags } from "react-icons/fa";
import { useTranslation } from 'react-i18next'
import axios from 'axios';
import Swal from 'sweetalert2';

function AdminItemCard({ ID, picture_1, name_th, description_th, search_word_th, brand_th, name_en, description_en, searchword_en, brand_en, itemType }) {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
          // If the error is a 401 (Unauthorized), show a message to the user
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
  }

  return (
    <div
      className={`shadow-md relative z-0 ${itemType === "type2" ? "flex my-2" : ""}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div className="bg-black overflow-hidden justify-center">
        <img
          className={`h-[100%] w-[100%] transition-transform duration-300 transform ${itemType === "type2" ? "" : ""
            } ${isActive ? 'scale-110 opacity-75' : ''}`}
          src={`${process.env.REACT_APP_API}/uploads/${picture_1}`}
          alt={name_th}
        />
      </div>

      <div className={`px-5 py-5 ${itemType === "type2" ? "w-[70%]" : ""}`}>
        <div className="pb-[50px]">
          <p className="text-[28px] text-[#E5B22C] truncate">{name_th}</p>
          <p className="text-[18px] py-2 truncate">{brand_th}</p>
          <p className={`text-[14px] text-[#E5B22C] line-clamp-2 ${itemType === "type2" ? "w-[100%]" : ""}`}>{description_th}</p>
        </div>

        <div className={`${itemType === "type2" ? "items-center" : ""}`}>
          <div className={`${itemType === "type2" ? "" : ""}`}>

            <div className={`text-[#E5B22C] py-[2px] flex items-center overflow-hidden mb-2 ${itemType === "type2" ? "w-[100%] my-2" : ""}`}>
              <FaTags className="mr-1 w-[24px]" /> {/* Ensuring consistent size with inline style */}
              <span className="text-[14px] truncate mr-1">{search_word_th}</span>
            </div>

            <div className="flex justify-center">
              <Link to={`/adminedit/${ID}`} className="w-[45%]">
                <button className="text-[14px] overflow-hidden truncate bg-[#5E993E] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 w-[100%]">
                  เเก้ไข
                </button>
              </Link>
              <button onClick={() => handledelete()} className="ml-[2%] text-[14px] overflow-hidden truncate bg-[#EE0003] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 w-[45%] ">
                ลบ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminItemCard;



