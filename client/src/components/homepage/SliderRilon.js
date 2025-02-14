import { useEffect, useState } from 'react'

function SliderRilon() {
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
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                <img src='/images/page_images/argon.jpg' alt="argon" className="w-full flex-shrink-0"></img>
                <img src='/images/page_images/CO2.jpg' alt="co2" className="w-full flex-shrink-0"></img>
                <img src='/images/page_images/plusma.jpg' alt="plusma" className="w-full flex-shrink-0"></img>
                <img src='/images/page_images/rotate.jpg' alt="rotate" className="w-full flex-shrink-0"></img>
            </div>
        </div>
    )
}

export default SliderRilon