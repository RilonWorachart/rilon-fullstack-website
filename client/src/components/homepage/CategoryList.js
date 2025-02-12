import React, { useState, useEffect, useRef  } from 'react'
import axios from 'axios';
import CategoryCard from './CategoryCard.js';
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import { useTranslation } from 'react-i18next';
import SearchKeyButton from '../SearchKeyButton.js';

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

  const [scrollPosition, setScrollPosition] = useState(0);
  const [inView, setInView] = useState(false); // To track if the div is in the viewport
  const divRef = useRef(null); // Reference to the div


  useEffect(() => {
    // Store the ref value in a variable before observing it
    const currentDivRef = divRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true); // Set inView to true when the component is in the viewport
          }
        });
      },
      { threshold: 0.2 } // Trigger when 50% of the element is visible
    );

    if (currentDivRef) {
      observer.observe(currentDivRef); // Observe the target div
    }

    return () => {
      // Use the variable to ensure it's accessed correctly during cleanup
      if (currentDivRef) {
        observer.unobserve(currentDivRef); // Clean up observer on unmount
      }
    };
  }, []); // Empty dependency array to set up observer once

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY); // Update the scroll position
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up event listener on unmount
    };
  }, []);

  const scrollEffect = inView ? Math.min(scrollPosition / 3, 100) : 0;

  return (
    <div ref={divRef} className="bg-[#ECF4F7] py-[50px] overflow-hidden">
      <div className="flex justify-end">
        <SearchKeyButton />
      </div>
      <div className="mx-[10%] my-[20px] 2xl:mx-[20%] text-[#0079A9] text-[30px] flex justify-end items-center">
        <CgMenuGridR className="hover:text-[#E2B22C] mr-1 cursor-pointer" onClick={() => setItemType("type1")} />
        <TfiMenuAlt className="hover:text-[#E2B22C] cursor-pointer" onClick={() => setItemType("type2")} />
      </div>
      <div className={`mb-[40px] mx-[10%] 2xl:mx-[20%] transition-transform duration-500 ease-in-out ${itemType === "type2" ? '' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 4xl:grid-cols-4 gap-[20px]'} }`}
        style={{
          transform: `translateY(${100 - scrollEffect}%)`
        }}>
        {categoryData.map((item) => {
          return (
            <CategoryCard key={item.ID} picture_1={item.picture_1} ID={item.ID} name_th={item.name_th} description_th={item.description_th} name_en={item.name_en} description_en={item.description_en} itemType={itemType} />
          )
        })}
      </div>
    </div>
  )
}

export default CategoryList