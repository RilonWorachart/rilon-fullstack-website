import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

const AdminCreateItemPage = () => {
  const { t } = useTranslation();
  const [categoryData, setCategoryData] = useState([]);

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
            // If token is valid, fetch all category data
            fetchAllCategoryData();
          } else {
            localStorage.removeItem("token");
            window.location = "/adminlogin"; // Redirect to login if token is invalid
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error (e.g., show error message)
          localStorage.removeItem("token");
          window.location = "/adminlogin"; // Redirect to login if error occurs
        });
    } else {
      window.location = "/adminlogin"; // Redirect to login if no token
    }
  }, []);

  const [formData, setFormData] = useState({
    rilon_id: '',
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

  const fetchAllCategoryData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/getallcategory`);
      const result = response.data;
      setCategoryData(result.data); // Set category data as an array
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const BrandData = [
    { id: 1, name_th: 'ไรล่อน', name_en: 'RILON' },
    { id: 2, name_th: 'JW', name_en: 'JW' },
    { id: 3, name_th: 'JINGWEITIP', name_en: 'JINGWEITIP' },
  ];

  const searchwords = [
    { id: 1, name_th: 'เครื่องเชื่อมอินวอเตอร์ราคาถูก', name_en: 'Cheap Inverter Welding Machine' },
    { id: 2, name_th: 'เครื่องเชื่อมอินวอเตอร์คุณภาพดี', name_en: 'High-Quality Inverter Welding Machine' },
    { id: 3, name_th: 'เครื่องเชื่อมไฟฟ้าราคาถูก', name_en: 'Cheap Electric Welding Machine' },
    { id: 4, name_th: 'เครื่องเชื่อมไฟฟ้าคุณภาพดี', name_en: 'High-Quality Electric Welding Machine' },
    // Add the rest of the search words here
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle search word and brand to update both languages
    if (name === 'search_word_th') {
      const selectedSearchWord = searchwords.find(word => word.name_th === value);
      setFormData({
        ...formData,
        search_word_th: selectedSearchWord.name_th,
        search_word_en: selectedSearchWord.name_en,
      });
    } else if (name === 'brand_th') {
      const selectedBrand = BrandData.find(brand => brand.name_th === value);
      setFormData({
        ...formData,
        brand_th: selectedBrand.name_th,
        brand_en: selectedBrand.name_en,
      });
    } else if (name === 'picture_1' || name === 'picture_2') {
      // Handle file inputs
      setFormData({
        ...formData,
        [name]: e.target.files[0], // Store the file itself
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData object to handle file uploads
    const formDataToSend = new FormData();
    formDataToSend.append('rilon_id', formData.rilon_id);
    formDataToSend.append('name_th', formData.name_th);
    formDataToSend.append('description_th', formData.description_th);
    formDataToSend.append('search_word_th', formData.search_word_th);
    formDataToSend.append('search_word_en', formData.search_word_en);
    formDataToSend.append('brand_th', formData.brand_th);
    formDataToSend.append('brand_en', formData.brand_en);
    formDataToSend.append('other_th', formData.other_th);
    formDataToSend.append('other_en', formData.other_en);
    formDataToSend.append('name_en', formData.name_en);
    formDataToSend.append('description_en', formData.description_en);
    formDataToSend.append('category_id', formData.category_id);

    // Append the pictures if they exist
    if (formData.picture_1) {
      formDataToSend.append('picture_1', formData.picture_1);
    }
    if (formData.picture_2) {
      formDataToSend.append('picture_2', formData.picture_2);
    }

    // Send the request to the backend
    axios.post(`${process.env.REACT_APP_API}/createproduct`, formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data", // Important for file uploads
        "Authorization": "Bearer " + localStorage.getItem("token"),
      }
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 'ok') {
          Swal.fire({
            title: 'Success!',
            text: 'Create product successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          setTimeout(() => {
            window.location = "/adminitem"; // Redirect to the admin item page after success
          }, 1000);
        } else {
          Swal.fire({
            title: 'Fail!',
            text: 'Create product failed!',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    Swal.fire({
      title: 'Success!',
      text: 'Logout successfully!',
      icon: 'success',
      confirmButtonText: 'OK',
    });
    setTimeout(() => {
      window.location = "/adminlogin"; // Redirect to the login page after logout
    }, 1000);
  };

  return (
    <div className="min-h-screen font-plex-sans-thai">
      <div className="mt-[70px] bg-[#E2B22C] text-white px-3 xl:px-24 py-3 md:flex md:justify-between md:items-center">
        <p className="py-1">
          <a href="/" className="hover:text-[#00007E]">{t('categorypage.p1')}</a><span> » </span>
          <a href="/adminitem" className="hover:text-[#00007E]">Admin</a> <span> » </span>
          <span>Create Form</span>
        </p>
        <div className="flex">
          <Link to="/adminitem">
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
            <div className="pt-4">
                <label htmlFor="rilon_id" className="font-semibold py-1">Rilon ID<span className="text-[#DC3545]">*</span></label><br />
                <input
                  type="text"
                  id="rilon_id"
                  name="rilon_id"
                  value={formData.rilon_id}
                  onChange={handleChange}
                  required
                  className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>

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

              <div className="pt-4">
                <label htmlFor="category_id" className="font-semibold py-1">Category<span className="text-[#DC3545]">*</span></label><br />
                <select
                  name="category_id"
                  id="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                  className="border w-[100%] py-1 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                >
                  <option value="">Select a category</option>
                  {categoryData.map((result) => (
                    <option key={result.ID} value={result.ID}>
                      {result.name_th} / {result.name_en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <label htmlFor="description_th" className="font-semibold py-1">Description (Thai)<span className="text-[#DC3545]">*</span></label><br />
                <textarea
                  id="description_th"
                  name="description_th"
                  value={formData.description_th}
                  onChange={handleChange}
                  required
                  className="border w-[100%] px-3 py-1 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>

              <div className="pt-4">
                <label htmlFor="other_th" className="font-semibold py-1">Other (Thai)</label><br />
                <textarea
                  id="other_th"
                  name="other_th"
                  value={formData.other_th}
                  onChange={handleChange}
                  className="border w-[100%] px-3 py-1 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>

              <div className="pt-4">
                <label htmlFor="picture_1" className="font-semibold py-1">Picture 1<span className="text-[#DC3545]">*</span></label><br />
                <input
                  type="file"
                  id="picture_1"
                  name="picture_1"
                  onChange={handleChange}
                  required
                  className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>
            </div>

            <div className="md:w-[50%] md:pl-[10px]">
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

              <div className="pt-4">
                <label htmlFor="brand_th" className="font-semibold py-1">Brand<span className="text-[#DC3545]">*</span></label><br />
                <select
                  name="brand_th"
                  id="brand_th"
                  value={formData.brand_th}
                  onChange={handleChange}
                  required
                  className="border w-[100%] py-1 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                >
                  <option value="">Select a brand</option>
                  {BrandData.map((result) => (
                    <option key={result.id} value={result.name_th}>
                      {result.name_th} / {result.name_en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <label htmlFor="search_word_th" className="font-semibold py-1">Search Word</label><br />
                <select
                  name="search_word_th"
                  id="search_word_th"
                  value={formData.search_word_th}
                  onChange={handleChange}
                  required
                  className="border w-[100%] py-1 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                >
                  <option value="">Select a search word</option>
                  {searchwords.map((result) => (
                    <option key={result.id} value={result.name_th}>
                      {result.name_th} / {result.name_en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <label htmlFor="description_en" className="font-semibold py-1">Description (English)<span className="text-[#DC3545]">*</span></label><br />
                <textarea
                  id="description_en"
                  name="description_en"
                  value={formData.description_en}
                  onChange={handleChange}
                  required
                  className="border w-[100%] px-3 py-1 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>

              <div className="pt-4">
                <label htmlFor="other_en" className="font-semibold py-1">Other (English)</label><br />
                <textarea
                  id="other_en"
                  name="other_en"
                  value={formData.other_en}
                  onChange={handleChange}
                  className="border w-[100%] px-3 py-1 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>

              <div className="pt-4">
                <label htmlFor="picture_2" className="font-semibold py-1">Picture 2</label><br />
                <input
                  type="file"
                  id="picture_2"
                  name="picture_2"
                  onChange={handleChange}
                  className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>
            </div>

          
          </div>
          <div className="pt-8 flex justify-center">
              <button
                type="submit"
                className="text-[14px] overflow-hidden truncate bg-[#5E993E] border border-[#5E993E] text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300"
              >
                Submit
              </button>
            </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AdminCreateItemPage;
