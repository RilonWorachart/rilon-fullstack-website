import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ItemCard from '../ItemCard';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

function RelateItem() {
  const { id } = useParams();
  const [productData, setProductData] = useState([]);
  const { t } = useTranslation();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());

  useEffect(() => {
    fetch(`/locales/${i18next.language}/products.json`)
      .then((response) => response.json())
      .then((result) => {
        const productsArray = Object.values(result);
        const filteredProducts = productsArray.filter((item) => item.id !== parseInt(id));

        setProductData(filteredProducts);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [id, t]);

  // Memoize nextSlide to avoid unnecessary re-renders
  const nextSlide = useCallback(() => {
    if (currentSlide < productData.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0); // Loop back to the first slide
    }
  }, [currentSlide, productData.length]); // Dependencies are currentSlide and productData.length

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(productData.length - 1); // Loop back to the last slide
    }
  };

  // Handle auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Slide every 3 seconds

    // Cleanup interval on unmount or when currentSlide changes
    return () => clearInterval(interval);
  }, [nextSlide]); // Now the effect only runs when nextSlide changes

  // Function to get the number of slides based on screen size
  function getSlidesPerView() {
    if (window.innerWidth >= 1440) return 4;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  // Update slidesPerView when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView());
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="px-[100px] transform transition-all">
      <div className="">
        <h1 className="pt-2 text-[30px] text-center">{t('itempage.p11')}</h1>
        <div className="text-[#E2B22C] h-[3px] w-[60px] text-center mx-auto bg-[#E2B22C]" />
      </div>

      <div className="my-10 relative w-full mx-auto z-10 overflow-hidden">
        {/* Carousel Container */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentSlide * 100) / slidesPerView}%)`,
          }}
        >
          {productData.map((item) => (
            <div
              key={item.id}
              className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
              style={{ flexBasis: `${100 / slidesPerView}%` }}
            >
              <ItemCard
                image={item.image}
                id={item.id}
                name={item.name}
                category={item.category}
                description={item.description}
                searchword={item.searchword}
                brand={item.brand}
                itemType={'type1'}
                className="max-h-[500px]"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="z-40 flex justify-center w-full pt-[20px]">
          <button
            onClick={prevSlide}
            className="w-10 h-10 flex items-center justify-center mx-1 bg-[#E2E2E2] text-white rounded-full hover:bg-[#F0D895]"
          >
            &#8592;
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 flex items-center justify-center mx-1 bg-[#E2E2E2] text-white rounded-full hover:bg-[#F0D895]"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}

export default RelateItem;



