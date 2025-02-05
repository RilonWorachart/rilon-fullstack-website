import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaFacebook, FaLine, FaYoutube, FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import QRcodeComponent from '../QRcodeComponent';
import SearchKeyButton from '../SearchKeyButton';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function ItemDetail() {
    const { id } = useParams();
    const [productData, setProductData] = useState(null);  // Initially null to check if data is fetched
    const [categoryData, setCategoryData] = useState(null); // Start with null to avoid error
    const [brandData, setBrandData] = useState(null)
    const [searchwordData, setSearchwordData] = useState(null)
    const { t, i18n } = useTranslation();

    const currentLang = i18n.language;

    // Fetch product data by ID
    const fetchProductById = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/getproductbyid?id=${id}`);
            // console.log("Product Response:", response.data);
            const result = response.data;
            if (result && result.data) {
                setProductData(result.data);
            } else {
                console.error("Invalid product data:", result);
            }
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    // Fetch category data using product's category_id
    const fetchCategoryData = async () => {
        if (productData.category_id) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/getcategorybyid?id=${productData.category_id}`);
                const result = response.data;
                if (result && result.data && result.data.length > 0) {
                    setCategoryData(result.data[0]);
                } else {
                    console.error("Category not found");
                }
            } catch (error) {
                console.error("Error fetching category data:", error);
            }
        } else {
            console.error("category_id is missing");
        }
    };


    const fetchBrandData = async () => {
        if (productData.brand_id) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/getbrandbyid?id=${productData.brand_id}`);
                const result = response.data;
                if (result && result.data && result.data.length > 0) {
                    setBrandData(result.data[0]);
                } else {
                    console.error("Category not found");
                }
            } catch (error) {
                console.error("Error fetching category data:", error);
            }
        } else {
            console.error("category_id is missing");
        }
    };



    const fetchSearchwordData = async () => {
        if (productData.searchword_id) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/getsearchwordbyid?id=${productData.searchword_id}`);
                const result = response.data;
                if (result && result.data && result.data.length > 0) {
                    setSearchwordData(result.data[0]);
                } else {
                    console.error("Category not found");
                }
            } catch (error) {
                console.error("Error fetching category data:", error);
            }
        } else {
            console.error("category_id is missing");
        }
    };

    useEffect(() => {
        fetchProductById();  // Fetch product data when component mounts or `id` changes
    }, [id]);  // Depend on `id` to refetch if `id` changes

    useEffect(() => {
        if (productData) {
            if (productData.category_id) fetchCategoryData();  // Fetch category data if available
            if (productData.brand_id) fetchBrandData();        // Fetch brand data if available
            if (productData.searchword_id) fetchSearchwordData();  // Fetch searchword data if available
        }
    }, [productData]);

    if (!productData || !categoryData || !brandData) {
        return <div>Loading...</div>;  // If product, category, or brand data is missing, show loading
    }

    return (
        <>
            <div className="mt-[70px] bg-[#E2B22C] text-white px-3 xl:px-24 py-3 md:flex md:justify-between md:items-center">
                <p className="py-1">
                    <Link to="/">
                        <span className="hover:text-[#00007E]">{t('itempage.p2')}</span>
                    </Link>
                    <span> » </span>
                    <Link to={`/category/${productData.category_id}`}>
                        <span className="hover:text-[#00007E]">{currentLang === 'th' ? categoryData.name_th : categoryData.name_en}</span>
                    </Link>
                    <span> » </span>
                    <span className="">{currentLang === 'th' ? productData.name_th : productData.name_en}</span>
                </p>
                <h2 className="py-1 text-[20px]">{t('itempage.p4')}</h2>
            </div>

            <div className="flex justify-end">
                <SearchKeyButton />
            </div>

            <div className="mx-[10%] max-w-[1400px] 2xl:mx-[auto] my-[30px] px-[15px] py-[15px] border-[1px] border-lightgray rounded-md md:flex">
                <img className="w-[100%] md:w-[35%] md:h-[100%] border rounded-md md:mr-[40px]" src={`${process.env.REACT_APP_API}${productData.picture_1}`} alt={productData.name_th} />
                <div className="md:w-[70%]">
                    <p className="text-[32px] pt-4">{currentLang === 'th' ? productData.name_th : productData.name_en}</p>
                    <p className="py-1">
                        <span>{t('itempage.p5')} </span>
                        <Link to={`/catalog/keyword/${brandData.name_th}`}>
                            <span className="text-[#E2B22C] uppercase">{currentLang === 'th' ? brandData.name_th : brandData.name_en}</span>
                        </Link>
                    </p>
                    <hr />
                    <div className="flex py-6">
                        <Link to={`/requestform`}>
                            <button className="bg-[#E2B22C] border text-white py-2 px-6 mr-4 hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 inline-block">{t('itempage.p13')}</button>
                        </Link>
                    </div>
                    <hr />
                    <p className="py-2">{t('itempage.p6')}</p>
                    <div className="flex">
                        <Link to={`/category/${productData.category_id}`}>
                            <button className="bg-[#E2B22C] border text-white text-[13px] py-1 px-4 mr-2 hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 inline-block">
                                {currentLang === 'th' ? categoryData.name_th : categoryData.name_en}
                            </button>
                        </Link>
                    </div>
                    {productData.searchword_id && (
                        <div>
                            <p className="py-2">{t('itempage.p12')}</p>
                            <Link to={`/catalog/keyword/${searchwordData.name_th}`}>
                                <button className="bg-[#E2B22C] border text-white text-[13px] mb-2 py-1 px-4 mr-4 hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 inline-block">{currentLang === 'th' ? searchwordData.name_th : productData.name_en}</button>
                            </Link>
                        </div>
                    )}
                    <hr className="mt-3"/>
                    <p className="py-2">{t('itempage.p8')}</p>

                    <div className="flex">
                        <a href="https://page.line.me/156vctty?openQrModal=true">
                            <div className="p-1.5 mr-1.5 text-[18px] bg-white border border-[#02B92E] text-[#02B92E] rounded-full hover:bg-[#02B92E] hover:text-white transition duration-300">
                                <FaLine />
                            </div>
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61555700229121">
                            <div className="p-1.5 mr-1.5 text-[18px] bg-white border border-[#1773EA] text-[#1773EA] rounded-full hover:bg-[#1773EA] hover:text-white transition duration-300">
                                <FaFacebook />
                            </div>
                        </a>
                        <a href="https://www.instagram.com/rilonthailand/">
                            <div className="p-1.5 mr-1.5 text-[18px] bg-white border border-[#BB5287] text-[#BB5287] rounded-full hover:bg-[#BB5287] hover:text-white transition duration-300">
                                <FaInstagram />
                            </div>
                        </a>
                        <a href="https://www.youtube.com/@rilon_thailand">
                            <div className="p-1.5 mr-1.5 text-[18px] bg-white border border-[#E60023] text-[#E60023] rounded-full hover:bg-[#E60023] hover:text-white transition duration-300">
                                <FaYoutube />
                            </div>
                        </a>
                        <a href="mailto:janenyrilon_jingwei@hotmail.com">
                            <div className="p-1.5 mr-1.5 text-[18px] bg-white border border-[#0078D4] text-[#0078D4] rounded-full hover:bg-[#0078D4] hover:text-white transition duration-300">
                                <MdOutlineEmail />
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="mx-[10%] max-w-[1400px] 2xl:mx-[auto] my-[30px] px-[20px] py-[10px] border-[1px] border-lightgray rounded-md">
                <div>
                    <h1 className="text-[30px]">
                        {t('itempage.p9')}
                    </h1>
                    <div className="text-[#E2B22C] h-[3px] w-[60px] bg-[#E2B22C]" />
                </div>
                <div className="py-[50px]">
                    <table className="w-[100%]">
                        <tbody className="border-[1px] border-lightgray">
                            <tr className="border-[1px] border-lightgray">
                                <td className="hidden md:table-cell w-[15%] text-center py-2 px-4 font-semibold border-[1px] border-lightgray">{currentLang === 'th' ? 'คำอธิบาย' : 'Description'}</td>
                                <td className="py-4 px-5">{currentLang === 'th' ? productData.description_th : productData.description_en}</td>
                            </tr>
                            {productData.picture_2 && (
                                <tr className="border-[1px] border-lightgray">
                                    <td className="hidden md:table-cell py-2 px-4 text-center font-semibold border-[1px] border-lightgray">{currentLang === 'th' ? 'แผ่นข้อมูล' : 'Datasheet'}</td>
                                    <td className="py-10">
                                        <div className="mx-[auto] md:mx-[10%] ">
                                            <img
                                                className="mx-[auto] border rounded-md"
                                                src={`${process.env.REACT_APP_API}${productData.picture_2}`}
                                                alt={productData.name_th}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {productData.other_th && (
                                <tr className="border-[1px] border-lightgray">
                                    <td className="hidden md:table-cell py-2 px-4  text-center font-semibold border-[1px] border-lightgray">{currentLang === 'th' ? 'อื่นๆ' : 'Other'}</td>
                                    <td className="py-4 px-5">
                                        <div className="break-words">
                                            {currentLang === 'th' ? productData.other_th : productData.other_en}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <QRcodeComponent />
                <div className="text-center">
                    <p className="pt-10 pb-2 font-bold text-[16px] text-[#FF0000]">{t('itempage.p10')}</p>
                    <div className="pb-8 text-[17px] font-semibold">
                        <p className="py-2">08-1694-5000 , 098-426-6953 </p>
                        <p className="py-2">095-961-9901 , 089-660-9609</p>
                        <p className="py-2">094-695-5599</p>
                        <p className="py-2">081-697-7000 office</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ItemDetail;
