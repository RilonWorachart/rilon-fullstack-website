import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Footer from '../components/Footer'
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

function AdminEditCategoryPage() {
    const { t } = useTranslation();
    const { id } = useParams();
    const [categoryData, setCategoryData] = useState(null);

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
                        fetchCategoryById();
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

    const fetchCategoryById = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/getcategorybyid?id=${id}`);
            const result = response.data;
            setCategoryData(result.data[0]);
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    useEffect(() => {
        fetchCategoryById();  // Fetch product data when the id or language changes
    }, [id]);  // Added `id` as a dependency to refetch data when `id` changes

    // Initialize formData with default values or values from `categoryData`
    const [formData, setFormData] = useState({
        picture_1: null,
        name_th: '',
        description_th: '',
        name_en: '',
        description_en: '',
        category_id: '',
        ID: ''
    });

    useEffect(() => {
        if (categoryData) {
            setFormData({
                picture_1: categoryData.picture_1,
                name_th: categoryData.name_th,
                description_th: categoryData.description_th,
                name_en: categoryData.name_en,
                description_en: categoryData.description_en,
                ID: categoryData.ID
            });
        }
    }, [categoryData]);  // Runs when `categoryData` changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'picture_1') {
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
        formDataToSend.append('name_th', formData.name_th);
        formDataToSend.append('description_th', formData.description_th);
        formDataToSend.append('name_en', formData.name_en);
        formDataToSend.append('description_en', formData.description_en);
        formDataToSend.append('ID', formData.ID);

        if (formData.picture_1 instanceof File) {
            formDataToSend.append('picture_1', formData.picture_1);
        } else if (formData.picture_1 && formData.picture_1 !== null) {
            // If there's no new file selected, you could append the old image URL or just leave it out
            formDataToSend.append('picture_1', formData.picture_1);
        }

        // Send the request to the backend
        axios.put(`${process.env.REACT_APP_API}/editcategory`, formDataToSend, {
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
                        text: 'Edited category successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    setTimeout(() => {
                        window.location = "/admincategory"; // Redirect to the admin item page after success
                    }, 1000);
                } else {
                    Swal.fire({
                        title: 'Fail!',
                        text: 'Edited category failed!',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            })
            .catch((error) => {
                // Handle error
            });
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


    const [picture_1_PreviewUrl, setPicture_1_PreviewUrl] = useState(null);

    useEffect(() => {
        // Create object URLs for the image previews only if they are valid files
        if (formData.picture_1 && formData.picture_1 instanceof File) {
            setPicture_1_PreviewUrl(URL.createObjectURL(formData.picture_1));
        } else {
            setPicture_1_PreviewUrl(null); // Reset preview if picture_1 is not a valid File
        }

        // Cleanup URLs on component unmount or when the file changes
        return () => {
            if (picture_1_PreviewUrl) {
                URL.revokeObjectURL(picture_1_PreviewUrl);
            }
        };
    }, [formData]);  // Trigger effect whenever formData changes

    return (
        <div className="min-h-screen font-plex-sans-thai">
            <div className="mt-[70px] bg-[#E2B22C] text-white px-3 xl:px-24 py-3 md:flex md:justify-between md:items-center">
                <p className="py-1">
                    <a href="/" className="hover:text-[#00007E]">{t('categorypage.p1')}</a><span> » </span>
                    <a href="/adminpanel" className="hover:text-[#00007E]">{t('admin.p5')}</a> <span> » </span>
                    <Link to="/admincategory"><span className="hover:text-[#00007E]">{t('admin.p47')}</span></Link>
                    <span> » </span>
                    <span>{t('admin.p53')}</span>
                </p>
                <div className="flex">
                    <Link to="/admincategory">
                        <button className="text-[14px] overflow-hidden truncate bg-[#5E993E] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 w-[120px]">
                            {t('admin.p24')}
                        </button>
                    </Link>
                    <button onClick={handleLogout} className="text-[14px] overflow-hidden truncate bg-[#EE0003] border text-white py-1 px-4 rounded-lg hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 w-[120px] ml-[10px]">
                        {t('admin.p23')}
                    </button>
                </div>
            </div>

            <div className="mx-[10%] max-w-[1400px] 2xl:mx-[auto] pt-4 pb-10">
                <div>
                    <h1 className="text-[30px]">{t('admin.p53')}</h1>
                    <div className="text-[#E2B22C] h-[3px] w-[60px] bg-[#E2B22C]" />
                </div>

                <form className="py-6" onSubmit={handleSubmit}>
                    <div className="md:flex">
                        <div className="md:w-[50%] md:pr-[10px]">
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
                                <label htmlFor="description_th" className="font-semibold py-1">{t('admin.p37')}<span className="text-[#DC3545]">*</span></label><br />
                                <textarea
                                    id="description_th"
                                    name="description_th"
                                    value={formData.description_th}
                                    rows="5"
                                    onChange={handleChange}
                                    required
                                    className="border w-[100%] px-3 py-1 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                                />
                            </div>
                            <div className="pt-4">
                                <label htmlFor="picture_1" className="font-semibold py-1">{t('admin.p41')}</label><br />
                                <input
                                    type="file"
                                    id="picture_1"
                                    name="picture_1"
                                    onChange={handleChange}
                                    className="border w-[100%] py-1.5 pl-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500/50 transition duration-300"
                                />
                                {formData.picture_1 && (typeof formData.picture_1 === 'string' || formData.picture_1 instanceof File) && (
                                    <div className="mt-4 flex justify-center">
                                        <img
                                            src={formData.picture_1 instanceof File ? URL.createObjectURL(formData.picture_1) : `${process.env.REACT_APP_API}${formData.picture_1}`}
                                            alt="Preview"
                                            width="200"
                                            className="border rounded-md"
                                        />
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
    )
}

export default AdminEditCategoryPage