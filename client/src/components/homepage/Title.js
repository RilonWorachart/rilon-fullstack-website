import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';


function Title() {
    const { t } = useTranslation();
    const [scrollPosition, setScrollPosition] = useState(0);

    // Update scroll position on scroll
    const handleScroll = () => {
        setScrollPosition(window.scrollY);
    };

    useEffect(() => {
        // Attach scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="px-[10%] 4xl:px-[20%] py-[20px] text-center text-white bg-[#0079A9]">
            <h1 className="text-[34px] text-white">{t('homepage.h1')}</h1>
            <div className="text-[#E2B22C] h-[4px] w-[60px] text-center mx-auto bg-[#E2B22C]" />
        </div>
        // <div>
        //     <section
        //         className="relative w-full bg-cover bg-center"
        //         style={{
        //             backgroundImage: 'url("https://via.placeholder.com/1920x1080")',
        //             transform: `translateY(${scrollPosition * 0.5}px)`, // Controls the parallax effect speed
        //             transition: 'transform 0.1s ease-out', // Smooth transition for the movement
        //         }}
        //     >
        //         {/* Content */}
        //         <div className="absolute inset-12 flex justify-center items-center text-white">
        //             <div className="px-[10%] 4xl:px-[20%] py-[20px] text-center text-white bg-[#0079A9]">
        //                 <h1 className="text-[34px] text-white">{t('homepage.h1')}</h1>
        //                 <div className="text-[#E2B22C] h-[4px] w-[60px] text-center mx-auto bg-[#E2B22C]" />
        //             </div>
        //         </div>
        //     </section>

        //     {/* Other Content Below */}
        //     <section className="h-[700px] bg-[#0079A9] flex items-center justify-center z-10">
        //         <img src='/images/page_images/RilonTH02.png' alt="yellowrilon" className="h-[500px] "></img>
        //     </section>
        // </div>

    )
}

export default Title