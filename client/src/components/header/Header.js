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
    <div className="font-plex-sans-thai bg-[#FFD600] px-[10%] py-[13px] flex items-center justify-between text-[#0079A9] fixed w-full top-0 left-0 z-50">
      <div className="w-[20%]">
        <Link to="/">
          <img src='/images/page_images/logo-w.png' alt="logo" className="w-[60px] h-[45px]"></img>
        </Link>
      </div>


      <div className="px-2 py-2 hidden xl:flex lg:items-between lg:justify-between w-[60%] max-w-[600px]">
        <Link to="/">
          <div className={`border-b-2 hover:border-b-2 hover:border-[#3AB4F3] ${toggleMenu === "home" ? "border-[#3AB4F3] text-[#3AB4F3]" : "border-[#FFD600]"}`} onClick={() => setToggleMenu("home")}>
            <button className="" >{t('header.homepage')}</button>
          </div>
        </Link>
        <div className={`border-b-2 hover:border-b-2 hover:border-[#0079A9] ${toggleMenu === "aboutus" ? "border-[#3AB4F3] text-[#3AB4F3]" : "border-[#FFD600]"}`} onClick={() => setToggleMenu("aboutus")}>
          <button className="" onClick={() => navigateAndScroll(0)}>{t('header.aboutme')}</button>
        </div>
        <div className={`border-b-2 hover:border-b-2 hover:border-[#0079A9] ${toggleMenu === "catelog" ? "border-[#3AB4F3] text-[#3AB4F3]" : "border-[#FFD600]"}`} onClick={() => setToggleMenu("catelog")}>
          <button className="" onClick={() => navigateAndScroll(1)}>{t('header.catelog')}</button>
        </div>
        <div className={`border-b-2 hover:border-b-2 hover:border-[#0079A9] ${toggleMenu === "recommend" ? "border-[#3AB4F3] text-[#3AB4F3]" : "border-[#FFD600]"}`} onClick={() => setToggleMenu("recommend")}>
          <button className="" onClick={() => navigateAndScroll(2)}>{t('header.recommend')}</button>
        </div>
          <div className={`border-b-2 hover:border-b-2 hover:border-[#0079A9] ${toggleMenu === "contactus" ? "border-[#3AB4F3] text-[#3AB4F3]" : "border-[#FFD600]"}`} onClick={() => setToggleMenu("contactus")}>
            <button className="" onClick={() => navigateAndScroll(3)}>{t('header.contactus')}</button>
          </div>
        <Link to="/requestform">
          <div className={`border-b-2 hover:border-b-2 hover:border-[#0079A9] ${toggleMenu === "moreinfo" ? "border-[#3AB4F3] text-[#3AB4F3]" : "border-[#FFD600]"}`} onClick={() => setToggleMenu("moreinfo")}>
            <button className="" >{t('header.moreinfo')}</button>
          </div>
        </Link>
      </div>

      <div className="w-[20%] justify-end" onMouseEnter={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)}>
        <div className="relative">
          <div className="hidden xl:flex justify-end text-[#0079A9] hover:text-[#0079A9]">
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
                    className="flex items-center p-2 cursor-pointer text-[#0079A9] hover:text-[#3AB4F3]"
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
                    className="flex items-center p-2 cursor-pointer text-[#0079A9] hover:text-[#3AB4F3]"
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

      <div className="text-black text-[20px] hover:cursor-pointer xl:hidden">
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