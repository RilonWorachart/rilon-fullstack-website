import React from 'react'
import { FaFacebookF, FaGlobe, FaInstagram, FaLine, FaPhoneAlt, FaYoutube, FaBuilding, FaFax, FaMapMarkerAlt, FaShareAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { SiShopee } from "react-icons/si";
import { BsBagHeartFill } from "react-icons/bs";
import { useTranslation } from 'react-i18next';


function Contact() {
    const { t } = useTranslation();

    return (
        <>
            <div className="">
                <div className="py-3 flex flex-wrap">
                    <FaBuilding className="mt-[2px] mr-4" />
                    <p className="text-[#0079A9]">{t('contact.p1')}</p>
                </div>
                <div className="py-3 flex flex-wrap">
                    <FaPhoneAlt className="mt-[2px] mr-4" />
                    <p>
                        <span className="text-[#E2B22C] hover:text-[#0079A9]">081-697-7000</span>,
                        <span className="text-[#E2B22C] hover:text-[#0079A9]"> 081-694-5000</span>,
                        <span className="text-[#E2B22C] hover:text-[#0079A9]"> 095-961-9901</span>,
                        <span className="text-[#E2B22C] hover:text-[#0079A9]"> 098-426-6953</span>,
                        <span className="text-[#E2B22C] hover:text-[#0079A9]"> 089-660-9609</span>,
                        <span className="text-[#E2B22C] hover:text-[#0079A9]"> 094-695-5599</span>
                    </p>
                </div>
                {/* <div className="py-3 flex flex-wrap">
                    <FaFax className="mt-[2px] mr-4" />
                    <p>
                        <span className="text-[#E2B22C] hover:text-[#0079A9]">0-2922-2832</span>,
                        <span className="text-[#E2B22C] hover:text-[#0079A9]"> 0-2595-8518</span>
                    </p>
                </div> */}
                <div className="py-3 flex flex-wrap">
                    <MdMail className="mt-[2px] mr-4" />
                    <p><a href="mailto:janenyrilon_jingwei@hotmail.com" className="text-[#E2B22C] hover:text-[#0079A9]"> janenyrilon_jingwei@hotmail.com</a>,
                        <a href="mailto:worachart_soi@hotmail.com" className="text-[#E2B22C] hover:text-[#0079A9]"> worachart_soi@hotmail.com</a>,
                        <a href="mailto:worachartgroup@gmail.com" className="text-[#E2B22C] hover:text-[#0079A9]"> worachartgroup@gmail.com</a>
                    </p>
                </div>
                <div className="py-3 flex flex-wrap">
                    <FaGlobe className="mt-[2px] mr-4" />
                    <p>
                        <a href="https://www.rilonthailand.co.th/" className="text-[#E2B22C] hover:text-[#0079A9]">www.rilonthailand.co.th</a>,
                        <a href="https://www.rilonthailand.com/" className="text-[#E2B22C] hover:text-[#0079A9]"> www.rilonthailand.com</a>
                    </p>
                </div>
                <div className="py-3 flex flex-wrap">
                    <FaClock className="mt-[2px] mr-4" />
                    <p className="text-[#0079A9]">{t('contact.p2')}</p>
                </div>
                <div className="py-3 flex flex-wrap">
                    <FaMapMarkerAlt className="mt-[2px] mr-4" />
                    <p className="text-[#E2B22C] hover:text-[#0079A9]">13.872115747061208, 100.46261770286053</p>
                </div>

                <div className="py-3 pr-2 flex text-[16px] ">
                    <FaShareAlt className=" mt-1.5 mr-4" />
                    <a href="https://page.line.me/156vctty?openQrModal=true">
                        <div className="bg-[#02B92E] p-1.5 mr-2  text-white rounded-full hover:bg-[#49D249]">
                            <FaLine />
                        </div>
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61555700229121">
                        <div className="bg-[#1773EA] p-1.5 mr-2 text-white rounded-full hover:bg-[#5A9DF3]">
                            <FaFacebookF />
                        </div>
                    </a>
                    <a href="https://www.instagram.com/rilon_thailand/">
                        <div className="bg-[#BB5287] p-1.5 mr-2 text-white rounded-full hover:bg-[#E9768C]">
                            <FaInstagram />
                        </div>
                    </a>
                    <a href="https://www.youtube.com/@rilon_thailand">
                        <div className="bg-[#F60000] p-1.5 mr-2 text-white rounded-full hover:bg-[#FC4949]">
                            <FaYoutube />
                        </div>
                    </a>
                    <a href="https://www.rilonthailand.com/">
                        <div className="bg-[#15A2F2] p-1.5 mr-2 text-white rounded-full hover:bg-[#58A0D6]">
                            <FaGlobe />
                        </div>
                    </a>
                    <a href="https://www.lazada.co.th/shop/jw-jingweitip/?spm=a2o4m.pdp_revamp.seller.1.7ecf41f8hb1o3I&itemId=4370282627&channelSource=pdp">
                        <div className="bg-[#0F146D] p-1.5 mr-2 text-white rounded-full hover:bg-[#2424A8]">
                            <BsBagHeartFill />
                        </div>
                    </a>
                    <a href="https://shopee.co.th/wprachrt">
                        <div className="bg-[#F6402E] p-1.5 mr-2 text-white rounded-full hover:bg-[#FE6433]">
                            <SiShopee />
                        </div>
                    </a>
                </div >
            </div>
        </>
    )
}

export default Contact