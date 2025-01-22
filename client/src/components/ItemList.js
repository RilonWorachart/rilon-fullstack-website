import React, { useState, useEffect } from 'react'
import ItemCard from './ItemCard'
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

function AllProduct() {
  const { t } = useTranslation();

  const [productData, setProductData] = useState([])

  useEffect(() => {
    fetch(`/locales/${i18next.language}/products.json`)
      .then((response) => response.json())
      .then((result) => {
        // Convert the object into an array of products
        const productsArray = Object.values(result);
        setProductData(productsArray);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [t]); // Empty dependency array means this runs once when the component mounts


  const [itemType, setItemType] = useState("type1")


  return (
    <>
      <div className="mx-[80px] my-[20px] text-[#E2B22C] text-[30px] flex justify-end items-center">
        <CgMenuGridR className="hover:text-[#00009F] mr-1" onClick={() => setItemType("type1")}/>
        <TfiMenuAlt className="hover:text-[#00009F] " onClick={() => setItemType("type2")}/>
      </div>
      <div className={`mb-[40px] mx-[80px] ${itemType === "type2" ? '' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-[20px]'} }`}>
        {productData.map((item) => {
          return (
            <ItemCard key={item.id} image={item.image} id={item.id} name={item.name} category={item.category}
              description={item.description} searchword={item.searchword} brand={item.brand}
              itemType={itemType}
            />
          )
        })}
      </div>
    </>
  )
}

export default AllProduct