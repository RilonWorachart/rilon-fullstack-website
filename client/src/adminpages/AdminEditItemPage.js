import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Footer from '../components/Footer'
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function AdminEditItemPage() {
    const { t } = useTranslation();
    const { id } = useParams();
    const [productData, setProductData] = useState(null);  // Initialize with null
    const [categoryData, setCategoryData] = useState([]);

    const fetchCategories = () => {
        const fetchedCategories = [
          { id: 1, th: 'สมาร์ทโฟน', en: 'Smartphone' },
          { id: 2, th: 'แท็บเล็ต', en: 'Tablet' },
          { id: 3, th: 'กล้อง', en: 'Camera' },
        ];
        setCategoryData(fetchedCategories);
      };


      useEffect(() => {
        fetchCategories();
      }, []);


    const fetchProductById = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/getproductbyid?id=${id}`);
            const result = response.data;
            setProductData(result.data);
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    useEffect(() => {
        fetchProductById();  // Fetch product data when the id or language changes
    }, [id]);  // Added `id` as a dependency to refetch data when `id` changes

    // Initialize formData with default values or values from `productData`
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

    // Update formData once productData is fetched
    useEffect(() => {
        if (productData) {
            setFormData({
                rilon_id: 'P001',
                picture_1: null,
                picture_2: null,
                name_th: productData.name_th,
                description_th: productData.description_th,
                search_word_th: productData.search_word_th,
                search_word_en: productData.search_word_en,
                brand_th: productData.brand_th,
                brand_en: productData.brand_en,
                other_th: productData.other_th,
                other_en: productData.other_en,
                name_en: productData.name_en,
                description_en: productData.description_en,
                category_id: productData.category_id, // For category ID
            });
        }
    }, [productData]);  // Runs when `productData` changes


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', formData);
    };

    const handleLogout = () => {

    }


    return (
        <>
            <div className="min-h-screen font-plex-sans-thai">
                <div className="mt-[70px] bg-[#E2B22C] text-white px-3 xl:px-24 py-3 md:flex md:justify-between md:items-center">
                    <p className="py-1">
                        {/* Breadcrumbs */}
                        <a href="/" className="hover:text-[#00007E]">{t('categorypage.p1')}</a> <span> » </span>
                        <a href="/adminitem" className="hover:text-[#00007E]">Admin</a> <span> » </span>
                        <span>Edit Form</span>
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
                                        {categoryData.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.th} / {category.en}
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
        </>
    )
}

export default AdminEditItemPage