import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTags } from "react-icons/fa";
import { useTranslation } from 'react-i18next'

function ItemCard({ id, image, name, description, searchword, brand, itemType }) {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`shadow-md relative z-0 ${itemType === "type2" ? "flex my-2" : ""}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <Link to={`/catalog/item/${id}`}>
        <div className="bg-black overflow-hidden justify-center">
          <img
            className={`h-[100%] w-[100%] transition-transform duration-300 transform ${itemType === "type2" ? "" : ""
              } ${isActive ? 'scale-110 opacity-75' : ''}`}
            src={`/images/products/${image}`}
            alt={name}
          />
        </div>
      </Link>

      <div className={`px-5 py-5 ${itemType === "type2" ? "w-[70%]" : ""}`}>
        <div className="pb-[50px]">
          <p className="text-[28px] text-[#E5B22C] truncate">{name}</p>
          <p className="text-[18px] py-2 truncate">{brand}</p>

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
              {description}
            </p>
          </div>
        </div>

        <div className={`${itemType === "type2" ? "items-center" : "absolute bottom-[10px] left-0 right-0 px-4"}`}>
          <div className={`${itemType === "type2" ? "" : "flex justify-between items-center"}`}>
            <Link
              to={`/catalog/item/${id}`}
              className={`text-[#E5B22C] py-[2px] inline-flex items-center overflow-hidden ${itemType === "type2" ? "w-[100%] my-2" : ""}`}
            >
              <FaTags className="mr-1 w-[24px]"/> {/* Ensuring consistent size with inline style */}
              <span className="text-[14px] truncate mr-1">{searchword}</span>
            </Link>
            <Link to={`/catalog/item/${id}`}>
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



