import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CategoryCard from './CategoryCard.js';
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import SearchKeyButton from '../SearchKeyButton.js';

function CategoryList() {
  const [categoryData, setCategoryData] = useState([]);
  const [itemType, setItemType] = useState("type1");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [inView, setInView] = useState(false);
  const [isFlexColumn, setIsFlexColumn] = useState(window.innerWidth < 760);  // Set initial state based on window width
  const divRef = useRef(null);

  // Fetching category data
  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/getallcategory`);
        const result = response.data;
        setCategoryData(result.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
    fetchAllCategory();
  }, []); // Only fetch once on component mount

  // Handle window resize to update isFlexColumn state dynamically
  useEffect(() => {
    const handleResize = () => {
      setIsFlexColumn(window.innerWidth < 760); // Update state on resize
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the resize event listener is only set once

  // Intersection Observer
  useEffect(() => {
    const currentDivRef = divRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false); // Optional: reset state when leaving the viewport
        }
      });
    }, { threshold: 0.1 });

    if (currentDivRef) {
      observer.observe(currentDivRef);
    }

    return () => {
      if (currentDivRef) {
        observer.unobserve(currentDivRef);
      }
    };
  }, []);

  // Scroll position handler
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollEffect = inView ? Math.min(scrollPosition / 3, 100) : 0;

  return (
    <div ref={divRef} className="bg-[#ECF4F7] py-[50px] overflow-hidden">
      <div className="flex justify-end mx-[10%] 2xl:mx-[auto] max-w-[1300px]">
        <SearchKeyButton />
      </div>
      <div className="my-[20px] mx-[10%] 2xl:mx-[auto] max-w-[1300px] text-[#0079A9] text-[30px] flex justify-end items-center transition-transform">
        <CgMenuGridR className="hover:text-[#E2B22C] mr-1 cursor-pointer" onClick={() => setItemType("type1")} />
        <TfiMenuAlt className="hover:text-[#E2B22C] cursor-pointer" onClick={() => setItemType("type2")} />
      </div>
      <div className={`mb-[40px] mx-[10%] 2xl:mx-[auto] max-w-[1300px] transition-transform duration-500 ease-in-out ${itemType === "type2" ? '' : 'grid grid-cols-1 category1:grid-cols-2 category2:grid-cols-3 2xl:grid-cols-4 gap-[20px]'}`}
        style={{
          // Avoid scroll effect transformation for small screens
          transform: `${isFlexColumn ? '' : `translateY(${100 - scrollEffect}%)`}`
        }}>
        {categoryData.map((item) => (
          <div key={item.ID} className="mx-[auto]">
            <CategoryCard
              picture_1={item.picture_1}
              ID={item.ID}
              name_th={item.name_th}
              description_th={item.description_th}
              name_en={item.name_en}
              description_en={item.description_en}
              itemType={itemType}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
