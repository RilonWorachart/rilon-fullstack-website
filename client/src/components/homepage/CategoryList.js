import React, { useState, useEffect } from 'react'
import axios from 'axios';
import CategoryCard from './CategoryCard.js';
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import { useTranslation } from 'react-i18next';

function CategoryList() {
  const { t } = useTranslation();

  const [categoryData, setCategoryData] = useState([])


  const fetchAllCategory = async () => {
    try {
      // Use Axios to send the GET request
      const response = await axios.get(`${process.env.REACT_APP_API}/getallcategory`, {
      });
  
      const result = response.data;
      setCategoryData(result.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


  useEffect(() => {
    fetchAllCategory()
  }, [t]); // Empty dependency array means this runs once when the component mounts


  const [itemType, setItemType] = useState("type1")


  return (
    <>
      <div className="mx-[10%] 2xl:mx-[20%] my-[20px] text-[#E2B22C] text-[30px] flex justify-end items-center">
        <CgMenuGridR className="hover:text-[#00009F] mr-1" onClick={() => setItemType("type1")}/>
        <TfiMenuAlt className="hover:text-[#00009F] " onClick={() => setItemType("type2")}/>
      </div>
      <div className={`mb-[40px] mx-[10%] 2xl:mx-[20%]  ${itemType === "type2" ? '' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-[20px]'} }`}>
        {categoryData.map((item) => {
          return (
            <CategoryCard key={item.ID} picture_1={item.picture_1} ID={item.ID} name_th={item.name_th} description_th={item.description_th} name_en={item.name_en} description_en={item.description_en} itemType={itemType}/>
          )
        })}
      </div>
    </>
  )
}

export default CategoryList