import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next';

function Service() {
    const { t } = useTranslation();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [inView, setInView] = useState(false); // To track if the div is in the viewport
    const divRef = useRef(null); // Reference to the div
    const isFlexColumn = window.innerWidth < 1024;

    useEffect(() => {
        // Store the ref value in a variable before observing it
        const currentDivRef = divRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setInView(true); // Set inView to true when the component is in the viewport
                    } else {
                        setInView(false); // Optional: reset state when leaving the viewport
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
        <div ref={divRef} className="flex flex-col lg:flex-row justify-between items-center bg-[#FFD600] px-[10%] 4xl:px-[20%] text-center overflow-hidden">
            <div className="py-12 lg:w-[30%] transition-transform duration-500 ease-in-out"
                style={{
                    transform: `${isFlexColumn ? `translateY(${100 - scrollEffect}%)` : `translateX(-${100 - scrollEffect}%)`}`
                }}>
                <h1 className="text-[28px]">DEALER</h1>
                <div className="mt-4 mb-6 mx-auto rounded-[50%] object-cover overflow-hidden border-solid border-8 border-[#0079A9] w-96 h-96 lg:w-64 lg:h-64 2xl:w-96 2xl:h-96">
                    <img src='/images/page_images/Dealer.jpg' alt="dealer" className="h-full w-full object-cover "></img>
                </div>
                <p>{t('homepage.p3')}</p>
            </div>
            <div className="py-12 lg:w-[30%] transition-transform duration-500 ease-in-out"
                style={{
                    transform: `${isFlexColumn ? `translateY(${100 - scrollEffect}%)` : `translateX(-${100 - scrollEffect}%)`}`
                }}>
                <h1 className="text-[28px]">HIGHER EFFICIENCY</h1>
                <div className="mt-4 mb-6 mx-auto rounded-[50%] object-cover overflow-hidden border-solid border-8 border-[#0079A9] w-96 h-96 lg:w-64 lg:h-64 2xl:w-96 2xl:h-96">
                    <img src='/images/page_images/HighEfficiency.JPG' alt="efficiency" className="h-full w-full object-cover"></img>
                </div>
                <p>{t('homepage.p4')}</p>
            </div>
            <div className="py-12 lg:w-[30%] transition-transform duration-500 ease-in-out"
                style={{
                    transform: `${isFlexColumn ? `translateY(${100 - scrollEffect}%)` : `translateX(-${100 - scrollEffect}%)`}`
                }}>
                <h1 className="text-[28px]" >WARANTY SERVICE</h1>
                <div className="mt-4 mb-6 mx-auto rounded-[50%] object-cover overflow-hidden border-solid border-8 border-[#0079A9] w-96 h-96 lg:w-64 lg:h-64 2xl:w-96 2xl:h-96">
                    <img src='/images/page_images/WarantyService.jpg' alt="service" className="h-full w-full  object-cover"></img>
                </div>
                <p>{t('homepage.p5')}</p>
            </div>
        </div>
    )
}

export default Service