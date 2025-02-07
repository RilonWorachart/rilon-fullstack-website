import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTags } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function ItemCard({ ID, picture_1, name_th, description_th, name_en, description_en, itemType, searchword_id, brand_id }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [isActive, setIsActive] = useState(false);
  const [brandData, setBrandData] = useState(null);
  const [searchwordData, setSearchwordData] = useState(null);

  const fetchBrandData = async () => {
    if (brand_id) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/getbrandbyid?id=${brand_id}`);
        const result = response.data;
        if (result && result.data && result.data.length > 0) {
          setBrandData(result.data[0]);
        } else {
          console.error("Brand not found");
        }
      } catch (error) {
        console.error("Error fetching brand data:", error);
      }
    } else {
      console.error("brand_id is missing");
    }
  };

  const fetchSearchwordData = async () => {
    if (searchword_id) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/getsearchwordbyid?id=${searchword_id}`);
        const result = response.data;
        if (result && result.data && result.data.length > 0) {
          setSearchwordData(result.data[0]);
        } else {
          console.error("Searchword not found");
        }
      } catch (error) {
        console.error("Error fetching searchword data:", error);
      }
    } else {
      console.error("searchword_id is missing");
    }
  };

  useEffect(() => {
    if (brand_id) {
      fetchBrandData();
    }
    if (searchword_id) {
      fetchSearchwordData();
    }
  }, [brand_id, searchword_id]);

  if (!brandData) {
    return <div>Loading...</div>; // Loading state while fetching brand data
  }

  
  return (
    <div
      className={`shadow-md relative z-0 ${itemType === "type2" ? "sm:flex my-2 sm:h-[275px] h-[470px]" : "h-[470px]"}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <Link to={`/item/${ID}`} className={`flex ${itemType === "type2" ? "sm:w-[375px] h-[55%] sm:h-[100%]" : "h-[55%]"}`}>
        <div className={`bg-[#e3dedd] overflow-hidden flex my-[auto] mx-[auto] h-[100%] w-[100%] ${itemType === "type2" ? "" : ""}`}>
          <img
            className={`transition-transform duration-300 transform w-full h-full ${itemType === "type2" ? "" : ""} ${isActive ? 'scale-110 opacity-75' : ''}`}
            src={`${process.env.REACT_APP_API}${picture_1}`}
            alt={name_th}
          />
        </div>
      </Link>

      <div className={`px-5 py-3 ${itemType === "type2" ? "sm:w-[70%] sm:my-[auto] " : "my-[auto]"}`}>
        <div className="">
          <p className="text-[24px] text-[#E5B22C] truncate">{currentLang === 'th' ? name_th : name_en}</p>
          <p className="text-[14px] uppercase pb-[15px]">
            {currentLang === 'th' ? brandData?.name_th : brandData?.name_en || 'Loading brand...'}
          </p>

          <div
            className={`w-full flex items-center transition-all duration-500 overflow-hidden ${itemType === "type1"
              ? isActive
                ? "max-h-[200px]"
                : "max-h-0"
              : "max-h-[1000px]"} `}
            style={{
              transition: 'max-height 0.5s ease-out',
            }}
          >
            <p className={`text-[14px] text-[#E5B22C] line-clamp-2 ${itemType === "type2" ? "w-[100%]" : ""}`}>
              {currentLang === 'th' ? description_th : description_en || 'No description available'}
            </p>
          </div>
        </div>

        <div className={`${itemType === "type2" ? "items-center" : "absolute bottom-[10px] left-0 right-0 px-4"}`}>
          <div className={`${itemType === "type2" ? "" : "flex justify-between items-center"}`}>
            {searchword_id && (
              <Link
                to={`/catalog/keyword/${searchwordData?.name_th}`}
                className={`text-[#E5B22C] py-[2px] inline-flex items-center overflow-hidden ${itemType === "type2" ? "w-[100%] my-2" : ""}`}
              >
                <FaTags className="mr-1 w-[24px]" />
                <span className="text-[14px] truncate mr-1">
                  {currentLang === 'th' ? searchwordData?.name_th : searchwordData?.name_en || 'Loading searchword...'}
                </span>
              </Link>
            )}
            <div className={`flex ${!searchword_id && itemType === "type1" ? "justify-end w-full" : "my-2"}`}>
              <Link to={`/item/${ID}`}>
                <button className="text-[14px] overflow-hidden truncate bg-[#E2B22C] border text-white py-1 px-4 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">
                  {t('itemcard.p1')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
