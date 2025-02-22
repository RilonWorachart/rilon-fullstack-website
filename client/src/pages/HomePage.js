import { useEffect } from 'react'
import Footer from '../components/Footer'
import CategorySearch from '../components/CategorySearch'
import RecommendProductList from '../components/homepage/RecommendProductList'
import Contact from '../components/Contact'
import QRcodeComponent from '../components/QRcodeComponent'
import CategoryList from '../components/homepage/CategoryList'
import LastAdvertise from '../components/homepage/LastAdvertise'
import Ebook from '../components/homepage/Ebook'
import Dealer from '../components/homepage/Dealer'
import Riloninverter from '../components/homepage/Riloninverter'
import SliderTop from '../components/homepage/SliderTop';
import SliderRilon from '../components/homepage/SliderRilon';
import SliderJingweitip from '../components/homepage/SliderJingweitip';
import About from '../components/homepage/About';
import Service from '../components/homepage/Service';
import Company from '../components/homepage/Company';
import Title from '../components/homepage/Title';
import { FaFacebookF, FaGlobe, FaInstagram, FaLine, FaPhoneAlt, FaYoutube, FaMapMarkerAlt } from "react-icons/fa";
import { MdBusinessCenter, MdMail } from "react-icons/md";
import { SiShopee } from "react-icons/si";
import { BsBagHeartFill } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom'



function HomePage() {
    const { t } = useTranslation();
    const location = useLocation();

    // Function to scroll to the target element based on the hash
    const scrollToTarget = (targetId) => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            // Adjusting for fixed header by adding an offset (for example, 100px)
            const headerOffset = 50; // Adjust this value based on your header height
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const hash = location.hash.substring(1); // Get hash without '#'
        if (hash) {
            // Wait for the page layout to be ready and then scroll
            setTimeout(() => {
                scrollToTarget(hash);
            }, 100); // Slight delay to ensure content is loaded
        }
    }, [location]); // Re-run when the location (including hash) changes


    return (
        <>
            <div className="min-h-screen font-plex-sans-thai ">
                <SliderTop />
                <Title />
                <div className="px-[10%] 4xl:px-[20%] py-[50px] aligns-center justify-center  ">
                    <div className="py-1 flex flex-wrap">
                        <FaPhoneAlt className="mt-[2px] mr-4" />
                        <p className="text-[#E2B22C] hover:text-[#0079A9]">08-1697-7000 (office)</p>,
                        <p className="text-[#E2B22C] hover:text-[#0079A9]">&nbsp;08-1694-5000</p>,
                        <p className="text-[#E2B22C] hover:text-[#0079A9]">&nbsp;09-5961-9901 </p>,
                        <p className="text-[#E2B22C] hover:text-[#0079A9]">&nbsp;098-426-6953</p>,
                        <p className="text-[#E2B22C] hover:text-[#0079A9]">&nbsp;089-660-9609</p>,
                        <p className="text-[#E2B22C] hover:text-[#0079A9]">&nbsp;094-695-5599</p>
                    </div>
                    <div className=" py-1 flex flex-wrap">
                        <MdMail className="mt-[2px] mr-4" />
                        <a className="text-[#E2B22C] hover:text-[#0079A9]" href="mailto:janenyrilon_jingwei@hotmail.com">janenyrilon_jingwei@hotmail.com</a>,
                        <a className="text-[#E2B22C] hover:text-[#0079A9]" href="mailto:worachart_soi@hotmail.com">&nbsp;worachart_soi@hotmail.com</a>,
                        <a className="text-[#E2B22C] hover:text-[#0079A9]" href="mailto:worachartgroup@gmail.com">&nbsp;worachartgroup@gmail.com</a>
                    </div>
                    <div className="py-1 flex flex-wrap">
                        <FaMapMarkerAlt className="mt-[2px] mr-4" />
                        <p className="text-[#0079A9]">{t('homepage.address')}</p>
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
                        <a href="https://www.rilonthailand.com/" className="bg-[#15A2F2] p-1.5 mr-2 text-white rounded-full hover:bg-[#58A0D6]">
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

                <div id="target2"></div>
                <CategoryList />

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 100 1440 120"><path fill="#ECF4F7" fill-opacity="1" d="M0,128L120,144C240,160,480,192,720,192C960,192,1200,160,1320,144L1440,128L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg>
                <CategorySearch />


                <div id="target3"></div>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 20 1440 100"><path fill="#0079A9" fill-opacity="1" d="M0,64L120,58.7C240,53,480,43,720,48C960,53,1200,75,1320,85.3L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
                <RecommendProductList />

                <Dealer />

                <Company />


                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 170" class="w-full h-auto">
                    <path fill="#FFD600" fill-opacity="1" d="M0,160L120,154.7C240,149,480,139,720,122.7C960,107,1200,85,1320,74.7L1440,64L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
                </svg>

                <div id="target1"></div>
                <About />

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 170"><path fill="#0079A9" fill-opacity="1" d="M0,32L120,32C240,32,480,32,720,48C960,64,1200,96,1320,112L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>

                <Riloninverter />

                <div className="bg-[#0079A9] py-[0px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 222"><path fill="#FFD600" fill-opacity="1" d="M0,192L120,186.7C240,181,480,171,720,144C960,117,1200,75,1320,53.3L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
                </div>

                <Service />

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 50 1440 220"><path fill="#FFD600" fill-opacity="1" d="M0,128L120,122.7C240,117,480,107,720,128C960,149,1200,203,1320,229.3L1440,256L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg>

                <div className="mx-[10%] 4xl:mx-[20%] pt-[50px] pb-[50px]">
                    <div className="text-center 4xl:px-[20%]">
                        <p className="text-[30px] text-center ">{t('homepage.h10')}</p>
                        <div className="text-[#E2B22C] h-[3px] w-[60px] text-center mx-[auto] bg-[#0079A9]" />
                    </div>

                    <div className="py-[30px] 4xl:px-[20%] ">
                        <div className="py-[10px]">
                            <p className="font-bold py-2 text-[#0079A9]">{t('homepage.h11')}</p>
                            <ul class="list-disc pl-6 space-y-2 py-2">
                                <li>{t('homepage.p10')}</li>
                                <li>{t('homepage.p11')}</li>
                            </ul>
                        </div>
                        <div className="py-[10px]">
                            <p className="font-bold py-2 text-[#0079A9]">{t('homepage.p9')}</p>
                            <ul class="list-disc pl-6 space-y-2 py-2">
                                <li>{t('homepage.p12')}</li>
                            </ul>
                        </div>
                        <div className="py-[10px]">
                            <p className="font-bold py-2 text-[#0079A9]">{t('homepage.h12')}</p>
                            <ul class="list-disc pl-6 space-y-2 py-2">
                                <li>{t('homepage.p13')}</li>
                            </ul>
                        </div>
                        <div className="py-[10px]">
                            <p className="font-bold py-2 text-[#0079A9]">{t('homepage.h13')}</p>
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
                        <p className="py-[40px]">
                            {t('homepage.p16')}
                        </p>
                    </div>
                    <SliderJingweitip />
                    <p className="pt-[60px] text-center 4xl:px-[20%]">
                        {t('homepage.p15')}
                    </p>
                </div>

                <Ebook />

                <div className="4xl:px-[20%] text-center py-[100px]">
                    <h1 className="text-[30px]">
                        {t('homepage.h4')}
                    </h1>
                    <div className="h-[4px] w-[60px] text-center mx-[auto] bg-[#0079A9] mb-[40px]" />

                    <QRcodeComponent />
                </div>

                <LastAdvertise />


                <div id="target4"></div>

                <div className="xl:my-[100px] 4xl:px-[20%] xl:px-[10%] xl:flex xl:justify-between">
                    <div className="my-[50px] xl:my-[0px]  xl:w-[50%] px-[10%] xl:p-[0%]">
                        <div className="py-3 flex flex-wrap">
                            <MdBusinessCenter className="mt-[2px] mr-4" />
                            <p className="text-[#0079A9]">{t('homepage.p24')}</p>
                        </div>
                        <Contact />
                    </div>
                    <div className="mx-[auto] my-[auto] w-[100%] xl:w-[45%]" >
                        <iframe className="w-[100%] h-[500px]" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15493.791027039693!2d100.4626156!3d13.8721544!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29aca882d796f%3A0xed3662f97b98ac95!2sRILON!5e0!3m2!1sth!2sth!4v1679737367033!5m2!1sth!2sth" title="google map" ></iframe>
                    </div>
                </div>
                <Footer />
            </div >
        </>
    )
}

export default HomePage