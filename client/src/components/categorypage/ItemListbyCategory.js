import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ItemCard from '../ItemCard'
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

function ItemListbyCategory() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const { id } = useParams();
  const [productData, setProductData] = useState([])


  const fetchAllProductByCategory = async () => {
    try {
      // Use Axios to send the GET request
      const response = await axios.get(`${process.env.REACT_APP_API}/getproductbycategory/?category_id=${id}`);
      const result = response.data;
      setProductData(result.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchAllProductByCategory()
  }, [t]); // Empty dependency array means this runs once when the component mounts


  const [itemType, setItemType] = useState("type1")
  const [brand, setBrand] = useState('');


  return (
    <>
      <div className="mx-[20px] ">
        <h1 className="text-[30px]">
          {t('categorypage.p5')}
        </h1>
        <div className="text-[#E2B22C] h-[3px] w-[60px] bg-[#E2B22C]" />
      </div>
      <div className="mx-[20px] my-[20px] text-[#E2B22C] flex justify-between items-center">
        <div className="md:flex" >
          <button onClick={() => setBrand('')} className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 ${brand === "" ? 'bg-white text-[#42189F] border border-[#42189F]' : 'bg-[#E2B22C] border text-white'}`}>{currentLang === 'th' ? 'ทั้งหมด' : 'ALL'}</button>
          <button onClick={() => setBrand('ไรล่อน')} className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300  ${brand === "ไรล่อน" ? 'bg-white text-[#42189F] border border-[#42189F]' : 'bg-[#E2B22C] border text-white'}`}>{currentLang === 'th' ? 'ไรล่อน' : 'RILON'}</button>
          <button onClick={() => setBrand('JW INVERTER')} className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 ${brand === "JW INVERTER" ? 'bg-white text-[#42189F] border border-[#42189F]' : 'bg-[#E2B22C] border text-white'}`}>JW INVERTER</button>
          <button onClick={() => setBrand('JW JINGWEITIP')} className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 ${brand === "JW JINGWEITIP" ? 'bg-white text-[#42189F] border border-[#42189F]' : 'bg-[#E2B22C] border text-white'}`}>JW JINGWEITIP</button>
        </div>

        <div className="flex text-[30px]">
          <CgMenuGridR className="hover:text-[#00009F] mr-1" onClick={() => setItemType("type1")} />
          <TfiMenuAlt className="hover:text-[#00009F] " onClick={() => setItemType("type2")} />
        </div>
      </div>
      <div className={`mb-[40px] mx-[20px] ${itemType === "type2" ? '' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[20px]'} }`}>
        {productData.filter((item) => {
          if (brand === "") {
            return item;
          } else if (item.brand_th === brand) {
            return item;
          }
        }).map((item) => {
          return (
            <ItemCard key={item.ID} picture_1={item.picture_1} picture_2={item.picture_2} ID={item.ID} name_th={item.name_th}
              description_th={item.description_th} search_word_th={item.search_word_th} brand_th={item.brand_th}
              name_en={item.name_en} description_en={item.description_en} search_word_en={item.search_word_en} brand_en={item.brand_en}
              itemType={itemType}
            />
          )
        })}
      </div>
    </>
  )
}

export default ItemListbyCategory