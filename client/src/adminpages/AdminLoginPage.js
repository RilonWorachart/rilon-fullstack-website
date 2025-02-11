import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

function AdminLoginPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fname: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior.

    // Extract form data from formData state
    const jsonData = {
      fname: formData.fname,
      password: formData.password,
    };

    try {
      // Send data to the server using axios
      const response = await axios.post(
        `${process.env.REACT_APP_API}/login`,
        jsonData, // Send the jsonData directly (axios automatically sets Content-Type to application/json)
      );

      // Handle response data
      if (response.data.status === "ok") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        Swal.fire({
          title: 'Success!',
          text: 'Login successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setTimeout(() => {
          window.location = "/adminpanel"; // Redirect to the admin item page after successful login
        }, 1000);
      } else {
        Swal.fire({
          title: 'Oops!',
          text: 'Wrong username or password.',
          icon: 'error',   // Error icon
          confirmButtonText: 'Okay'
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen font-plex-sans-thai bg-[#f4f4f4] flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-semibold text-center text-[#333]">{t('admin.p1')}</h1>
          <div className="text-[#E2B22C] h-[3px] w-[60px] bg-[#0079A9] mx-auto my-2" />
          <img src='/images/page_images/logo.png' className="w-[200px] mx-[auto] my-[20px]" alt="logo"></img>
          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* First Name Input */}
            <div>
              <label htmlFor="fname" className="block font-semibold text-[#333]">{t('admin.p2')}</label>
              <input
                type="text"
                id="fname"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                required
                className="border w-full py-2 px-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block font-semibold text-[#333]">{t('admin.p3')}</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border w-full py-2 px-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <input
                type="submit"
                value={t('admin.p4')}
                className="py-2 px-4 text-white bg-[#28A745] border border-[#28A745] rounded-md hover:bg-[#218838] transition duration-300 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLoginPage;
