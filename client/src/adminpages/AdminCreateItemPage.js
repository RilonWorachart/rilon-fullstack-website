import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import ModelPreview from '../components/ModelPreview';

const AdminCreateItemPage = () => {
  const { t } = useTranslation();
  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [searchwordData, setSearchwordData] = useState([]);


  const fetchAllBrandData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/getallbrand`);
      const result = response.data;
      setBrandData(result.data);
    } catch (error) {
      console.error("Error fetching brand data:", error);
    }
  };

  const fetchAllSearchwordData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/getallsearchword`);
      const result = response.data;
      setSearchwordData(result.data);
    } catch (error) {
      console.error("Error fetching searchword data:", error);
    }
  };

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
            fetchAllSearchwordData();
            fetchAllBrandData();
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
    other_th: '',
    other_en: '',
    name_en: '',
    description_en: '',
    model:null,
    category_id: '',
    brand_id: '',
    searchword_id: ''
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


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'picture_1' || name === 'picture_2' || name=== 'model') {
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
    formDataToSend.append('other_th', formData.other_th);
    formDataToSend.append('other_en', formData.other_en);
    formDataToSend.append('name_en', formData.name_en);
    formDataToSend.append('description_en', formData.description_en);
    formDataToSend.append('category_id', formData.category_id);
    formDataToSend.append('brand_id', formData.brand_id);
    formDataToSend.append('searchword_id', formData.searchword_id);


    // Append the pictures if they exist
    if (formData.picture_1) {
      formDataToSend.append('picture_1', formData.picture_1);
    }
    if (formData.picture_2) {
      formDataToSend.append('picture_2', formData.picture_2);
    }
    if (formData.model) {
      formDataToSend.append('model', formData.model);
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
      .catch(
        (error) => {
          if (error.response) {
            // The server responded with a status other than 2xx
            if (error.response.status === 500) {
              Swal.fire({
                title: 'Server Error!',
                text: 'Invalid file type or file size exceeds the maximum limit. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            } else {
              // Handle other status codes as needed
              Swal.fire({
                title: 'Error!',
                text: `Error: ${error.response.status} - ${error.response.statusText}`,
                icon: 'error',
                confirmButtonText: 'OK',
              });
            }
          } else if (error.request) {
            // The request was made but no response was received
            Swal.fire({
              title: 'Network Error!',
              text: 'No response from the server. Please check your internet connection.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          } else {
            // Something went wrong while setting up the request
            Swal.fire({
              title: 'Error!',
              text: `An error occurred: ${error.message}`,
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        }
      );
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

  const [picture_1_PreviewUrl, setPicture_1_PreviewUrl] = useState(null);
  const [picture_2_PreviewUrl, setPicture_2_PreviewUrl] = useState(null);
  const [model_PreviewUrl, setModel_PreviewUrl] = useState(null);

  useEffect(() => {
    // Create object URLs for the image previews only if they are valid files
    if (formData.picture_1 && formData.picture_1 instanceof File) {
      setPicture_1_PreviewUrl(URL.createObjectURL(formData.picture_1));
    } else {
      setPicture_1_PreviewUrl(null); // Reset preview if picture_1 is not a valid File
    }

    if (formData.picture_2 && formData.picture_2 instanceof File) {
      setPicture_2_PreviewUrl(URL.createObjectURL(formData.picture_2));
    } else {
      setPicture_2_PreviewUrl(null); // Reset preview if picture_2 is not a valid File
    }

    if (formData.model && formData.model instanceof File) {
      setModel_PreviewUrl(URL.createObjectURL(formData.model));
    } else {
      setModel_PreviewUrl(null); // Reset preview if picture_2 is not a valid File
    }

    // Cleanup URLs on component unmount or when the file changes
    return () => {
      if (picture_1_PreviewUrl) {
        URL.revokeObjectURL(picture_1_PreviewUrl);
      }
      if (picture_2_PreviewUrl) {
        URL.revokeObjectURL(picture_2_PreviewUrl);
      }
      if (model_PreviewUrl) {
        URL.revokeObjectURL(model_PreviewUrl);
      }
    };
  }, [formData]);  // Trigger effect whenever formData changes

  return (
    <div className="min-h-screen font-plex-sans-thai">
      <div className="mt-[70px] bg-[#0079A9] text-white px-3 xl:px-24 py-3 md:flex md:justify-between md:items-center">
        <p className="py-1">
          <a href="/" className="hover:text-[#EEE185]">{t('categorypage.p1')}</a><span> » </span>
          <a href="/adminpanel" className="hover:text-[#EEE185]">{t('admin.p7')}</a> <span> » </span>
          <Link to="/adminitem"><span className="hover:text-[#EEE185]">{t('admin.p9')}</span></Link>
          <span> » </span>
          <span>{t('admin.p22')}</span>
        </p>
        <div className="flex">
          <Link to="/adminitem">
            <button className="text-[14px] overflow-hidden truncate bg-[#5E993E] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition duration-300 w-[120px]">
              {t('admin.p24')}
            </button>
          </Link>
          <button onClick={handleLogout} className="text-[14px] overflow-hidden truncate bg-[#EE0003] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition duration-300 w-[120px] ml-[10px]">
            {t('admin.p23')}
          </button>
        </div>
      </div>

      <div className="mx-[10%] max-w-[1400px] 2xl:mx-[auto] pt-4 pb-10">
        <div>
          <h1 className="text-[30px]">{t('admin.p22')}</h1>
          <div className="text-[#E2B22C] h-[3px] w-[60px] bg-[#0079A9]" />
        </div>

        <form className="py-6" onSubmit={handleSubmit}>
          <div className="md:flex">
            <div className="md:w-[50%] md:pr-[10px]">
              <div className="pt-4">
                <label htmlFor="rilon_id" className="font-semibold py-1">{t('admin.p31')}<span className="text-[#DC3545]">*</span></label><br />
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
                <label htmlFor="name_th" className="font-semibold py-1">{t('admin.p33')}<span className="text-[#DC3545]">*</span></label><br />
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
                <label htmlFor="category_id" className="font-semibold py-1">{t('admin.p35')}<span className="text-[#DC3545]">*</span></label><br />
                <select
                  name="category_id"
                  id="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                  className="border w-[100%] py-1 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                >
                  <option value="">{t('admin.p45')}</option>
                  {categoryData.map((result) => (
                    <option key={result.ID} value={result.ID}>
                      {result.name_th} / {result.name_en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <label htmlFor="description_th" className="font-semibold py-1">{t('admin.p37')}<span className="text-[#DC3545]">*</span></label><br />
                <textarea
                  id="description_th"
                  name="description_th"
                  value={formData.description_th}
                  onChange={handleChange}
                  rows="5"
                  required
                  className="border w-[100%] px-3 py-1 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>

              <div className="pt-4">
                <label htmlFor="other_th" className="font-semibold py-1">{t('admin.p39')}</label><br />
                <textarea
                  id="other_th"
                  name="other_th"
                  rows="5"
                  value={formData.other_th}
                  onChange={handleChange}
                  className="border w-[100%] px-3 py-1 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>

              <div className="pt-4">
                <label htmlFor="picture_1" className="font-semibold py-1">{t('admin.p41')}<span className="text-[#DC3545]">*</span></label><br />
                <input
                  type="file"
                  id="picture_1"
                  name="picture_1"
                  onChange={handleChange}
                  required
                  className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
                {picture_1_PreviewUrl && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={picture_1_PreviewUrl}
                      alt="Preview main"
                      width="200"
                      className="border rounded-md"
                    />
                  </div>
                )}
              </div>
              <div className="pt-4">
                <label htmlFor="model" className="font-semibold py-1">{t('admin.p59')}</label><br />
                <input
                  type="file"
                  id="model"
                  name="model"
                  onChange={handleChange}
                  className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
                {model_PreviewUrl && (
                  <div className="mt-4 flex justify-center">
                    <ModelPreview modelPath={model_PreviewUrl} />
                  </div>
                )}
              </div>
            </div>

            <div className="md:w-[50%] md:pl-[10px]">
              <div className="pt-4">
                <label htmlFor="name_en" className="font-semibold py-1">{t('admin.p32')}<span className="text-[#DC3545]">*</span></label><br />
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
                <label htmlFor="brand_id" className="font-semibold py-1">{t('admin.p34')}<span className="text-[#DC3545]">*</span></label><br />
                <select
                  name="brand_id"
                  id="brand_id"
                  value={formData.brand_id}
                  onChange={handleChange}
                  required
                  className="border w-[100%] py-1 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                >
                  <option value="">{t('admin.p46')}</option>
                  {brandData.map((result) => (
                    <option key={result.id} value={result.id}>
                      {result.name_th} / {result.name_en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <label htmlFor="searchword_id" className="font-semibold py-1">{t('admin.p36')}</label><br />
                <select
                  name="searchword_id"
                  id="searchword_id"
                  value={formData.searchword_id}
                  onChange={handleChange}
                  className="border w-[100%] py-1 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                >
                  <option value="">{t('admin.p44')}</option>
                  {searchwordData.map((result) => (
                    <option key={result.id} value={result.id}>
                      {result.name_th} / {result.name_en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <label htmlFor="description_en" className="font-semibold py-1">{t('admin.p38')}<span className="text-[#DC3545]">*</span></label><br />
                <textarea
                  id="description_en"
                  name="description_en"
                  value={formData.description_en}
                  onChange={handleChange}
                  rows="5"
                  required
                  className="border w-[100%] px-3 py-1 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>

              <div className="pt-4">
                <label htmlFor="other_en" className="font-semibold py-1">{t('admin.p40')}</label><br />
                <textarea
                  id="other_en"
                  name="other_en"
                  value={formData.other_en}
                  onChange={handleChange}
                  rows="5"
                  className="border w-[100%] px-3 py-1 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
              </div>

              <div className="pt-4">
                <label htmlFor="picture_2" className="font-semibold py-1">{t('admin.p42')}</label><br />
                <input
                  type="file"
                  id="picture_2"
                  name="picture_2"
                  onChange={handleChange}
                  className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                />
                {picture_2_PreviewUrl && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={picture_2_PreviewUrl}
                      alt="Preview datasheet"
                      width="200"
                      className="border rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>


          </div>
          <div className="pt-8 flex justify-center">
            <button
              type="submit"
              className="text-[14px] overflow-hidden truncate bg-[#5E993E] border border-[#5E993E] text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300"
            >
              {t('admin.p43')}
            </button>
          </div>
        </form>
      </div>


      <Footer />
    </div>
  );
};

export default AdminCreateItemPage;
