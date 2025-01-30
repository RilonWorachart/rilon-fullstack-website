import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaFacebook, FaLine, FaYoutube, FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import QRcodeComponent from '../QRcodeComponent'
import SearchKeyButton from '../SearchKeyButton';
import ItemListbyCategory from './ItemListbyCategory'
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function CategoryDetail() {
    const { id } = useParams();
    const [categoryData, setProductData] = useState([])
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;

    const fetchCategoryById = async () => {
        try {
            // Use Axios to send the GET request
            const response = await axios.get(`${process.env.REACT_APP_API}/getcategorybyid?id=${id}`)

            const result = response.data;
            console.log(result)
            console.log(process.env.REACT_APP_API)
            setProductData(result.data[0]);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };


    useEffect(() => {
        fetchCategoryById()
    }, []); // Empty dependency array means this runs once when the component mounts


    return (
        <>
            <div className="mt-[70px] bg-[#E2B22C] text-white px-3 xl:px-24 py-3 md:flex md:justify-between md:items-center">
                <p className="py-1">
                    <Link to="/">
                        <span className="hover:text-[#00007E]">{t('itempage.p2')}</span>
                    </Link>
                    <span> » </span>
                    <span className="">{currentLang === 'th' ? categoryData.name_th : categoryData.name_en}</span>
                </p>
                <h2 className="py-1 text-[20px]">{t('itempage.p4')}</h2>
            </div>

            <div className="flex justify-end ">
                <SearchKeyButton />
            </div>

            <div className="mx-[10%] max-w-[1400px] 2xl:mx-[auto] my-[30px] px-[15px] py-[15px] border-[1px] border-lightgray rounded-md md:flex">
                <img className=" w-[100%] md:w-[35%] md:h-[100%]  border rounded-md md:mr-[40px]" src={`${process.env.REACT_APP_API}${categoryData.picture_1}`} alt={categoryData.name_th} />
                <div className="lg:w-[70%]">
                    <p className="text-[32px] pt-4">{currentLang === 'th' ? categoryData.name_th : categoryData.name_en}</p>
                    <p className="pt-1 pb-3">
                        <span className="text-[#E2B22C]">{currentLang === 'th' ? categoryData.description_th : categoryData.description_en}</span>
                    </p>
                    <hr></hr>


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

            <div className="mx-[10%] max-w-[1400px] 2xl:mx-[auto] my-[30px] pt-[20px] pb-[10px] border-[1px] border-lightgray rounded-md">
                <ItemListbyCategory />
                <div className="pt-[20px]">
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
            </div>
        </>
    )
}

export default CategoryDetail