import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { BiSolidCategory } from "react-icons/bi";
import { FaTags } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { SiGoogleforms } from "react-icons/si";
import { MdRecommend } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";


function AdminPanelPage() {
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
        <div className="min-h-screen font-plex-sans-thai bg-[#f4f4f4]">
            <div className="pt-[80px] bg-[#E2B22C] text-white px-3 xl:px-24 py-3 md:flex md:justify-between">
                <p className="py-1">
                    <Link to="/">
                        <span className="hover:text-[#00007E]">{t('categorypage.p1')}</span>
                    </Link>
                    <span> » </span>
                    <span className="">{t('admin.p5')}</span>
                </p>
                <div className="flex">
                    <button onClick={handleLogout} className="text-[14px] overflow-hidden truncate bg-[#EE0003] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 w-[120px] ml-[10px]">
                        {t('admin.p23')}
                    </button>
                </div>
            </div>
            <div className="flex justify-center items-center h-[700px]">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md my-[auto]">
                    <h1 className="text-2xl font-semibold text-center text-[#333]">{t('admin.p5')}</h1>
                    <div className="text-[#E2B22C] h-[3px] w-[60px] bg-[#E2B22C] mx-auto my-2" />
                    <div className="pt-4">
                        <Link to="/adminform">
                            <div className="flex items-center mb-3 mx-[auto] w-full py-1 px-4 text-white bg-[#E2B22C] border border-[#E2B22C] rounded-md hover:bg-white hover:border-[#42189F] hover:text-[#42189F] transition duration-300 cursor-pointer">
                                <SiGoogleforms />
                                <span className="ml-4">{t('admin.p6')}</span>
                            </div>
                        </Link>
                        <Link to="/adminitem">
                        <div className="flex items-center mb-3 mx-[auto] w-full py-1 px-4 text-white bg-[#E2B22C] border border-[#E2B22C] rounded-md hover:bg-white hover:border-[#42189F] hover:text-[#42189F] transition duration-300 cursor-pointer">
                                <MdOutlineProductionQuantityLimits />
                                <span className="ml-4">{t('admin.p7')}</span>
                            </div>
                        </Link>
                        <Link to="/admincategory">
                        <div className="flex items-center mb-3 mx-[auto] w-full py-1 px-4 text-white bg-[#E2B22C] border border-[#E2B22C] rounded-md hover:bg-white hover:border-[#42189F] hover:text-[#42189F] transition duration-300 cursor-pointer">
                                <BiSolidCategory />
                                <span className="ml-4">{t('admin.p47')}</span>
                            </div>
                        </Link>
                        <Link to="/adminbrand">
                        <div className="flex items-center mb-3 mx-[auto] w-full py-1 px-4 text-white bg-[#E2B22C] border border-[#E2B22C] rounded-md hover:bg-white hover:border-[#42189F] hover:text-[#42189F] transition duration-300 cursor-pointer">
                                <MdDriveFileRenameOutline />
                                <span className="ml-4">{t('admin.p55')}</span>
                            </div>
                        </Link>
                        <Link to="/adminsearchword">
                        <div className="flex items-center mb-3 mx-[auto] w-full py-1 px-4 text-white bg-[#E2B22C] border border-[#E2B22C] rounded-md hover:bg-white hover:border-[#42189F] hover:text-[#42189F] transition duration-300 cursor-pointer">
                                <FaTags />
                                <span className="ml-4">{t('admin.p56')}</span>
                            </div>
                        </Link>
                        <Link to="/adminrecommend">
                        <div className="flex items-center mb-3 mx-[auto] w-full py-1 px-4 text-white bg-[#E2B22C] border border-[#E2B22C] rounded-md hover:bg-white hover:border-[#42189F] hover:text-[#42189F] transition duration-300 cursor-pointer">
                                <MdRecommend />
                                <span className="ml-4">{t('admin.p48')}</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPanelPage