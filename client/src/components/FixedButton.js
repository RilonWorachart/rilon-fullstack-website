import { useEffect, useState } from 'react'
import { IoIosArrowUp } from "react-icons/io";
import { FaShareAltSquare, FaRegAddressCard, FaFacebookSquare,FaYoutube, FaLine, FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { BsBagHeartFill } from "react-icons/bs";
import { SiShopee } from "react-icons/si";

function FixedButton() {
    const [backToTopButton, setBackToTopButton] = useState(false)
    const [isSocialActive, setIsSocialActive] = useState(false)
    const [isContactActive, setIsContactActive] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setBackToTopButton(true)
            } else {
                setBackToTopButton(false)
            }
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    const handleSocialToggle = () => {
        setIsSocialActive(prevState => !prevState);
    };

    const handleContactToggle = () => {
        setIsContactActive(prevState => !prevState);
    };

    return (
        <div>
            {backToTopButton && (
                <button className="z-20 fixed bottom-[15px] right-[20px] h-[35px] w-[35px] bg-[#0079A9] text-2xl text-white flex items-center justify-center shadow-lg hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition duration-300" onClick={scrollUp}>
                    <IoIosArrowUp className="" />
                </button>
            )}

            <div className="">
                <button className={`z-40 fixed bottom-[65px] left-[20px] h-[35px] w-[35px] bg-[#0079A9] text-xl text-white flex items-center justify-center rounded-full shadow-xl transition duration-300 ${isContactActive ? 'scale-75' : 'hover:scale-110'}`} onClick={() => { handleContactToggle() }}>
                    <FaRegAddressCard className="" />
                </button>
                <a href="https://page.line.me/156vctty?openQrModal=true"
                    className={`z-20 fixed left-[20px] h-[35px] w-[35px] bg-[#0079A9] text-white flex items-center justify-center rounded-full shadow-xl hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition-all duration-300 ${isContactActive ? 'bottom-[115px]' : 'bottom-[65px]'}`}
                >
                    <FaLine />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61555700229121"
                    className={`z-20 fixed left-[20px] h-[35px] w-[35px] bg-[#0079A9] text-white flex items-center justify-center rounded-full shadow-xl hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition-all duration-300 ${isContactActive ? 'bottom-[165px]' : 'bottom-[65px]'}`}
                >
                    <FaFacebookSquare className="" />
                </a>
                <a href="mailto:janenyrilon_jingwei@hotmail.com"
                    className={`z-20 fixed left-[20px] h-[35px] w-[35px] bg-[#0079A9] text-white flex items-center justify-center rounded-full shadow-xl hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition-all duration-300 ${isContactActive ? 'bottom-[215px]' : 'bottom-[65px]'}`}
                >
                    <MdOutlineEmail className="" />
                </a>
                <a href="https://www.lazada.co.th/shop/jw-jingweitip/?spm=a2o4m.pdp_revamp.seller.1.7ecf41f8hb1o3I&itemId=4370282627&channelSource=pdp"
                    className={`fixed left-[20px] h-[35px] w-[35px] bg-[#0079A9] text-white flex items-center justify-center rounded-full shadow-xl hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition-all duration-300 ${isContactActive ? 'bottom-[265px]' : 'bottom-[65px]'}`}
                >
                    <BsBagHeartFill />
                </a>
                <a href="https://shopee.co.th/wprachrt"
                    className={`fixed left-[20px] h-[35px] w-[35px] bg-[#0079A9] text-white flex items-center justify-center rounded-full shadow-xl hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition-all duration-300 ${isContactActive ? 'bottom-[315px]' : 'bottom-[65px]'}`}
                >
                    <SiShopee className="" />
                </a>
            </div>

            <div className="">
                <button className={`z-40 fixed bottom-[15px] left-[20px] h-[35px] w-[35px] bg-[#0079A9] text-xl text-white flex items-center justify-center rounded-xl shadow-xl transition duration-300 ${isSocialActive ? 'scale-75' : 'hover:scale-110'}`} onClick={() => { handleSocialToggle() }}>
                    <FaShareAltSquare className="" />
                </button>
                <a href="https://page.line.me/156vctty?openQrModal=true"
                    className={`z-20 fixed bottom-[15px] h-[35px] w-[35px] bg-[#0079A9] text-white flex items-center justify-center rounded-xl shadow-xl hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition-all duration-300 ${isSocialActive ? 'left-[70px]' : 'left-[20px]'}`}
                >
                    <FaLine />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61555700229121"
                    className={`z-20 fixed bottom-[15px] h-[35px] w-[35px] bg-[#0079A9] text-white flex items-center justify-center rounded-xl shadow-xl hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition-all duration-300 ${isSocialActive ? 'left-[120px]' : 'left-[20px]'}`}
                >
                    <FaFacebookSquare className="" />
                </a>
                <a href="https://www.instagram.com/rilon_thailand/"
                    className={`z-20 fixed bottom-[15px] h-[35px] w-[35px] bg-[#0079A9] text-white flex items-center justify-center rounded-xl shadow-xl hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition-all duration-300 ${isSocialActive ? 'left-[170px]' : 'left-[20px]'}`}
                >
                    <FaInstagram className="" />
                </a>
                <a href="https://www.youtube.com/@rilon_thailand"
                    className={`z-20 fixed bottom-[15px] h-[35px] w-[35px] bg-[#0079A9] text-white flex items-center justify-center rounded-xl shadow-xl hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition-all duration-300 ${isSocialActive ? 'left-[220px]' : 'left-[20px]'}`}
                >
                    <FaYoutube className="" />
                </a>
                <a href="mailto:janenyrilon_jingwei@hotmail.com"
                    className={`z-20 fixed bottom-[15px] h-[35px] w-[35px] bg-[#0079A9] text-white flex items-center justify-center rounded-xl shadow-xl hover:bg-white hover:text-[#0079A9] hover:border hover:border-[#0079A9] transition-all duration-300 ${isSocialActive ? 'left-[270px]' : 'left-[20px]'}`}
                >
                    <MdOutlineEmail className="" />
                </a>
            </div>
        </div>
    )
}

export default FixedButton