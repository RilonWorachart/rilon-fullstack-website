import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

function CategoryCard({ ID, picture_1, name_th, description_th, name_en, description_en, itemType }) {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // console.log(`${process.env.REACT_APP_API}/uploads/${picture_1}`)
  })


  return (
    <div
      className={`shadow-md relative z-0 ${itemType === "type2" ? "flex my-2" : ""}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <Link to={`/category/${ID}`}>
        <div className="bg-black overflow-hidden justify-center">
          <img
            className={`h-[100%] w-[100%] transition-transform duration-300 transform ${itemType === "type2" ? "" : ""} ${isActive ? 'scale-110 opacity-75' : ''}`}
            src={`${process.env.REACT_APP_API}${picture_1}`}
            alt={name_th}
          />
        </div>
      </Link>

      <div className={`px-5 py-5 ${itemType === "type2" ? "w-[70%]" : ""}`}>
        <div className="pb-[50px]">
          <p className="text-[28px] text-[#E5B22C] truncate">{name_th}</p>
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
              {description_th}
            </p>
          </div>
        </div>

        <div className={`${itemType === "type2" ? "items-center" : "absolute bottom-[10px] left-0 right-0 px-4"}`}>
          <div className={`${itemType === "type2" ? "" : "flex justify-between items-center"}`}>
            <Link to={`/category/${ID}`}>
              <button className="text-[14px] overflow-hidden truncate bg-[#E2B22C] border text-white py-1 px-4 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">
                ดูรายการสินค้าเพิ่มเติม
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;



