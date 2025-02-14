import { useEffect, useState } from 'react'

function SliderJingweitip() {
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === 4 - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="4xl:mx-[20%] overflow-hidden">
            <div
                className="flex transition-transform duration-500 ease-in-out pt-[20px]"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                <img src="/images/page_images/jingweitip.jpg" alt="torch" className="w-[100%]"></img>
                <img src='/images/page_images/jingweitip2.jpg' alt="equipment" className="w-[100%]"></img>
                <img src='/images/page_images/jingweitip3.jpg' alt="jingweitip" className="w-[100%]"></img>
                <img src='/images/page_images/wp.jpg' alt="wp" className="w-[100%]"></img>
            </div>
        </div>
    )
}

export default SliderJingweitip