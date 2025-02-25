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
            <h1 className="text-[26px] lg:text-[34px] text-white">{t('homepage.h1')}</h1>
            <div className="text-[#E2B22C] h-[4px] w-[60px] text-center mx-auto bg-[#E2B22C]" />
        </div>
    )
}

export default Title