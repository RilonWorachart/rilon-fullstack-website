import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';



function AdminVideoPage() {
    const [videoUrl, setVideoUrl] = useState('');
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
                        fetchVideoUrl()
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

    const [formData, setFormData] = useState({
        youtube_url: videoUrl,
    });

    useEffect(() => {
        if (videoUrl) {
            setFormData({
                youtube_url: videoUrl
            });
        }
    }, [videoUrl]);

    const fetchVideoUrl = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/getvideo`);
            const result = response.data;
            setVideoUrl(result.data[0].youtube_url);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
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
        formDataToSend.append('youtube_url', formData.youtube_url);


        // Send the request to the backend
        axios.put(`${process.env.REACT_APP_API}/api/editvideo`, formDataToSend, {
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
                        text: 'Create Search word successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    setTimeout(() => {
                        window.location = "/adminvideo"; // Redirect to the admin item page after success
                    }, 1000);
                } else {
                    Swal.fire({
                        title: 'Fail!',
                        text: 'Create Searchword failed!',
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





    return (
        <>
            <div className="min-h-screen font-plex-sans-thai">
                <div className="mt-[84px] px-10 xl:px-24 py-3 bg-[#0079A9] md:flex md:justify-between">
                    <p className="py-1 text-white">
                        <Link to="/">
                            <span className="hover:text-[#EEE185]">{t('categorypage.p1')}</span>
                        </Link>
                        <span> » </span>
                        <Link to="/adminpanel">
                            <span className="hover:text-[#EEE185]">{t('admin.p5')}</span>
                        </Link>
                        <span> » </span>
                        <span className="">{t('admin.p61')}</span>
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

                <div className="pt-[70px]">
                    <h1 className="pt-2 text-[30px] text-center">
                        {t('admin.p61')}
                    </h1>
                    <div className="h-[3px] w-[60px] mx-[auto] bg-[#E2B22C]" />
                </div>
                <div className="mx-[10%] max-w-[1400px] 2xl:mx-[auto] pb-10">
                    <form className="pt-6" onSubmit={handleSubmit}>
                        <div className="pt-4 flex justify-center items-center">
                            <label htmlFor="youtube_url" className="font-semibold py-1 w-[100px] mr-[20px]">{t('admin.p62')}<span className="text-[#DC3545]">*</span></label><br />
                            <input
                                type="text"
                                id="youtube_url"
                                name="youtube_url"
                                value={formData.youtube_url}
                                onChange={handleChange}
                                required
                                className="py-1.5 pl-3 border w-full rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                            />
                        </div>
                        <p className="text-[#808080] mt-2 text-[12px] md:ml-[110px]">{t('admin.p63')}</p>
                        <div className="pt-8 flex justify-center">
                            <button
                                type="submit"
                                className="text-[14px] overflow-hidden truncate bg-[#5E993E] border border-[#5E993E] text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition duration-300"
                            >
                                {t('admin.p27')}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex justify-center item-center py-4">
                    <iframe
                        src={videoUrl}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-[250px] sm:h-[325px] md:h-[395px] w-[700px] border-none"
                        referrerPolicy="strict-origin-when-cross-origin"
                    ></iframe>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default AdminVideoPage