import React, { useState } from 'react'
import { useScroll } from './ScrollContext.js';
import { Link } from 'react-router-dom'
import { FaSortDown } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
// import LanguageSwitcher from './LanguageSwitcher.js';
import Sidebar from './Sidebar.js';
import { useTranslation } from 'react-i18next';

function Header() {
  const { navigateAndScroll } = useScroll();
  const { t, i18n } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  const [isActiveSidebar, setIsActiveSidebar] = useState(false);
  const [toggleMenu, setToggleMenu] = useState("home");

  // Language settings (optional, can be removed if only using i18n)
  const [selectedLang, setSelectedLang] = useState(t('Thai'));
  const [selectedPic, setSelectedPic] = useState('https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg');

  // Handle language change
  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const handleSelect = (fulllang, pic, lang) => {
    setSelectedLang(fulllang);
    setSelectedPic(pic);
    handleChangeLanguage(lang);
    setIsActive(false);
  };

  return (
    <div className="font-plex-sans-thai px-3 md:px-24 py-3 flex items-center justify-between text-[#E2B22C] fixed w-full top-0 left-0 bg-white z-50">
      <div className="w-[20%]">
        <Link to="/">
          <img src='/images/page_images/logo-w.png' alt="logo" className="w-[60px] h-[45px]"></img>
        </Link>
      </div>


      <div className="px-2 py-2 hidden lg:flex lg:items-between lg:justify-between w-[50%] max-w-[500px] ">
        <Link to="/">
          <div className={`border-b-2 hover:text-[#00007E] hover:border-b-2 hover:border-[#E2B22C] ${toggleMenu === "home" ? "border-[#E2B22C]" : "border-white"}`} onClick={() => setToggleMenu("home")}>
            <button className="hover:text-[#00007E]" >{t('header.homepage')}</button>
          </div>
        </Link>
        <div className={`border-b-2 hover:text-[#00007E] hover:border-b-2 hover:border-[#E2B22C] ${toggleMenu === "aboutus" ? "border-[#E2B22C]" : "border-white"}`} onClick={() => setToggleMenu("aboutus")}>
          <button className="hover:text-[#00007E]" onClick={() => navigateAndScroll(0)}>{t('header.aboutme')}</button>
        </div>
        <div className={`border-b-2 hover:text-[#00007E] hover:border-b-2 hover:border-[#E2B22C] ${toggleMenu === "catelog" ? "border-[#E2B22C]" : "border-white"}`} onClick={() => setToggleMenu("catelog")}>
          <button className="hover:text-[#00007E]" onClick={() => navigateAndScroll(1)}>{t('header.catelog')}</button>
        </div>
        <div className={`border-b-2 hover:text-[#00007E] hover:border-b-2 hover:border-[#E2B22C] ${toggleMenu === "recommend" ? "border-[#E2B22C]" : "border-white"}`} onClick={() => setToggleMenu("recommend")}>
          <button className="hover:text-[#00007E]" onClick={() => navigateAndScroll(2)}>{t('header.recommend')}</button>
        </div>
        <div className={`border-b-2 hover:text-[#00007E] hover:border-b-2 hover:border-[#E2B22C] ${toggleMenu === "contactus" ? "border-[#E2B22C]" : "border-white"}`} onClick={() => setToggleMenu("contactus")}>
          <button className="hover:text-[#00007E]" onClick={() => navigateAndScroll(3)}>{t('header.contactus')}</button>
        </div>
      </div>

      <div className="w-[20%] justify-end" onMouseEnter={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)}>
        <div className="relative">
          <div className="hidden lg:flex justify-end text-[#E2B22C] hover:text-[#00007E]">
            <img
              src={selectedPic}
              alt="Selected Flag"
              className="w-6 h-4 mr-1.5"
            />
            <p>{selectedLang}</p>
            <FaSortDown />
          </div>
          {
            isActive && (
              <div className="absolute top-0 mt-0 right-[0px] z-50" onMouseEnter={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)}>
                <div className="mt-10 w-[160px] bg-white shadow-2xl">
                  <div
                    className="flex items-center p-2 cursor-pointer hover:text-[#00007E]"
                    onClick={() => handleSelect('Thai', 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg', 'th')}
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
                    onClick={() => handleSelect('English', 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/800px-Flag_of_the_United_Kingdom.svg.png', 'en')}
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

      <div className="text-black text-[20px] hover:cursor-pointer lg:hidden">
        <GiHamburgerMenu onClick={() => setIsActiveSidebar(true)} className="text-[#E2B22C]" />
        {isActiveSidebar && (
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-40" style={{ right: '280px' }}></div>
            <Sidebar setIsActiveSidebar={setIsActiveSidebar} selectedLang={selectedLang} selectedPic={selectedPic} setSelectedLang={setSelectedLang} setSelectedPic={setSelectedPic} />
          </>
        )}

      </div>
    </div>


  )
}

export default Header