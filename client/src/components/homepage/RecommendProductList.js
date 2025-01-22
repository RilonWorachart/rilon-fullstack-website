import { useState, useEffect } from 'react';
import RecommendProductCard from './RecommendProductCard';
import { useTranslation } from 'react-i18next';

function RecommendProductList() {
  const [recommendProductData, setRecommendProductData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    fetch('recommendproduct.json')
      .then((response) => response.json())
      .then((result) => {
        setRecommendProductData(result);
      });
  }, []);

  // Automatically move to the next slide every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === recommendProductData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [recommendProductData]);

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? recommendProductData.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === recommendProductData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="pb-10">
      <div>
        <h1 className="pt-2 text-[30px] text-center">
          {t('homepage.p27')}
        </h1>
        <div className="text-[#E2B22C] h-[3px] w-[60px] text-center mx-auto bg-[#E2B22C]" />
      </div>
      <div className="py-10 relative w-full max-w-4xl mx-auto">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {recommendProductData.map((item) => (
              <div key={item.id} className="w-full flex-shrink-0">
                <RecommendProductCard
                  image={item.image}
                  id={item.id}
                  name={item.name}
                />
              </div>
            ))}
          </div>

          {/* Custom Navigation Buttons */}
          <div className="flex justify-center pt-[20px]">
            <button
              onClick={goToPreviousSlide}
              className="w-10 h-10 flex items-center justify-center mx-1 bg-[#E2E2E2] text-white rounded-full hover:bg-[#F0D895]"
            >
              &#8592;
            </button>
            <button
              onClick={goToNextSlide}
              className="w-10 h-10 flex items-center justify-center mx-1 bg-[#E2E2E2] text-white rounded-full hover:bg-[#F0D895]"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendProductList;
