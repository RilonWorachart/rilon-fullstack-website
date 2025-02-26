import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemCard from '../ItemCard';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

function RelateItem() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [productData, setProductData] = useState(null);
  const [allCategoryProductData, setAllCategoryProductData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());

  // Fetch product data by ID
  const fetchProductById = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/getproductbyid?id=${id}`);
      const result = response.data;
      if (result && result.data) {
        setProductData(result.data);
      } else {
        console.error("Invalid product data:", result);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // Fetch related products by category
  const fetchAllProductByCategory = async (categoryId) => {
    if (!categoryId) return; // Guard clause
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/getproductbycategory/?category_id=${categoryId}`);
      const result = response.data;
      setAllCategoryProductData(result.data || []);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  // Load product data and fetch related products when product data is available
  useEffect(() => {
    fetchProductById();
  }, [id, t]);

  // Fetch related products once product data is available
  useEffect(() => {
    if (productData && productData.category_id) {
      fetchAllProductByCategory(productData.category_id);
    }
  }, [productData]);

  // Memoized nextSlide function
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => {
      if (prevSlide < allCategoryProductData.length - 1) {
        return prevSlide + 1;
      } else {
        return 0; // Loop back to the first slide
      }
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => {
      if (prevSlide > 0) {
        return prevSlide - 1;
      } else {
        return allCategoryProductData.length - 1; // Loop back to the last slide
      }
    });
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval);
  }, [nextSlide]);

  // Function to calculate slides per view based on screen width
  function getSlidesPerView() {
    if (window.innerWidth >= 2100) return 4;
    if (window.innerWidth >= 1800) return 3;
    if (window.innerWidth >= 1600) return 4;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  // Handle window resize event
  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!productData || !allCategoryProductData.length) {
    // Only return loading here, after hooks have been called.
    return (
      <div className="flex justify-center items-center ">
          <ClipLoader color="#3498db" loading={true} size={50} />
      </div>
  );;
  }

  return (
    <div className="px-[10%] pb-[50px] 4xl:px-[20%] transform transition-all bg-[#0079A9]">
      <div className="">
        <h1 className="pt-2 text-[30px] text-center text-white">{t('itempage.p11')}</h1>
        <div className="text-[#E2B22C] h-[4px] w-[60px] text-center mx-auto bg-[#E2B22C]" />
      </div>

      <div className="my-10 relative w-full mx-auto z-10 overflow-hidden">
        {/* Carousel Container */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentSlide * 100) / slidesPerView}%)`,
          }}
        >
          {allCategoryProductData.map((item) => (
            <div
              key={item.ID}
              className="flex-none w-full sm:w-1/2 xl:w-1/3 3xl:w-1/4 4xl:w-1/3 5xl:w-1/4 p-4 px-[auto]"
              style={{ flexBasis: `${100 / slidesPerView}%` }}
            >
                <ItemCard
                  picture_1={item.picture_1}
                  ID={item.ID}
                  name_th={item.name_th}
                  category_id={item.category_id}
                  description_th={item.description_th}
                  name_en={item.name_en}
                  description_en={item.description_en}
                  itemType={'type1'}
                  searchword_id = {item.searchword_id}
                  brand_id = {item.brand_id}
                />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="z-40 flex justify-center w-full pt-[20px]">
          <button
            onClick={prevSlide}
            className="w-10 h-10 flex items-center justify-center mx-1 bg-[#E2B22C] text-white rounded-full hover:bg-[#F0D895]"
          >
            &#8592;
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 flex items-center justify-center mx-1 bg-[#E2B22C] text-white rounded-full hover:bg-[#F0D895]"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}

export default RelateItem;

