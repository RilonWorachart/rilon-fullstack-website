import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function Ebook() {
    const { t } = useTranslation();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [inView, setInView] = useState(false);
    const divRef = useRef(null);

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
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Scroll listener will be triggered on every scroll event.

    const scrollEffect = inView ? Math.min(scrollPosition / 3, 100) : 0;

    return (
        <div ref={divRef} className="section text-center w-[100%] 4xl:px-[20%] py-[100px] flex justify-center md:justify-end md:items-center background2 bg-fixed bg-cover overflow-hidden">
            <div className="bg-black w-[80%] md:w-[40%] 2xl:w-[600px] py-[50px] px-[20px] transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(${100 - scrollEffect}%)`, // Move from off-screen to in-screen
                }}
            >
                <a href="https://anyflip.com/uggut/ubmb/" className="text-[30px] font-bold text-white hover:text-[#EA100F]">{t('homepage.h15')}</a>
                <div className="flex items-center justify-center pt-[20px]">
                    <a href="https://anyflip.com/uggut/ubmb/">
                        <img
                            src="/images/page_images/Book.png"
                            alt="book"
                            className="w-[350px] 2xl:w-[450px] border-4 border-transparent hover:border-red-500 hover:scale-105 transition-all duration-300"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Ebook;
