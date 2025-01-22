import React from 'react'
import { FaFacebookF, FaGlobe, FaInstagram, FaLine, FaPhoneAlt, FaYoutube, FaBuilding, FaFax, FaMapMarkerAlt, FaShareAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { useTranslation } from 'react-i18next';


function Contact() {
    const { t } = useTranslation();

    return (
        <>
            <div className="">
                <div className="py-3 flex flex-wrap">
                    <FaBuilding className="mt-[2px] mr-4" />
                    <p>{t('contact.p1')}</p>
                </div>
                <div className="py-3 flex flex-wrap">
                    <FaPhoneAlt className="mt-[2px] mr-4" />
                    <p>
                        <span className="text-[#E2B22C] hover:text-[#00007E]">08-1694-5000</span>,
                        <span className="text-[#E2B22C] hover:text-[#00007E]"> 08-1697-7000</span>,
                        <span className="text-[#E2B22C] hover:text-[#00007E]"> 09-5961-9901</span>
                    </p>
                </div>
                <div className="py-3 flex flex-wrap">
                    <FaFax className="mt-[2px] mr-4" />
                    <p>
                        <span className="text-[#E2B22C] hover:text-[#00007E]">0-2922-2832</span>,
                        <span className="text-[#E2B22C] hover:text-[#00007E]"> 0-2595-8518</span>
                    </p>
                </div>
                <div className="py-3 flex flex-wrap">
                    <MdMail className="mt-[2px] mr-4" />
                    <p><a href="mailto:janenyrilon_jingwei@hotmail.com" className="text-[#E2B22C] hover:text-[#00007E]"> janenyrilon_jingwei@hotmail.com</a>,
                        <a href="mailto:worachart_soi@hotmail.com" className="text-[#E2B22C] hover:text-[#00007E]"> worachart_soi@hotmail.com</a>,
                        <a href="mailto:worachartgroup@gmail.com" className="text-[#E2B22C] hover:text-[#00007E]"> worachartgroup@gmail.com</a>
                    </p>
                </div>
                <div className="py-3 flex flex-wrap">
                    <FaGlobe className="mt-[2px] mr-4" />
                    <p>
                        <a href="https://www.rilon-riland.com/" className="text-[#E2B22C] hover:text-[#00007E]">www.rilon-riland.com</a>,
                        <a href="https://rilon-welding.yellowpages.co.th" className="text-[#E2B22C] hover:text-[#00007E]"> https://rilon-welding.yellowpages.co.th</a>
                    </p>
                </div>
                <div className="py-3 flex flex-wrap">
                    <FaClock className="mt-[2px] mr-4" />
                    <p>{t('contact.p2')}</p>
                </div>
                <div className="py-3 flex flex-wrap">
                    <FaMapMarkerAlt className="mt-[2px] mr-4" />
                    <p className="text-[#E2B22C] hover:text-[#00007E]">13.872115747061208, 100.46261770286053</p>
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
                    <a href="https://www.rilon-riland.com/">
                        <div className="bg-[#15A2F2] p-1.5 mr-2 text-white rounded-full hover:bg-[#58A0D6]">
                            <FaGlobe />
                        </div>
                    </a>
                </div >
            </div>
        </>
    )
}

export default Contact