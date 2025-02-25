import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import moment from 'moment';

function AdminFormPage() {
  const [formData, setFormData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .post(
          `${process.env.REACT_APP_API}/api/authen`,
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
            fetchAllForm()
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

  const fetchAllForm = async () => {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    try {
      if (!token) {
        // If no token, alert or handle it
        Swal.fire({
          title: 'Fail!',
          text: 'Please login',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        setTimeout(() => {
          window.location = "/adminitem"; // Redirect to the admin item page after success
        }, 1000);
      }

      const response = await axios.get(`${process.env.REACT_APP_API}/api/getallform`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // Add the token to the header
        },
      });

      if (response.data.status === "ok") {
        const result = response.data;
        setFormData(result.data); // Update state with fetched data
      } else {
        console.error("Error fetching data:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
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

  return (
    <>
      <div className="min-h-screen font-plex-sans-thai">
        <div className="mt-[70px] bg-[#0079A9] text-white px-3 xl:px-24 py-3 md:flex md:justify-between">
          <p className="py-1">
            <Link to="/">
              <span className="hover:text-[#EEE185]">{t('categorypage.p1')}</span>
            </Link>
            <span> » </span>
            <Link to="/adminpanel">
              <span className="">{t('admin.p5')}</span>
            </Link>
            <span> » </span>
            <span className="">{t('admin.p6')}</span>
          </p>
          <div className="">
            <Link to="/adminPanel">
              <button className=" text-[14px] overflow-hidden truncate bg-[#5E993E] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition duration-300 w-[120px]">
                {t('admin.p24')}
              </button>
            </Link>
            <button onClick={handleLogout} className="text-[14px] overflow-hidden truncate bg-[#EE0003] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition duration-300 w-[120px] ml-[10px]">
              {t('admin.p23')}
            </button>
          </div>
        </div>

        <div className="pb-[40px] pt-[20px]">
          <h1 className="pt-2 text-[30px] text-center">
            {t('admin.p6')}
          </h1>
          <div className="text-[#E2B22C] h-[3px] w-[60px] mx-[auto] bg-[#E2B22C]" />
        </div>

        <div className="mx-3 xl:mx-24 overflow-x-auto">
          <table className="bg-white border border-gray-300 rounded-lg shadow-lg w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">{t('admin.p8')}</th>
                <th className="py-3 px-4 text-left min-w-[150px]">{t('admin.p9')}</th>
                <th className="py-3 px-4 text-left min-w-[150px]">{t('admin.p10')}</th>
                <th className="py-3 px-4 text-left min-w-[200px]">{t('admin.p11')}</th>
                <th className="py-3 px-4 text-left min-w-[150px]">{t('admin.p12')}</th>
                <th className="py-3 px-4 text-left min-w-[150px]">{t('admin.p13')}</th>
                <th className="py-3 px-4 text-left min-w-[150px]">{t('admin.p14')}</th>
                <th className="py-3 px-4 text-left min-w-[200px]">{t('admin.p15')}</th>
                <th className="py-3 px-4 text-left min-w-[150px]">{t('admin.p16')}</th>
                <th className="py-3 px-4 text-left min-w-[150px]">{t('admin.p17')}</th>
                <th className="py-3 px-4 text-left min-w-[150px]">{t('admin.p18')}</th>
                <th className="py-3 px-4 text-left min-w-[250px]">{t('admin.p19')}</th> {/* Fixed width */}
                <th className="py-3 px-4 text-left min-w-[150px]">{t('admin.p20')}</th>
                <th className="py-3 px-4 text-left min-w-[150px]">{t('admin.p60')}</th>
                <th className="py-3 px-4 text-left min-w-[200px]">{t('admin.p21')}</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((data, index) => (
                <tr className="border-b border-gray-200" key={index}>
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{data.product}</td>
                  <td className="py-2 px-4">{data.name}</td>
                  <td className="py-2 px-4">{data.tel}</td>
                  <td className="py-2 px-4">{data.line}</td>
                  <td className="py-2 px-4">{data.email}</td>
                  <td className="py-2 px-4">{data.fax}</td>
                  <td className="py-2 px-4">{data.company}</td>
                  <td className="py-2 px-4">{data.position}</td>
                  <td className="py-2 px-4">{data.province}</td>
                  <td className="py-2 px-4">{data.time}</td>
                  <td className="py-2 px-4">{data.requirement}</td> {/* Fixed width */}
                  <td className="py-2 px-4">{data.message}</td>
                  <td className="py-2 px-4">{data.accepted_terms}</td>
                  <td className="py-2 px-4">{moment(data.create_time).format('YYYY-MM-DD HH:mm:ss')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminFormPage;