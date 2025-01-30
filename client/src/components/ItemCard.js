import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTags } from "react-icons/fa";
import { useTranslation } from 'react-i18next'

function ItemCard({ ID, picture_1, name_th, description_th, search_word_th, brand_th,  name_en, description_en, search_word_en, brand_en, itemType }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`shadow-md relative z-0 ${itemType === "type2" ? "md:flex my-2" : ""}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <Link to={`/item/${ID}`} className={`flex ${itemType === "type2" ? "md:w-[30%]" : "h-[60%]"}`}>
        <div className={`bg-black overflow-hidden flex my-[auto] mx-[auto] h-[100%] w-[100%] ${itemType === "type2" ? "" : ""}`}>
          <img
            className={`transition-transform duration-300 transform w-full h-full ${itemType === "type2" ? "" : ""} ${isActive ? 'scale-110 opacity-75' : ''}`}
            src={`${process.env.REACT_APP_API}${picture_1}`}
            alt={name_th}
          />
        </div>
      </Link>

      <div className={`px-5 py-5 ${itemType === "type2" ? "md:w-[70%] md:my-[auto]" : ""}`}>
        <div className="pb-[50px]">
          <p className="text-[24px] text-[#E5B22C] truncate">{currentLang === 'th' ? name_th : name_en}</p>
          <p className="text-[14px] uppercase  pb-[15px] ">{currentLang === 'th' ? brand_th : brand_en}</p>

          {/* Sliding effect only for type1 */}
          <div
            className={`w-full flex items-center transition-all duration-500 overflow-hidden ${itemType === "type1"
                ? isActive
                  ? "max-h-[200px]"  // adjust max-height for sliding text
                  : "max-h-0"
                : "max-h-[1000px]" // for type2, the description stays visible
              }`}
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

        <div className={`${itemType === "type2" ? "items-center" : "absolute bottom-[10px] left-0 right-0 px-4"}`}>
          <div className={`${itemType === "type2" ? "" : "flex justify-between items-center"}`}>
            <Link
              to={`/catalog/keyword/${search_word_th}`}
              className={`text-[#E5B22C] py-[2px] inline-flex items-center overflow-hidden ${itemType === "type2" ? "w-[100%] my-2" : ""}`}
            >
              <FaTags className="mr-1 w-[24px]"/> {/* Ensuring consistent size with inline style */}
              <span className="text-[14px] truncate mr-1">{currentLang === 'th' ? search_word_th: search_word_en}</span>
            </Link>
            <Link to={`/item/${ID}`}>
              <button className="text-[14px] overflow-hidden truncate bg-[#E2B22C] border text-white py-1 px-4 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">
                {t('itemcard.p1')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;



