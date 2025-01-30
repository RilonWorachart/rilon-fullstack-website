import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import AdminItemCard from '../components/adminitempage/AdminItemCard';
import { Link } from 'react-router-dom';
import { CgMenuGridR } from "react-icons/cg";
import { TfiMenuAlt } from "react-icons/tfi";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Swal from 'sweetalert2';

function AdminItemPage() {
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]); // Initialize as empty array
  const [itemType, setItemType] = useState("type1");
  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .post(
          `${process.env.REACT_APP_API}/authen`,
          {}, // Empty body, since it's a POST request with only Authorization header
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          if (response.data.status === "ok") {
            // If token is valid, do nothing or perform any necessary actions
            fetchAllProduct();
            fetchAllCategoryData();
          } else {
            localStorage.removeItem("token");
            window.location = "/adminlogin"; // Redirect to login if token is invalid
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Optional: handle error (e.g., show error message)
          localStorage.removeItem("token");
          window.location = "/adminlogin"; // Redirect to login if error occurs
          Swal.fire({
            title: 'Oops!',
            text: 'Please login again.',
            icon: 'error',   // Error icon
            confirmButtonText: 'Okay'
          });
        });
    } else {
      window.location = "/adminlogin"; // Redirect to login if no token
    }
  }, [t]);

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

  const fetchAllCategoryData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/getallcategory`);
      const result = response.data;
      setCategoryData(result.data); // Set category data as an array
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    Swal.fire({
      title: 'Success!',
      text: 'Logout successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    setTimeout(() => {
      window.location = "/adminlogin"; // Redirect to the admin item page after successful login
    }, 1000);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');

  if (categoryData.length === 0) {
    return <div>Loading...</div>; // Show loading state until category data is ready
  }

  return (
    <>
      <div className="min-h-screen font-plex-sans-thai">
        <div className="mt-[70px] bg-[#E2B22C] text-white px-3 xl:px-24 py-3 flex justify-between">
          <p className="py-1">
            <Link to="/">
              <span className="hover:text-[#00007E]">{t('categorypage.p1')}</span>
            </Link>
            <span> » </span>
            <Link to="/adminpanel"><span className="">Admin Panel</span></Link>
            <span> » </span>
            <span className="">Item</span>
          </p>
          <div className="flex">
            <Link to="/admincreate">
              <button className="text-[14px] overflow-hidden truncate bg-[#5E993E] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 w-[100px]">
                Create
              </button>
            </Link>
            <button onClick={handleLogout} className="text-[14px] overflow-hidden truncate bg-[#EE0003] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 w-[100px] ml-[10px]">
              Log out
            </button>
          </div>
        </div>

        <div className="flex justify-end mx-[10%] 2xl:mx-[20%]">
          <div className="flex items-center border-[1px] border-lightgray py-1 px-3 mt-[30px] rounded-full text-[#6C757D]">
            <input
              type="text"
              placeholder={t('categorypage.p4')}
              className="flex-grow p-1 border-none outline-none rounded-l-full"
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="mx-[10%] 2xl:mx-[20%]">
            <div>
              <h1 className="pt-2 text-[30px] text-center">
                Category
              </h1>
              <div className="text-[#E2B22C] h-[3px] w-[60px] text-center mx-[auto] bg-[#E2B22C]" />
            </div>
            <div className="flex flex-wrap justify-center items-center mx-[auto] py-10">
              <button
                onClick={() => setCategory('')}
                className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 ${category === '' ? 'bg-white text-[#42189F] border border-[#42189F]' : 'bg-[#E2B22C] border text-white'}`}
              >
                ALL
              </button>
              {categoryData.map((categoryItem) => (
                <button
                  key={categoryItem.ID}
                  onClick={() => setCategory(categoryItem.ID)}
                  className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 ${category === categoryItem.ID ? 'bg-white text-[#42189F] border border-[#42189F]' : 'bg-[#E2B22C] border text-white'}`}
                >
                  {categoryItem.name_th}
                </button>
              ))}
            </div>
          </div>

          <div className="mx-[10%] 2xl:mx-[20%]">
            <div>
              <h1 className="pt-2 text-[30px] text-center">
                {t('search.p16')}
              </h1>
              <div className="text-[#E2B22C] h-[3px] w-[60px] text-center mx-[auto] bg-[#E2B22C]" />
            </div>
            <div className="flex flex-wrap justify-center items-center mx-[auto] py-10">
              <button onClick={() => setBrand('')} className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 ${brand === "" ? 'bg-white text-[#42189F] border border-[#42189F]' : 'bg-[#E2B22C] border text-white'}`}>ALL</button>
              <button onClick={() => setBrand('ไรล่อน')} className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 ${brand === "rilon" ? 'bg-white text-[#42189F] border border-[#42189F]' : 'bg-[#E2B22C] border text-white'}`}>RILON</button>
              <button onClick={() => setBrand('JW')} className={`py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 ${brand === "jw" ? 'bg-white text-[#42189F] border border-[#42189F]' : 'bg-[#E2B22C] border text-white'}`}>JW</button>
              <button onClick={() => setBrand('JINGWEITIP')} className={` py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 ${brand === "jingweitip" ? 'bg-white text-[#42189F] border border-[#42189F]' : 'bg-[#E2B22C] border text-white'}`}>JINGWEITIP</button>
            </div>
          </div>
        </div>

        <div className="mx-[10%] 2xl:mx-[20%] my-[20px] text-[#E2B22C] text-[30px] flex justify-end items-center">
          <CgMenuGridR className="hover:text-[#00009F] mr-1" onClick={() => setItemType("type1")} />
          <TfiMenuAlt className="hover:text-[#00009F] " onClick={() => setItemType("type2")} />
        </div>

        <div className={`mb-[40px] mx-[10%] 2xl:mx-[20%]  ${itemType === "type2" ? '' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-[20px]'}`}>
          {productData.filter((item) => {
            if (searchTerm === "") {
              return item;
            } else if (item.name_th.includes(searchTerm)) {
              return item;
            }
          })
            .filter((item) => {
              if (category === "") {
                return item;
              } else if (item.category_id === category) {
                return item;
              }
            })
            .filter((item) => {
              if (brand === "") {
                return item;
              } else if (item.brand_th === brand) {
                return item;
              }
            })
            .map((item) => (
              <AdminItemCard key={item.ID} item={item} category_id={item.category_id} ID={item.ID} picture_1={item.picture_1} picture_2={item.picture_2} name_th={item.name_th} description_th={item.description_th} search_word_th={item.search_word_th} brand_th={item.brand_th} name_en={item.name_en} description_en={item.description_en} searchword_en={item.searchword_en} brand_en={item.brand_en} itemType={itemType} />
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminItemPage;
