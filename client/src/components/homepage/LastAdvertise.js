import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next';

function LastAdvertise() {
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
                    } else {
                        setInView(false); // Optional: reset state when leaving the viewport
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
        <div ref={divRef} className="section bg-cover bg-fixed bg-center background3 md:flex md:flex-row flex-col px-[10%] 4xl:px-[20%] py-[100px] md:justify-between overflow-hidden">
            <div
                className="bg-white mb-10 md:mb-0 md:w-[30%] overflow-hidden transition-transform duration-500 ease-in-out rounded-lg"
                style={{
                    transform: `${isFlexColumn ? `translateY(${100 - scrollEffect}%)` : `translateX(${100 - scrollEffect}%)`}`
                }}
            >
                <img
                    src="/images/page_images/WeldingMC.jpg"
                    alt="weldingMC"
                    className="w-[100%]"
                />
                <h1 className="text-[20px] text-center p-4 text-[#0079A9]">{t('homepage.h18')}</h1>
                <p className="px-4 pb-8">{t('homepage.p21')}</p>
            </div>
            <div
                className="bg-white mb-10 md:mb-0 md:w-[30%] overflow-hidden transition-transform duration-500 ease-in-out rounded-lg"
                style={{
                    transform: `${isFlexColumn ? `translateY(${100 - scrollEffect}%)` : `translateX(${100 - scrollEffect}%)`}`
                }}
            >
                <img
                    src="/images/page_images/TorchSerPana.jpg"
                    alt="torchserpana"
                    className="w-[100%]"
                />
                <h1 className="text-[20px] text-center p-4 text-[#0079A9]">{t('homepage.h19')}</h1>
                <p className="px-4 pb-8">{t('homepage.p22')}</p>
            </div>
            <div
                className="bg-white md:w-[30%] overflow-hidden transition-transform duration-500 ease-in-out rounded-lg"
                style={{
                    transform: `${isFlexColumn ? `translateY(${100 - scrollEffect}%)` : `translateX(${100 - scrollEffect}%)`}`
                }}
            >
                <img
                    src="/images/page_images/robot.jpg"
                    alt="robot"
                    className="w-[100%]"
                />
                <h1 className="text-[20px] text-center p-4 text-[#0079A9]">{t('homepage.h20')}</h1>
                <p className="px-4 pb-8">{t('homepage.p23')}</p>
            </div>
        </div>
    )
}

export default LastAdvertise