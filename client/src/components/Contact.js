import React from 'react'
import { FaFacebookF, FaGlobe, FaInstagram, FaLine, FaPhoneAlt, FaYoutube, FaBuilding, FaMapMarkerAlt, FaShareAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { SiShopee } from "react-icons/si";
import { BsBagHeartFill } from "react-icons/bs";
import { useTranslation } from 'react-i18next';


function Contact() {
    const { t } = useTranslation();

    return (
        <>
            <div className="overflow-hidden">
                <div className="py-3 flex justify-start items-center">
                    <FaBuilding className="mr-4 min-w-[25px]" />
                    <p className="text-[#0079A9]">{t('contact.p1')}</p>
                </div>
                <div className="py-3 flex justify-start items-center">
                    <FaPhoneAlt className="mr-4 min-w-[25px]" />
                    <div className="flex flex-wrap">
                        <span className="text-[#E2B22C] hover:text-[#0079A9]">081-697-7000</span>,
                        <span className="text-[#E2B22C] hover:text-[#0079A9]">&nbsp;081-694-5000</span>,
                        <span className="text-[#E2B22C] hover:text-[#0079A9]">&nbsp;095-961-9901</span>,
                        <span className="text-[#E2B22C] hover:text-[#0079A9]">&nbsp;098-426-6953</span>,
                        <span className="text-[#E2B22C] hover:text-[#0079A9]">&nbsp;089-660-9609</span>,
                        <span className="text-[#E2B22C] hover:text-[#0079A9]">&nbsp;094-695-5599</span>
                    </div>
                </div>
                {/* <div className="py-3 flex justify-start items-center">
                    <FaFax className="mr-4 min-w-[25px]" />
                    <div className="flex flex-wrap">
                        <span className="text-[#E2B22C] hover:text-[#0079A9]">0-2922-2832</span>,
                        <span className="text-[#E2B22C] hover:text-[#0079A9]"> 0-2595-8518</span>
                    </div>
                </div> */}
                <div className="py-3 flex justify-start items-center">
                    <MdMail className="mr-4 min-w-[25px]" />
                    <div className="flex flex-wrap">
                        <a href="mailto:janenyrilon_jingwei@hotmail.com" className="text-[#E2B22C] hover:text-[#0079A9]"> janenyrilon_jingwei@hotmail.com</a>,
                        <a href="mailto:worachart_soi@hotmail.com" className="text-[#E2B22C] hover:text-[#0079A9]">&nbsp;worachart_soi@hotmail.com</a>,
                        <a href="mailto:worachartgroup@gmail.com" className="text-[#E2B22C] hover:text-[#0079A9]">&nbsp;worachartgroup@gmail.com</a>
                    </div>
                </div>
                <div className="py-3 flex justify-start items-center">
                    <FaGlobe className="mr-4 min-w-[25px]" />
                    <div className="flex flex-wrap">
                        <a href="https://www.rilonthailand.co.th/" className="text-[#E2B22C] hover:text-[#0079A9]">www.rilonthailand.co.th</a>,
                        <a href="https://www.rilonthailand.com/" className="text-[#E2B22C] hover:text-[#0079A9]">&nbsp;www.rilonthailand.com</a>
                    </div>
                </div>
                <div className="py-3 flex justify-start items-center">
                    <FaClock className="mr-4 min-w-[25px]" />
                    <p className="text-[#0079A9]">{t('contact.p2')}</p>
                </div>
                <div className="py-3 flex justify-start items-center">
                    <FaMapMarkerAlt className="mr-4 min-w-[25px]" />
                    <p className="text-[#E2B22C] hover:text-[#0079A9]">13.872115747061208, 100.46261770286053</p>
                </div>

                <div className="py-3 pr-2 flex  justify-start items-center text-[16px] ">
                    <FaShareAlt className="mr-4 min-w-[25px]" />
                    <div className="flex flex-wrap">
                        <a className="mr-2 my-1" href="https://page.line.me/156vctty?openQrModal=true">
                            <div className="bg-[#02B92E] p-1.5 text-white rounded-full hover:bg-[#49D249]">
                                <FaLine />
                            </div>
                        </a>
                        <a className="mr-2 my-1" href="https://www.facebook.com/profile.php?id=61555700229121">
                            <div className="bg-[#1773EA] p-1.5 text-white rounded-full hover:bg-[#5A9DF3]">
                                <FaFacebookF />
                            </div>
                        </a>
                        <a className="mr-2 my-1" href="https://www.instagram.com/rilon_thailand/">
                            <div className="bg-[#BB5287] p-1.5 text-white rounded-full hover:bg-[#E9768C]">
                                <FaInstagram />
                            </div>
                        </a>
                        <a className="mr-2 my-1" href="https://www.youtube.com/@rilon_thailand">
                            <div className="bg-[#F60000] p-1.5 text-white rounded-full hover:bg-[#FC4949]">
                                <FaYoutube />
                            </div>
                        </a>
                        <a className="mr-2 my-1" href="https://www.rilonthailand.com/">
                            <div className="bg-[#15A2F2] p-1.5 text-white rounded-full hover:bg-[#58A0D6]">
                                <FaGlobe />
                            </div>
                        </a>
                        <a className="mr-2 my-1" href="https://www.lazada.co.th/shop/jw-jingweitip/?spm=a2o4m.pdp_revamp.seller.1.7ecf41f8hb1o3I&itemId=4370282627&channelSource=pdp">
                            <div className="bg-[#0F146D] p-1.5 text-white rounded-full hover:bg-[#2424A8]">
                                <BsBagHeartFill />
                            </div>
                        </a>
                        <a className="mr-2 my-1" href="https://shopee.co.th/wprachrt">
                            <div className="bg-[#F6402E] p-1.5 text-white rounded-full hover:bg-[#FE6433]">
                                <SiShopee />
                            </div>
                        </a>
                    </div>
                </div >
            </div>
        </>
    )
}

export default Contact