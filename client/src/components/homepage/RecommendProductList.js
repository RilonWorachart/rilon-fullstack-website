import { useState, useEffect } from 'react';
import axios from 'axios';
import RecommendProductCard from './RecommendProductCard';
import { FaAngleLeft, FaAnglesLeft, FaAngleRight, FaAnglesRight } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function RecommendProductList() {
  const [recommendProductData, setRecommendProductData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  const fetchRecommendProduct = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/getallrecommendproduct`);
      const result = response.data;
      setRecommendProductData(result.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Automatically move to the next slide every 3 seconds
  useEffect(() => {
    fetchRecommendProduct();
  }, []); // Run only once on component mount to fetch data

  useEffect(() => {
    if (recommendProductData.length === 0) return; // Don't start the interval until we have data

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === recommendProductData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    // Cleanup on component unmount or when data changes
    return () => clearInterval(intervalId);
  }, [recommendProductData]); // Depend on recommendProductData to reinitialize interval after fetch

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
    <div className="py-[50px] bg-[#EFEFEF]">
      <div>
        <h1 className="pt-2 text-[30px] text-center">
          {t('homepage.p27')}
        </h1>
        <div className="text-[#E2B22C] h-[4px] w-[60px] text-center mx-auto bg-[#0079A9]" />
      </div>
      <div className="py-10 relative w-full max-w-4xl mx-auto">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {recommendProductData.map((item) => (
              <Link to={`/catalog/keyword/${item.name}`} key={item.id} className="w-full flex-shrink-0">
                <RecommendProductCard
                  image={item.image}
                  id={item.id}
                  name={item.name}
                />
              </Link>
            ))}
          </div>

          <div className="mt-[30px] mx-[10%] 2xl:mx-[20%] flex justify-center items-center pb-5">
            <button
              className={`px-4 py-4 rounded-full mr-[10px] ${currentIndex !== 0 ? "bg-[#E2B22C] border border-[#E2B22C] text-white hover:text-[#0079A9] hover:bg-white hover:border-[#0079A9]" : "border border-[#E0E0E0] text-[#E0E0E0]"}`}
              onClick={() => setCurrentIndex(0)}
              disabled={currentIndex === 0}
            >
              <FaAnglesLeft />
            </button>
            <button
              className={`px-4 py-4 rounded-full mr-[20px] ${currentIndex !== 0 ? "bg-[#E2B22C] border border-[#E2B22C] text-white hover:text-[#0079A9] hover:bg-white hover:border-[#0079A9]" : "border border-[#E0E0E0] text-[#E0E0E0]"}`}
              onClick={goToPreviousSlide}
              disabled={currentIndex === 0}
            >
              <FaAngleLeft />
            </button>

            <div className="text-[20px]">
              <p><span className="font-light text-[#959595]">{currentIndex + 1} / {recommendProductData.length}</span></p>
            </div>

            <button
              className={`px-4 py-4 rounded-full ml-[20px] ${currentIndex !== recommendProductData.length - 1 && (recommendProductData.length - 1 !== 0) ? "bg-[#E2B22C] border border-[#E2B22C] text-white hover:text-[#0079A9] hover:bg-white hover:border-[#0079A9]" : "border border-[#E0E0E0] text-[#E0E0E0]"}`}
              onClick={goToNextSlide}
              disabled={currentIndex === recommendProductData.length - 1}
            >
              <FaAngleRight />
            </button>
            <button
              className={`px-4 py-4 rounded-full ml-[10px] ${currentIndex !== recommendProductData.length - 1 && (recommendProductData.length - 1 !== 0) ? "bg-[#E2B22C] border border-[#E2B22C] text-white hover:text-[#0079A9] hover:bg-white hover:border-[#0079A9]" : "border border-[#E0E0E0] text-[#E0E0E0]"}`}
              onClick={() => setCurrentIndex(recommendProductData.length - 1)}
              disabled={currentIndex === recommendProductData.length - 1}
            >
              <FaAnglesRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendProductList;
