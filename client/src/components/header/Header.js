import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaSortDown } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from './Sidebar.js';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t, i18n } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  const [isActiveSidebar, setIsActiveSidebar] = useState(false);
  const [toggleMenu, setToggleMenu] = useState("home");
  const [scrollPercent, setScrollPercent] = useState(0);

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

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / docHeight) * 100;

    setScrollPercent(scrollPercentage);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="font-plex-sans-thai bg-[#FFD600] text-[#0079A9] fixed w-full top-0 left-0 z-50">
      <div
        style={{
          height: "4px",
          backgroundColor: "#0079A9",
          width: `${scrollPercent}%`,
          transition: "width 0.2s ease-in-out",
        }}
      />
      <div className="px-[10%] py-[11px] flex items-center justify-between">
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
          <Link to="/#target2">
            <div className={`border-b-2 hover:border-b-2 hover:border-[#0079A9] ${toggleMenu === "catelog" ? "border-[#3AB4F3] text-[#3AB4F3]" : "border-[#FFD600]"}`} onClick={() => setToggleMenu("catelog")}>
              <button className="">{t('header.catelog')}</button>
            </div>
          </Link>
          <Link to="/#target1">
            <div className={`border-b-2 hover:border-b-2 hover:border-[#0079A9] ${toggleMenu === "aboutus" ? "border-[#3AB4F3] text-[#3AB4F3]" : "border-[#FFD600]"}`} onClick={() => setToggleMenu("aboutus")}>
              <button className="">{t('header.aboutme')}</button>
            </div>
          </Link>
          <Link to="/#target3">
            <div className={`border-b-2 hover:border-b-2 hover:border-[#0079A9] ${toggleMenu === "recommend" ? "border-[#3AB4F3] text-[#3AB4F3]" : "border-[#FFD600]"}`} onClick={() => setToggleMenu("recommend")}>
              <button className="" >{t('header.recommend')}</button>
            </div>
          </Link>
          <Link to="/#target4">
            <div className={`border-b-2 hover:border-b-2 hover:border-[#0079A9] ${toggleMenu === "contactus" ? "border-[#3AB4F3] text-[#3AB4F3]" : "border-[#FFD600]"}`} onClick={() => setToggleMenu("contactus")}>
              <button className="">{t('header.contactus')}</button>
            </div>
          </Link>
          {/* <Link to="/requestform">
            <div className={`border-b-2 hover:border-b-2 hover:border-[#0079A9] ${toggleMenu === "moreinfo" ? "border-[#3AB4F3] text-[#3AB4F3]" : "border-[#FFD600]"}`} onClick={() => setToggleMenu("moreinfo")}>
              <button className="" >{t('header.moreinfo')}</button>
            </div>
          </Link> */}
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
          <GiHamburgerMenu onClick={() => setIsActiveSidebar(true)} className="text-[#0079A9]" />
          <div className={`fixed top-0 right-0 w-[280px] h-full text-white transform 
          ${isActiveSidebar ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}
          >
            <Sidebar setIsActiveSidebar={setIsActiveSidebar} selectedLang={selectedLang} selectedPic={selectedPic} setSelectedLang={setSelectedLang} setSelectedPic={setSelectedPic} />
          </div>

        </div>
      </div>
    </div>


  )
}

export default Header