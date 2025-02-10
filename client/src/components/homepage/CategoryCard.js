import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

function CategoryCard({ ID, picture_1, name_th, description_th, name_en, description_en, itemType }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // console.log(`${process.env.REACT_APP_API}/uploads/${picture_1}`)
  })


  return (
    <div
      className={`shadow-md z-0 bg-white ${itemType === "type2" ? "my-2 sm:flex sm:h-[275px] h-[470px]" : "flex flex-col h-[470px]"}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <Link to={`/category/${ID}`} className={`flex ${itemType === "type2" ? "sm:w-[375px] h-[65%] sm:h-[100%]" : "h-[65%] sm:h-[55%]"}`}>
        <div className={`bg-black overflow-hidden flex justify-center my-[auto] mx-[auto] h-[100%] w-[100%] ${itemType === "type2" ? "" : ""}`}>
          <img
            className={`transition-transform duration-300 transform overflow-hidden w-full h-full ${itemType === "type2" ? "" : ""} ${isActive ? 'scale-110 opacity-75' : ''}`}
            src={`${process.env.REACT_APP_API}${picture_1}`}
            alt={name_th}
          />
        </div>
      </Link>

      <div className={`px-5 py-5 ${itemType === "type2" ? "sm:w-[70%] sm:my-[auto] " : "my-[auto]"}`}>
        <div className="">
          <p className="text-[24px] text-[#0079A9] truncate">{currentLang === 'th' ? name_th : name_en}</p>
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

        <div className={`py-2 ${itemType === "type2" ? "items-center" : ""}`}>
          <div className={`${itemType === "type2" ? "" : "flex justify-between items-center"}`}>
            <Link to={`/category/${ID}`}>
              <button className="text-[14px] overflow-hidden truncate bg-[#E2B22C] border text-white py-1 px-4 rounded-full hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition duration-300">
                {t('homepage.p28')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;



