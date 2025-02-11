import { useEffect, useRef } from 'react'
import Footer from '../components/Footer'
import CategorySearch from '../components/CategorySearch'
import RecommendProductList from '../components/homepage/RecommendProductList'
import YouTubeEmbed from '../components/homepage/YoutubeEmbed'
import Contact from '../components/Contact'
import QRcodeComponent from '../components/QRcodeComponent'
import CategoryList from '../components/homepage/CategoryList'
import { useScroll } from '../components/header/ScrollContext';
import { FaFacebookF, FaGlobe, FaInstagram, FaLine, FaPhoneAlt, FaYoutube, FaMapMarkerAlt } from "react-icons/fa";
import { MdBusinessCenter, MdMail } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { SiShopee } from "react-icons/si";
import { BsBagHeartFill } from "react-icons/bs";
import SliderTop from '../components/homepage/SliderTop';
import SliderRilon from '../components/homepage/SliderRilon';
import SliderJingweitip from '../components/homepage/SliderJingweitip';


function HomePage() {
    const { setSectionRefs } = useScroll();
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);
    const section4Ref = useRef(null);
    const { t } = useTranslation();

    useEffect(() => {
        setSectionRefs([section1Ref.current, section2Ref.current, section3Ref.current, section4Ref.current]);
    }, [setSectionRefs]);


    return (
        <>
            <div className="min-h-screen font-plex-sans-thai ">
                <SliderTop />
                <div className="px-[10%] 4xl:px-[20%] py-[20px] text-center text-white bg-[#FFD600]">
                    <h1 className="text-[34px] text-[#0079A9]">{t('homepage.h1')}</h1>
                </div>
                <div className="px-[10%] 4xl:px-[20%] py-[50px] aligns-center justify-center  ">
                    <div className="py-1 flex flex-wrap">
                        <FaPhoneAlt className="mt-[2px] mr-4" />
                        <p className="text-[#E2B22C] hover:text-[#0079A9]">08-1694-5000</p>,
                        <p className="text-[#E2B22C] hover:text-[#0079A9]">&nbsp;08-1697-7000</p>,
                        <p className="text-[#E2B22C] hover:text-[#0079A9]">&nbsp;09-5961-9901 </p>
                    </div>
                    <div className=" py-1 flex flex-wrap">
                        <MdMail className="mt-[2px] mr-4" />
                        <a className="text-[#E2B22C] hover:text-[#0079A9]" href="mailto:janenyrilon_jingwei@hotmail.com">janenyrilon_jingwei@hotmail.com</a>,
                        <a className="text-[#E2B22C] hover:text-[#0079A9]" href="mailto:worachart_soi@hotmail.com">&nbsp;worachart_soi@hotmail.com</a>,
                        <a className="text-[#E2B22C] hover:text-[#0079A9]" href="mailto:worachartgroup@gmail.com">&nbsp;worachartgroup@gmail.com</a>
                    </div>
                    <div className="py-1 flex flex-wrap">
                        <FaMapMarkerAlt className="mt-[2px] mr-4" />
                        <p>{t('homepage.address')}</p>
                    </div>

                    <div className="py-2 pr-2 flex text-[16px] ">
                        <a href="https://page.line.me/156vctty?openQrModal=true" className="bg-[#02B92E] p-1.5 mr-2  text-white rounded-full hover:bg-[#49D249]">
                            <FaLine />
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61555700229121" className="bg-[#1773EA] p-1.5 mr-2 text-white rounded-full hover:bg-[#5A9DF3]">
                            <FaFacebookF />
                        </a>
                        <a href="https://www.instagram.com/rilon_thailand/" className="bg-[#BB5287] p-1.5 mr-2 text-white rounded-full hover:bg-[#E9768C]">
                            <FaInstagram />
                        </a>
                        <a href="https://www.youtube.com/@rilon_thailand" className="bg-[#F60000] p-1.5 mr-2 text-white rounded-full hover:bg-[#FC4949]">
                            <FaYoutube />
                        </a>
                        <a href="https://www.rilon-riland.com/" className="bg-[#15A2F2] p-1.5 mr-2 text-white rounded-full hover:bg-[#58A0D6]">
                            <FaGlobe />
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
                </div >

                <div className="px-[10%] 4xl:px-[20%] text-center py-[100px] background bg-fixed bg-cover">
                    <div className="pb-[50px]">
                        <h1 className="text-[34px] text-[#FFD600]">
                            {t('homepage.h2')}
                        </h1>
                        <div className="h-[3px] w-[60px] text-center mx-[auto] bg-[#0079A9]" />
                    </div>
                    <div className="md:flex">
                        <div className="text-[#E2B22C] backdrop-blur-sm bg-[#EEE185]/10 z-0 py-4 px-[20px] my-[auto] md:w-[60%]">
                            <h1 className="text-[34px] py-6 ">
                                {t('homepage.h3')}
                            </h1>
                            <p className="text-[22px] text-[#F4D016] py-2">
                                {t('homepage.p1')}
                            </p>
                            <h2 className="text-[24px] text-[#F4D016] py-6 font-bold ">
                                {t('homepage.p2')}
                            </h2>
                        </div>
                        <div className="md:w-[40%] md:ml-[30px] mt-10 md:mt-0 flex justify-center items-center">
                            <img src="/images/page_images/logo.png" alt="logo" className=" transition-transform duration-300 ease-in-out transform hover:scale-110"></img>
                        </div>
                    </div>
                </div>

                <div className="md:flex justify-between items-center bg-[#FFD600] px-[10%] 4xl:px-[20%] text-center py-[50px]">
                    <div className="py-12 md:w-[30%]">
                        <h1 className="text-[28px]">DEALER</h1>
                        <img src='/images/page_images/Dealer.jpg' alt="dealer" className="mt-4 mb-6 mx-auto rounded-[50%] object-right overflow-hidden border-solid border-8 border-[#0079A9] w-96 h-96 md:w-64 md:h-64 2xl:w-96 2xl:h-96  object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"></img>
                        <p>{t('homepage.p3')}</p>
                    </div>
                    <div className="py-12 md:w-[30%]">
                        <h1 className="text-[28px]">HIGHER EFFICIENCY</h1>
                        <img src='/images/page_images/HighEfficiency.jpg' alt="efficiency" className="mt-4 mb-6 mx-auto rounded-[50%] object-center overflow-hidden border-solid border-8 border-[#0079A9] w-96 h-96 md:w-64 md:h-64 2xl:w-96 2xl:h-96 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"></img>
                        <p>{t('homepage.p4')}</p>
                    </div>
                    <div className="py-12 md:w-[30%]">
                        <h1 className="text-[28px]" >WARANTY SERVICE</h1>
                        <img src='/images/page_images/WarantyService.jpg' alt="service" className="mt-4 mb-6 mx-auto rounded-[50%]  overflow-hidden border-solid border-8 border-[#0079A9] w-96 h-96 md:w-64 md:h-64 2xl:w-96 2xl:h-96 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"></img>
                        <p>{t('homepage.p5')}</p>
                    </div>
                </div>

                <div className="px-[10%] 4xl:px-[20%] py-[100px] text-center ">
                    <div>
                        <h1 className="text-[30px]">
                            {t('homepage.h5')}
                        </h1>
                        <div className="h-[3px] w-[60px] text-center mx-[auto] bg-[#0079A9]" />
                        <p className='py-[40px] 4xl:px-[20%]'>
                            {t('homepage.p6')}
                        </p>
                        <YouTubeEmbed />
                    </div>
                </div>


                <div className="px-[10%] 4xl:px-[20%] py-[70px] bg-[#0079A9] md:flex md:justify-between md:items-center">
                    <div className="md:w-[50%] px-4">
                        <h1 className="py-6 text-[30px] text-center text-[#FFD600] font-bold">
                            {t('homepage.h8')}
                        </h1>
                        <p className="py-4 text-center text-white">
                            {t('homepage.p7')}
                        </p>
                    </div>
                    <div className="md:w-[47%]">
                        <img src='/images/page_images/RilonTH02.png' alt="yellowrilon"></img>
                    </div>
                </div>

                <div className="px-[10%] 4xl:px-[20%] py-[100px] bg-[#FFD600]">
                    <div className="pb-4 text-center">
                        <h1 className="text-[34px]">
                            {t('homepage.h9')}
                        </h1>
                        <div className="text-[#E2B22C] h-[3px] w-[60px] text-center mx-[auto] bg-[#0079A9]" />
                    </div>
                    <p className="text-center py-[20px] 4xl:px-[20%]">{t('homepage.p8')}</p>
                </div>

                <div className="mx-[10%] 4xl:mx-[20%] pt-[100px] pb-[50px]">
                    <div className="text-center 4xl:px-[20%]">
                        <p className="text-[30px] text-center">{t('homepage.h10')}</p>
                        <div className="text-[#E2B22C] h-[3px] w-[60px] text-center mx-[auto] bg-[#0079A9]" />
                    </div>

                    <div className="py-[30px] 4xl:px-[20%] ">
                        <div className="py-[10px]">
                            <p className="font-bold py-2">{t('homepage.h11')}</p>
                            <ul class="list-disc pl-6 space-y-2 py-2">
                                <li>{t('homepage.p10')}</li>
                                <li>{t('homepage.p11')}</li>
                            </ul>
                        </div>
                        <div className="py-[10px]">
                            <p className="font-bold py-2">{t('homepage.p9')}</p>
                            <ul class="list-disc pl-6 space-y-2 py-2">
                                <li>{t('homepage.p12')}</li>
                            </ul>
                        </div>
                        <div className="py-[10px]">
                            <p className="font-bold py-2">{t('homepage.h12')}</p>
                            <ul class="list-disc pl-6 space-y-2 py-2">
                                <li>{t('homepage.p13')}</li>
                            </ul>
                        </div>
                        <div className="py-[10px]">
                            <p className="font-bold py-2">{t('homepage.h13')}</p>
                            <ul class="list-disc pl-6 space-y-2 py-2">
                                <li>{t('homepage.p14')}</li>
                            </ul>

                        </div>
                    </div>
                    <SliderRilon />
                </div>

                <div className="mx-[10%] 4xl:mx-[20%] relative overflow-hidden pt-[50px] pb-[100px]">
                    <div className="text-center 4xl:px-[20%]">
                        <h1 className="text-[30px]">
                            {t('homepage.h14')}
                        </h1>
                        <div className="text-[#E2B22C] h-[3px] w-[60px] text-center mx-[auto] bg-[#0079A9]" />
                        <p className="py-[30px]">
                            {t('homepage.p16')}
                        </p>
                    </div>
                    <SliderJingweitip />

                    <p className="py-[50px] text-center 4xl:px-[20%]">
                        {t('homepage.p15')}
                    </p>
                </div>

                <div className="text-center w-[100%] 4xl:px-[20%] py-[100px] flex justify-center md:justify-end md:items-center background2 bg-fixed bg-cover">
                    <div className="bg-black w-[60%] md:w-[40%] py-[50px] px-[20px] ">
                        <a href="https://anyflip.com/uggut/ubmb/" className="text-[30px] font-bold text-white hover:text-[#EA100F]">{t('homepage.h15')}</a>
                        <div className="flex items-center justify-center pt-[20px]">
                            <a href="https://anyflip.com/uggut/ubmb/">
                                <img
                                    src="/images/page_images/Book.png"
                                    alt="book"
                                    className="w-[350px] 2xl:w-[450px] border-4 border-transparent hover:border-red-500 transition-all duration-300"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="4xl:px-[20%] text-center py-[100px]">
                    <p className="py-10 font-bold text-[20px]">{t('homepage.h16')}</p>
                    <div className="text-[#E4403C] pb-8 text-[17px]">
                        <p>{t('homepage.p17')}</p>
                        <p>{t('homepage.p18')}</p>
                        <p>{t('homepage.p19')}</p>
                        <p>{t('homepage.p20')}</p>
                    </div>
                    <div className="">
                        <QRcodeComponent />
                    </div>

                    <h1 className="pt-4 text-[30px]">
                        {t('homepage.h4')}
                    </h1>
                    <div className="h-[4px] w-[60px] text-center mx-[auto] bg-[#0079A9]" />

                    <div ref={section1Ref} className="flex justify-center items-center">
                        <img src='/images/page_images/Line3pic.png' alt="line" className="py-4 item-center xl:max-w-[1200px]"></img>
                    </div>


                    <div className="pt-4 pb-14">
                        <p className="text-[#FF0042] text-[20px] py-[20px]">{t('homepage.h6')}</p>
                        <div className="flex justify-center items-center pt-[10px]">
                            <img src='/images/page_images/QRcode.png' alt="qrcode" className="w-[200px]"></img>
                        </div>
                        <p className="text-[#FF0042] text-[20px] pt-[30px] py-[10px]">{t('homepage.h7')}</p>
                        <a href="https://page.line.me/156vctty?openQrModal=true" className="flex justify-center items-center">
                            <img src='/images/page_images/AddLine.png' alt="addline" className="w-[200px] xl:max-w-[1200px]"></img>
                        </a>
                    </div>


                </div>

                <div ref={section2Ref} className="">
                    <CategoryList />
                    <CategorySearch />
                </div>

                <div ref={section3Ref}>
                    <RecommendProductList />
                </div>

                <div className="bg-[#FFD600] md:flex px-[10%] 4xl:px-[20%] py-[100px] md:justify-between ">
                    <div className="bg-white mb-10 md:mb-0 md:w-[30%] overflow-hidden" >
                        <img src='/images/page_images/WeldingMC.png' alt="weldingMC" className="w-[100%] transition-transform duration-300 ease-in-out transform hover:scale-110"></img>
                        <h1 className="text-[20px] text-center p-4 text-[#0079A9]">{t('homepage.h18')}</h1>
                        <p className="px-4 pb-8">{t('homepage.p21')}</p>
                    </div>
                    <div className="bg-white mb-10 md:mb-0 md:w-[30%] overflow-hidden">
                        <img src='/images/page_images/TorchSerPana.png' alt="torchserpana" className="w-[100%] transition-transform duration-300 ease-in-out transform hover:scale-110"></img>
                        <h1 className="text-[20px] text-center p-4 text-[#0079A9]">{t('homepage.h19')}</h1>
                        <p className="px-4 pb-8">{t('homepage.p22')}</p>
                    </div>
                    <div className="bg-white md:w-[30%] overflow-hidden">
                        <img src='/images/page_images/Robot.png' alt="robot" className="w-[100%] transition-transform duration-300 ease-in-out transform hover:scale-110"></img>
                        <h1 className="text-[20px] text-center p-4 text-[#0079A9]">{t('homepage.h20')}</h1>
                        <p className="px-4 pb-8">{t('homepage.p23')}</p>
                    </div>
                </div>

                <div ref={section4Ref} className="xl:py-[100px] 4xl:px-[20%] xl:px-[10%] xl:flex xl:justify-between">
                    <div className="xl:w-[50%] px-[10%] py-[50px] xl:p-[0%]">
                        <div className="py-3 flex flex-wrap">
                            <MdBusinessCenter className="mt-[2px] mr-4" />
                            <p>{t('homepage.p24')}</p>
                        </div>
                        <Contact />
                    </div>
                    <div className="mx-[auto] my-[auto] w-[100%] xl:w-[45%]" >
                        <iframe className="w-[100%] h-[500px]" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15493.791027039693!2d100.4626156!3d13.8721544!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29aca882d796f%3A0xed3662f97b98ac95!2sRILON!5e0!3m2!1sth!2sth!4v1679737367033!5m2!1sth!2sth" title="google map" ></iframe>
                        {/* <button className="bg-[#E2B22C] text-white py-1 px-6 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">นำทาง</button> */}
                    </div>
                </div>
                <Footer />
            </div >
        </>
    )
}

export default HomePage