import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

const AdminCreateItemPage = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState([]);
  const [searchWord, setSearchword] = useState([]);

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
            fetchCategories();
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
        });
    } else {
      window.location = "/adminlogin"; // Redirect to login if no token
    }
  }, []);


  const [formData, setFormData] = useState({
    rilon_id: 'P001',
    picture_1: null,
    picture_2: null,
    name_th: '',
    description_th: '',
    search_word_th: '',
    search_word_en: '',
    brand_th: '',
    brand_en: '',
    other_th: '',
    other_en: '',
    name_en: '',
    description_en: '',
    category_id: '', // For category ID
  });


  // Example to fetch categories
  const fetchCategories = () => {
    const categories = [
      { category_id: 1, name_th: 'เครื่องเชื่อมอาร์กอน', name_en: 'Argon Welding Machine' },
      { category_id: 2, name_th: 'เครื่องเชื่อมไฟฟ้า', name_en: 'Electric Welding Machine' },
      { category_id: 3, name_th: 'เครื่องเชื่อมซีโอทู', name_en: 'CO2 Welding Machine' },
      { category_id: 4, name_th: 'เครื่องเชื่อมเลเซอร์', name_en: 'Laser Welding Machine' },
      { category_id: 5, name_th: 'เครื่องเชื่อมซับเมริก์', name_en: 'Submerged Arc Welding Machine' },
      { category_id: 6, name_th: 'เครื่องตัดพลาสม่า', name_en: 'Plasma Cutting Machine' },
      { category_id: 7, name_th: 'เครื่องตัดตามแบบ', name_en: 'Custom Cutting Machine' },
      { category_id: 8, name_th: 'เครื่องตัดตามราง', name_en: 'Rail Cutting Machine' },
      { category_id: 9, name_th: 'เครื่องป้อนลวดเชื่อม', name_en: 'Welding Wire Feeder' },
      { category_id: 10, name_th: 'เครื่องหมุนชิ้นงานอัตโนมัติ', name_en: 'Automatic Workpiece Rotator' },
      { category_id: 11, name_th: 'อุปกรณ์สายเชื่อมซีโอทู', name_en: 'CO2 Welding Cable Accessories' },
      { category_id: 12, name_th: 'อุปกรณ์สายเชื่อมอาร์กอน', name_en: 'Argon Welding Cable Accessories' },
      { category_id: 13, name_th: 'อุปกรณ์สายเชื่อมไฟฟ้า', name_en: 'Electric Welding Cable Accessories' },
      { category_id: 14, name_th: 'อุปกรณ์สายตัดพลาสม่า', name_en: 'Plasma Cutting Cable Accessories' },
      { category_id: 15, name_th: 'อุปกรณ์อื่นๆ', name_en: 'Other Accessories' }
    ];
    setCategories(categories);
  };


  const fetchBrand = () => {
    const BrandData = [
      { id: 1, th: 'ไรล่อน', en: 'RILON' },
      { id: 2, th: 'JW', en: 'JW' },
      { id: 3, th: 'JINGWEITIP', en: 'JINGWEITIP' },
    ];
    setBrand(BrandData);
  };


  const fetchSearchWord = () => {
    const searchwords = [
      { id: 1, name_th: 'เครื่องเชื่อมอินวอเตอร์ราคาถูก', name_en: 'Cheap Inverter Welding Machine' },
      { id: 2, name_th: 'เครื่องเชื่อมอินวอเตอร์คุณภาพดี', name_en: 'High-Quality Inverter Welding Machine' },
      { id: 3, name_th: 'เครื่องเชื่อมไฟฟ้าราคาถูก', name_en: 'Cheap Electric Welding Machine' },
      { id: 4, name_th: 'เครื่องเชื่อมไฟฟ้าคุณภาพดี', name_en: 'High-Quality Electric Welding Machine' },
      { id: 5, name_th: 'เครื่องเชื่อมทิกราคาถูก', name_en: 'Cheap TIG Welding Machine' },
      { id: 6, name_th: 'เครื่องเชื่อมทิกคุณภาพดี', name_en: 'High-Quality TIG Welding Machine' },
      { id: 7, name_th: 'เครื่องเชื่อมอาร์กอนราคาถูก', name_en: 'Cheap Argon Welding Machine' },
      { id: 8, name_th: 'เครื่องเชื่อมอาร์กอนคุณภาพดี', name_en: 'High-Quality Argon Welding Machine' },
      { id: 9, name_th: 'เครื่องเชื่อมอลูมีเนียมสแตนเลสราคาถูก', name_en: 'Cheap Aluminum Stainless Steel Welding Machine' },
      { id: 10, name_th: 'เครื่องเชื่อมอลูมีเนียมสแตนเลสคุณภาพดี', name_en: 'High-Quality Aluminum Stainless Steel Welding Machine' },
      { id: 11, name_th: 'เครื่องเชื่อมมิกราคาถูก', name_en: 'Cheap MIG Welding Machine' },
      { id: 12, name_th: 'เครื่องเชื่อมมิกคุณภาพดี', name_en: 'High-Quality MIG Welding Machine' },
      { id: 13, name_th: 'เครื่องเชื่อมซีโอทูราคาถูก', name_en: 'Cheap CO2 Welding Machine' },
      { id: 14, name_th: 'เครื่องเชื่อมซีโอทูคุณภาพดี', name_en: 'High-Quality CO2 Welding Machine' },
      { id: 15, name_th: 'เครื่องตัดพลาสม่าราคาถูก', name_en: 'Cheap Plasma Cutting Machine' },
      { id: 16, name_th: 'เครื่องตัดพลาสม่าคุณภาพดี', name_en: 'High-Quality Plasma Cutting Machine' },
      { id: 17, name_th: 'อุปกรณ์งานเชื่อมราคาถูก', name_en: 'Cheap Welding Equipment' },
      { id: 18, name_th: 'อุปกรณ์งานเชื่อมคุณภาพดี', name_en: 'High-Quality Welding Equipment' },
      { id: 19, name_th: 'อะไหล่เครื่องเชื่อมราคาถูก', name_en: 'Cheap Welding Machine Spare Parts' },
      { id: 20, name_th: 'อะไหล่เครื่องเชื่อมคุณภาพดี', name_en: 'High-Quality Welding Machine Spare Parts' },
      { id: 21, name_th: 'สายเชื่อมตู้เชื่อมราคาถูก', name_en: 'Cheap Welding Machine Cables' },
      { id: 22, name_th: 'สายเชื่อมตู้เชื่อมคุณภาพดี', name_en: 'High-Quality Welding Machine Cables' },
      { id: 23, name_th: 'สายเชื่อมอาร์กอนราคาถูก', name_en: 'Cheap Argon Welding Cables' },
      { id: 24, name_th: 'สายเชื่อมอาร์กอนคุณภาพดี', name_en: 'High-Quality Argon Welding Cables' }
    ];
    
    setSearchword(searchwords);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API}/createproduct`, formData)
      .then((response) => {
        console.log(response);
        if (response.data.Status === 'ok') {
          Swal.fire({
            title: 'Success!',
            text: 'Create product successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          setTimeout(() => {
            window.location = "/adminitem"; // Redirect to the admin item page after successful login
          }, 1000);
        } else {
          Swal.fire({
            title: 'Fail!',
            text: 'Create product failed!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      })
      .catch(er => console.log(er))
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    Swal.fire({
      title: 'Success!',
      text: 'Logout successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    })
    setTimeout(() => {
      window.location = "/adminlogin"; // Redirect to the admin item page after successful login
    }, 1000);
  }

  return (
    <div className="min-h-screen font-plex-sans-thai">
      <div className="mt-[70px] bg-[#E2B22C] text-white px-3 xl:px-24 py-3 md:flex md:justify-between md:items-center">
        <p className="py-1">
          {/* Breadcrumbs */}
          <a href="/" className="hover:text-[#00007E]">{t('categorypage.p1')}</a><span> » </span>
          <a href="/adminitem" className="hover:text-[#00007E]">Admin</a> <span> » </span>
          <span>Create Form</span>
        </p>
        <div className="flex className=">
          <Link to="/adminitem" w>
            <button className="text-[14px] overflow-hidden truncate bg-[#5E993E] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 w-[100px]">
              Back
            </button>
          </Link>
          <button onClick={handleLogout} className="text-[14px] overflow-hidden truncate bg-[#EE0003] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 w-[100px] ml-[10px]">
            Log out
          </button>
        </div>
      </div>

      <div className="mx-[10%] max-w-[1400px] 2xl:mx-[auto] pt-4 pb-10">
        <div>
          <h1 className="text-[30px]">Product Information</h1>
          <div className="text-[#E2B22C] h-[3px] w-[60px] bg-[#E2B22C]" />
        </div>

        <form className="py-6" onSubmit={handleSubmit}>
          <div className="md:flex">
            <div className="md:w-[50%] md:pr-[10px]">
              {/* Name Field (Thai) */}
              <div className="pt-4">
                <label htmlFor="name_th" className="font-semibold py-1">Name (Thai)<span className="text-[#DC3545]">*</span></label><br />
                <input
                  type="text"
                  id="name_th"
                  name="name_th"
                  value={formData.name_th}
                  onChange={handleChange}
                  required
                  className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>

              {/* Name Field (English) */}
              <div className="pt-4">
                <label htmlFor="name_en" className="font-semibold py-1">Name (English)<span className="text-[#DC3545]">*</span></label><br />
                <input
                  type="text"
                  id="name_en"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                  className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>

              {/* Description Field (Thai) */}
              <div className="pt-4">
                <label htmlFor="description_th" className="font-semibold py-1">Description (Thai)</label><br />
                <textarea
                  id="description_th"
                  name="description_th"
                  value={formData.description_th}
                  onChange={handleChange}
                  className="border w-[100%] px-3 py-1 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>

              {/* Description Field (English) */}
              <div className="pt-4">
                <label htmlFor="description_en" className="font-semibold py-1">Description (English)</label><br />
                <textarea
                  id="description_en"
                  name="description_en"
                  value={formData.description_en}
                  onChange={handleChange}
                  className="border w-[100%] px-3 py-1 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>

              {/* Category Select */}
              <div className="pt-4">
                <label htmlFor="category_id" className="font-semibold py-1">Category</label><br />
                <select
                  name="category_id"
                  id="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="border w-[100%] py-1 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                >
                  <option value="">Select a category</option>
                  {categories.map((result) => (
                    <option key={result.category_id} value={result.category_id}>
                      {result.name_th} / {result.name_en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="md:w-[50%] md:pl-[10px]">
              {/* Search Word (Thai) */}
              <div className="pt-4">
                <label htmlFor="search_word_th" className="font-semibold py-1">Search Word (Thai)</label><br />
                <input
                  type="text"
                  id="search_word_th"
                  name="search_word_th"
                  value={formData.search_word_th}
                  onChange={handleChange}
                  className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>

              {/* Search Word (English) */}
              <div className="pt-4">
                <label htmlFor="search_word_en" className="font-semibold py-1">Search Word (English)</label><br />
                <input
                  type="text"
                  id="search_word_en"
                  name="search_word_en"
                  value={formData.search_word_en}
                  onChange={handleChange}
                  className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>

              {/* Brand (Thai) */}
              <div className="pt-4">
                <label htmlFor="brand_th" className="font-semibold py-1">Brand (Thai)</label><br />
                <input
                  type="text"
                  id="brand_th"
                  name="brand_th"
                  value={formData.brand_th}
                  onChange={handleChange}
                  className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>

              {/* Brand (English) */}
              <div className="pt-4">
                <label htmlFor="brand_en" className="font-semibold py-1">Brand (English)</label><br />
                <input
                  type="text"
                  id="brand_en"
                  name="brand_en"
                  value={formData.brand_en}
                  onChange={handleChange}
                  className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Link to="/adminitem">
              <div className="flex justify-center pt-5">
                <button type="submit" className="py-1 px-2 mx-2 text-[#EE0003] border border-[#EE0003] hover:text-white hover:bg-[#EE0003] transition duration-300">Back</button>
              </div>
            </Link>
            <div className="flex justify-center pt-5">
              <button type="submit" className="py-1 px-2 mx-2 text-[#28A745] border border-[#28A745] hover:text-white hover:bg-[#28A745] transition duration-300">Submit</button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AdminCreateItemPage;
