import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import { FaMinusSquare } from "react-icons/fa";

function AdminBrandPage() {
    const [brandData, setBrandData] = useState([]);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name_th: '',
        name_en: '',
    });

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
                        fetchAllBrand()
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


    const fetchAllBrand = async () => {
        try {
            // Use Axios to send the GET request
            const response = await axios.get(`${process.env.REACT_APP_API}/api/getallbrand`, {
            });

            const result = response.data;
            setBrandData(result.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
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



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData object to handle file uploads
        const formDataToSend = new FormData();
        formDataToSend.append('name_th', formData.name_th);
        formDataToSend.append('name_en', formData.name_en);


        // Send the request to the backend
        axios.post(`${process.env.REACT_APP_API}/api/createbrand`, formDataToSend, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.status === 'ok') {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Create Brand successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    setTimeout(() => {
                        window.location = "/adminbrand"; // Redirect to the admin item page after success
                    }, 1000);
                } else {
                    Swal.fire({
                        title: 'Fail!',
                        text: 'Create Brand failed!',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            })
            .catch(
                (error) => {
                    if (error.response) {
                        Swal.fire({
                            title: 'Error!',
                            text: `Error: ${error.response.status} - ${error.response.statusText}`,
                            icon: 'error',
                            confirmButtonText: 'OK',
                        });
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


    const handledelete = (ID) => {
        const token = localStorage.getItem("token");

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`${process.env.REACT_APP_API}/api/deletebrand?id=${ID}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response) => {
                        if (response.data.status === "ok") {
                            Swal.fire({
                                title: 'Success!',
                                text: 'Deleted successfully!',
                                icon: 'success',
                                confirmButtonText: 'OK',
                            });
                            setTimeout(() => {
                                navigate(0);
                            }, 1000);
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting product", error.response ? error.response.data : error);
                        if (error.response && error.response.status === 401) {
                            Swal.fire({
                                title: 'Unauthorized!',
                                text: 'Please login to continue.',
                                icon: 'warning',
                                confirmButtonText: 'OK',
                            });
                        } else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Something went wrong. Please try again later.',
                                icon: 'error',
                                confirmButtonText: 'OK',
                            });
                        }
                    });
            }
        })
    };



    return (
        <>
            <div className="min-h-screen font-plex-sans-thai">
                <div className="mt-[84px] px-10 xl:px-24 py-3 bg-[#0079A9] text-white md:flex md:justify-between">
                    <p className="py-1">
                        <Link to="/">
                            <span className="hover:text-[#EEE185]">{t('categorypage.p1')}</span>
                        </Link>
                        <span> » </span>
                        <Link to="/adminpanel">
                            <span className="hover:text-[#EEE185]">{t('admin.p5')}</span>
                        </Link>
                        <span> » </span>
                        <span className="">{t('admin.p55')}</span>
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

                <div className="pt-[20px]">
                    <h1 className="pt-2 text-[30px] text-center">
                        {t('admin.p57')}
                    </h1>
                    <div className="text-[#E2B22C] h-[3px] w-[60px] mx-[auto] bg-[#0079A9]" />
                </div>
                <div className="mx-[10%] max-w-[1400px] 2xl:mx-[auto] pb-10">
                    <form className="pt-6" onSubmit={handleSubmit}>
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
                            <label htmlFor="name_en" className="font-semibold py-1">{t('admin.p32')}<span className="text-[#DC3545]">*</span></label><br />
                            <input
                                type="text"
                                id="name_en"
                                name="name_en"
                                onChange={handleChange}
                                required
                                className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                            />
                        </div>
                        <div className="pt-8 flex justify-center">
                            <button
                                type="submit"
                                className="text-[14px] overflow-hidden truncate bg-[#5E993E] border border-[#5E993E] text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300"
                            >
                                {t('admin.p52')}
                            </button>
                        </div>

                    </form>
                </div>

                <hr className="mx-[10%] max-w-[1400px] 2xl:mx-[auto]" />

                <div className="mx-[10%] max-w-[1400px] 2xl:mx-[auto] mb-[50px]">
                    <div className="pb-[40px] pt-[30px]">
                        <h1 className="pt-2 text-[30px] text-center">
                            {t('admin.p55')}
                        </h1>
                        <div className="text-[#E2B22C] h-[3px] w-[60px] mx-[auto] bg-[#E2B22C]" />
                    </div>

                    <table class="bg-white border border-gray-300 rounded-lg shadow-lg w-[100%] ">
                        <thead class="bg-gray-200">
                            <tr className="">
                                <th class="py-2 px-4 text-center">{t('admin.p8')}</th>
                                <th class="py-2 px-4 text-center">{t('admin.p33')}</th>
                                <th class="py-2 px-4 text-center">{t('admin.p32')}</th>
                                <th class="py-2 px-4 text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {brandData.map((data, index) => (
                                <tr className="border-b border-gray-200" key={index}>
                                    <td className="py-2 px-4 text-center">{index + 1}</td>
                                    <td className="py-2 px-4">{data.name_th}</td>
                                    <td className="py-2 px-4">{data.name_en}</td>
                                    <td className="py-2 px-4 text-[#EE0003] text-[30px] text-center flex items-center justify-center">
                                        <button className="hover:text-[#872325]" onClick={() => handledelete(data.id)}>
                                            <FaMinusSquare />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >
            <Footer />
        </>
    )
}
export default AdminBrandPage