import { useEffect, useState, useRef } from 'react'
import YouTubeEmbed from './YoutubeEmbed'
import { useTranslation } from 'react-i18next';
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { BiSolidQuoteAltRight } from "react-icons/bi";


function About() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [inView, setInView] = useState(false); // To track if the div is in the viewport
    const divRef = useRef(null); // Reference to the div
    const { t } = useTranslation();

    useEffect(() => {
        const currentDivRef = divRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Only update state when entering the viewport
                    if (entry.isIntersecting) {
                        setInView(true);
                    } else {
                        setInView(false); // Optional: reset state when leaving the viewport
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (currentDivRef) {
            observer.observe(currentDivRef);
        }

        return () => {
            if (currentDivRef) {
                observer.unobserve(currentDivRef);
            }
        };
    }, []); // The observer only needs to be initialized once, so no dependencies here.



    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY); // Update the scroll position
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll); // Clean up event listener on unmount
        };
    }, []);


    const scrollEffect = inView ? Math.min(scrollPosition / 3, 100) : 0;


    return (
        <div ref={divRef} className="py-[50px] px-[10%] text-center overflow-hidden ">
            <div className="2xl:flex 2xl:items-center 2xl:justify-center 2xl:gap-x-[100px]"
            >
                <div className="2xl:w-[40%] transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateY(-${100 - scrollEffect}%)`
                    }}>
                    <h1 className="text-[30px]">
                        {t('homepage.h5')}
                    </h1>
                    <div className="h-[3px] w-[60px] text-center mx-[auto] bg-[#0079A9]" />

                    <div className='py-[40px]'>
                        <BiSolidQuoteAltLeft className="text-[#E2B22C] text-[36px] mx-[auto]" />
                        <p className="py-[20px]">{t('homepage.p6')}</p>
                        <BiSolidQuoteAltRight className="text-[#E2B22C] text-[36px] mx-[auto]" />
                    </div>

                </div>
                <YouTubeEmbed className="2xl:w-[40%]" />
            </div>
        </div>
    )
}

export default About