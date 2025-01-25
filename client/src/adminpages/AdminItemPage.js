import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import AdminItemCard from '../components/adminitempage/AdminItemCard'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi"
import { useTranslation } from 'react-i18next';
import axios from 'axios';


function AdminItemPage() {
  const [productData, setProductData] = useState([])
  const [itemType, setItemType] = useState("type1")
  const { t } = useTranslation();


  const fetchAllProduct = async () => {
    try {
      // Use Axios to send the GET request
      const response = await axios.get(`${process.env.REACT_APP_API}/getallproduct`);
      const result = response.data;

      setProductData(result.data); // Update state with filtered products
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };


  useEffect(() => {
    fetchAllProduct(); // Fetch products whenever 'key' or language changes
  }, [t]);


  const handleLogout = () => {

  }


  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
  
    const handleSearch = (e) => {
      e.preventDefault();
    }

  
    const linkPath = searchTerm === "" ? "/catalog" : `/catalog/keyword/${searchTerm}`;


  return (
    <>
      <div className="min-h-screen font-plex-sans-thai">
        <div className="mt-[70px] bg-[#E2B22C] text-white px-3 xl:px-24 py-3 flex justify-between">
          <p className="py-1">
            <Link to="/">
              <span className="hover:text-[#00007E]">{t('categorypage.p1')}</span>
            </Link>
            <span> » </span>
            <span className="">Admin</span>
          </p>
          <div className="flex className=">
            <Link to="/admincreate" w>
              <button className="text-[14px] overflow-hidden truncate bg-[#5E993E] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 w-[100px]">
                Create
              </button>
            </Link>
            <button onClick={handleLogout} className="text-[14px] overflow-hidden truncate bg-[#EE0003] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 w-[100px] ml-[10px]">
              Log out
            </button>
          </div>
        </div>


        <div className="flex justify-end">
          <form className="flex items-center border-[1px] border-lightgray py-1 px-3 mx-[80px] mt-[30px] rounded-full text-[#6C757D]" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder={t('categorypage.p4')}
              className="flex-grow p-1 border-none outline-none rounded-l-full"
              onChange={handleInputChange}
              value={searchTerm}
              required
            />
            <Link to={linkPath}>
              <button
                type="submit"
                className="bg-transparent border-none text-[#6C757D]  rounded-r-full"
              >
                <FaSearch />
              </button>
            </Link>
          </form>
        </div>

        <div>
          <div className="px-[100px]">
            <div>
              <h1 className="pt-2 text-[30px] text-center">
                Category
              </h1>
              <div className="text-[#E2B22C] h-[3px] w-[60px] text-center mx-[auto] bg-[#E2B22C]" />
            </div>
            <div className="flex flex-wrap justify-center items-center mx-[auto] py-10" >
                <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 inline-block">{t('search.p2')}</button>
                <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">{t('search.p3')}</button>
                <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">{t('search.p4')}</button>
                <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">{t('search.p5')}</button>
                <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">{t('search.p6')}</button>
                <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">{t('search.p7')}</button>
                <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">{t('search.p8')}</button>
                <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">{t('search.p9')}</button>
                <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">{t('search.p10')}</button>
                <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">{t('search.p11')}</button>
                <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">{t('search.p12')}</button>
                <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">{t('search.p13')}</button>
                <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">{t('search.p14')}</button>
                <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">{t('search.p15')}</button>
            </div>
          </div>

          <div className="px-[100px]">
            <div>
              <h1 className="pt-2 text-[30px] text-center">
                {t('search.p16')}
              </h1>
              <div className="text-[#E2B22C] h-[3px] w-[60px] text-center mx-[auto] bg-[#E2B22C]" />
            </div>
            <div className="flex flex-wrap justify-center items-center mx-[auto] py-10" >
              <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">{t('search.p17')}</button>
              <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">{t('search.p18')}</button>
            </div>
          </div>
        </div>

        <div className="mx-[80px] my-[20px] text-[#E2B22C] text-[30px] flex justify-end items-center">
          <CgMenuGridR className="hover:text-[#00009F] mr-1" onClick={() => setItemType("type1")} />
          <TfiMenuAlt className="hover:text-[#00009F] " onClick={() => setItemType("type2")} />
        </div>

        <div className={`mb-[40px] mx-[80px] ${itemType === "type2" ? '' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-[20px]'} }`}>
          {productData.map((item) => {
            return (
              <AdminItemCard key={item.ID} picture_1={item.picture_1} ID={item.ID} name_th={item.name_th} category_id={item.category_id}
                description_th={item.description_th} search_word_th={item.search_word_th} brand={item.brand_th} name_en={item.name_en} description_en={item.description_en} search_word_en={item.search_word_en} itemType={itemType}
              />
            )
          })}
        </div>

        <Footer />
      </div>
    </>
  )
}

export default AdminItemPage