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
        // Store the ref value in a variable before observing it
        const currentDivRef = divRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setInView(true); // Set inView to true when the component is in the viewport
                    }
                });
            },
            { threshold: 0.2 } // Trigger when 50% of the element is visible
        );

        if (currentDivRef) {
            observer.observe(currentDivRef); // Observe the target div
        }

        return () => {
            // Use the variable to ensure it's accessed correctly during cleanup
            if (currentDivRef) {
                observer.unobserve(currentDivRef); // Clean up observer on unmount
            }
        };
    }, []); // Empty dependency array to set up observer once



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
        <div ref={divRef} className="px-[10%] py-[100px] text-center overflow-hidden ">
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