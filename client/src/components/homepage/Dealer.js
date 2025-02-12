import React from 'react'
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react'

function Dealer() {
    const { t } = useTranslation();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [inView, setInView] = useState(false); // To track if the div is in the viewport
    const divRef = useRef(null); // Reference to the div
    const isFlexColumn = window.innerWidth < 768;


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
            { threshold: 0.4 } // Trigger when 50% of the element is visible
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
        <div ref={divRef} className="px-[10%] 4xl:px-[20%] text-center py-[100px] background bg-fixed bg-cover overflow-hidden">
            <div className="pb-[50px]">
                <h1 className="text-[34px] text-[#F4D016]">
                    {t('homepage.h2')}
                </h1>
                <div className="h-[3px] w-[60px] text-center mx-[auto] bg-[#0079A9]" />
            </div>
            <div className="md:flex md:items-center">
                <div className="text-white backdrop-blur-sm bg-[#EEE185]/10 z-0 py-4 px-[20px] my-[auto] md:w-[60%] transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `${isFlexColumn ? `translateY(${100 - scrollEffect}%)` : `translateX(-${100 - scrollEffect}%)`}`
                    }}
                >
                    <h1 className="text-[34px] py-6 ">
                        {t('homepage.h3')}
                    </h1>
                    <p className="text-[22px] text-white py-2">
                        {t('homepage.p1')}
                    </p>
                    <div className="text-[24px] text-[#F4D016] py-6 font-bold ">
                        <BiSolidQuoteAltLeft className="mx-[auto]" />
                        <p className="py-[20px]">{t('homepage.p2')}</p>
                        <BiSolidQuoteAltRight className="mx-[auto]" />
                    </div>
                </div>
                <div className="md:w-[40%] md:ml-[30px] mt-10 md:mt-0 flex justify-center items-center transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `${isFlexColumn ? `translateY(${100 - scrollEffect}%)` : `translateX(${100 - scrollEffect}%)`}`
                    }}>
                    <img src="/images/page_images/logo.png" alt="logo" className=""></img>
                </div>
            </div>
        </div>
    )
}

export default Dealer