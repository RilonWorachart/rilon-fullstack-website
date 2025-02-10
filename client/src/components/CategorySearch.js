import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function CategorySearch() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [brandData, setBrandData] = useState([]);
  const [searchwordData, setSearchwordData] = useState([]);

  const fetchAllBrandData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/getallbrand`);
      const result = response.data;
      setBrandData(result.data);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };


  const fetchAllSearchwordData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/getallsearchword`);
      const result = response.data;
      setSearchwordData(result.data);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    fetchAllBrandData()
    fetchAllSearchwordData()
  }, [brandData, searchwordData])


  return (
    <div className="py-[50px]">
      <div className="px-[10%] 4xl:px-[20%]">
        <div>
          <h1 className="text-[30px] text-center">
            {t('search.p1')}
          </h1>
          <div className="text-[#E2B22C] h-[4px] w-[60px] text-center mx-[auto] bg-[#0079A9]" />
        </div>
        <div className="flex flex-wrap justify-center items-center mx-[auto] py-10" >
          {searchwordData.map((result) => (
            <Link to={`/catalog/keyword/${result.name_th}`} key={result.id}>
              <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition duration-300 inline-block">
                {currentLang === 'th' ? result.name_th : result.name_en}
              </button>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-[10%]">
        <div>
          <h1 className="text-[30px] text-center">
            {t('search.p16')}
          </h1>
          <div className="text-[#E2B22C] h-[3px] w-[60px] text-center mx-[auto] bg-[#0079A9]" />
        </div>
        <div className="flex flex-wrap justify-center items-center mx-[auto] py-10" >
          {brandData.map((result) => (
            <Link to={`/catalog/keyword/${result.name_th}`} key={result.id}>
              <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition duration-300 inline-block">
                {currentLang === 'th' ? result.name_th : result.name_en}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategorySearch