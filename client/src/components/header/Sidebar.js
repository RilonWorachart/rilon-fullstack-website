import { useState } from 'react'
import { FaSortDown } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { useScroll } from './ScrollContext.js';
import i18next from "i18next";
import { useTranslation } from 'react-i18next';


function Sidebar({ setIsActiveSidebar, selectedLang, selectedPic, setSelectedLang, setSelectedPic }) {
    const { navigateAndScroll } = useScroll();
    const { t } = useTranslation();

    const handleChangeLanguage = (language) => {
        i18next.changeLanguage(language);
    };

    const handleSelectSidebar = (fulllang, pic, lang) => {
        setSelectedLang(fulllang);
        setSelectedPic(pic)
        setIsActiveLangSidebar(false)
        handleChangeLanguage(lang)
    }

    const handleSidebar = (num) => {
        navigateAndScroll(num)
        setIsActiveSidebar(false)
    }


    const [isActiveLangSidebar, setIsActiveLangSidebar] = useState(false)


    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50 z-40" style={{ right: '280px' }}></div>
            <div className="fixed right-0 top-0 h-full text-white bg-[#E2B22C] w-[280px] z-70">
                <button
                    onClick={() => setIsActiveSidebar(false)}
                    className="absolute top-4 right-4 text-2xl font-bold hover:text-[#00007E]"
                >
                    &times;
                </button>
                <div className="flex flex-col items-center justify-center space-y-4 h-[100%] text-[18px]">
                    <Link to="/">
                        <div
                            className="hover:text-[#00007E]"
                            onClick={() => {
                                setIsActiveSidebar(false)
                            }}
                        >
                            <button>{t('header.homepage')}</button>
                        </div>
                    </Link>
                    <div
                        className="hover:text-[#00007E]"
                        onClick={() => {
                            handleSidebar(0)
                        }}
                    >
                        <button>{t('header.aboutme')}</button>
                    </div>
                    <div
                        className="hover:text-[#00007E]"
                        onClick={() => {
                            handleSidebar(1)
                        }}
                    >
                        <button>{t('header.catelog')}</button>
                    </div>
                    <div
                        className="hover:text-[#00007E]"
                        onClick={() => {
                            handleSidebar(2)
                        }}
                    >
                        <button>{t('header.recommend')}</button>
                    </div>
                    <div
                        className="hover:text-[#00007E]"
                        onClick={() => {
                            handleSidebar(3)
                        }}
                    >
                        <button>{t('header.contactus')}</button>
                    </div>


                    <div className="w-[100%] flex justify-center items-center" onMouseEnter={() => setIsActiveLangSidebar(true)} onMouseLeave={() => setIsActiveLangSidebar(false)}>
                        <div className="relative">
                            <div className="flex text-white hover:text-[#00007E]">
                                <img
                                    src={selectedPic}
                                    alt="Selected Flag"
                                    className="w-6 h-4 mr-1.5"
                                />
                                <p>{selectedLang}</p>
                                <FaSortDown />
                            </div>
                            {
                                isActiveLangSidebar && (
                                    <div className="absolute top-0 mt-0 z-50">
                                        <div className="mt-10 w-[160px] bg-white text-[#E2B22C] shadow-2xl">
                                            <div
                                                className="flex items-center p-2 cursor-pointer hover:text-[#00007E]"
                                                onClick={() =>
                                                    handleSelectSidebar('Thai', 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg','th')
                                                }
                                            >
                                                <img
                                                    src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg"
                                                    alt="THA Flag"
                                                    className="w-6 h-4 mr-1.5"
                                                />
                                                {t('header.langth')}
                                            </div>

                                           
                                            <div
                                                className="flex items-center p-2 cursor-pointer hover:text-[#00007E]"
                                                onClick={() => handleSelectSidebar('English', 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/800px-Flag_of_the_United_Kingdom.svg.png','en')}
                                            >
                                                <img
                                                    src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/800px-Flag_of_the_United_Kingdom.svg.png"
                                                    alt="UK Flag"
                                                    className="w-6 h-4 mr-1.5"
                                                />
                                                {t('header.langeng')}
                                            </div>
                                        </div>

                                    </div>

                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar