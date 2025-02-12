import React from 'react'
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react'

function Riloninverter() {
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
        <div ref={divRef} className="px-[10%] 4xl:px-[20%] py-[70px] bg-[#0079A9] md:flex md:justify-between md:items-center overflow-hidden">
            <div className="md:w-[50%] px-4 transition-transform duration-500 ease-in-out"
                style={{
                    transform: `${isFlexColumn ? `translateY(${100 - scrollEffect}%)` : `translateX(-${100 - scrollEffect}%)`}`
                }}>
                <h1 className="py-6 text-[30px] text-center text-[#FFD600] font-bold">
                    {t('homepage.h8')}
                </h1>
                <p className="py-4 text-center text-white">
                    {t('homepage.p7')}
                </p>
            </div>
            <div className="md:w-[47%] transition-transform duration-500 ease-in-out"
                style={{
                    transform: `${isFlexColumn ? `translateY(${100 - scrollEffect}%)` : `translateX(${100 - scrollEffect}%)`}`
                }}>
                <img src='/images/page_images/RilonTH02.png' alt="yellowrilon"></img>
            </div>
        </div>
    )
}

export default Riloninverter