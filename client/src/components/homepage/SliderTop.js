import { useEffect, useState } from 'react'

function SliderTop() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
            const intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === 2 - 1 ? 0 : prevIndex + 1
                );
            }, 3000);
    
            return () => clearInterval(intervalId);
        }, []); 


    return (
        <div className="overflow-hidden">
            <div className="relative">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    <img src="/images/page_images/Y-Banding-03-01.png" className="mt-[70px] w-full 4xl:px-[10%] bg-[#111215]" alt="advertise"></img>
                    <img src='/images/page_images/Y-Banding-02-01.png' alt="y_banding" className="mt-[70px] w-full 4xl:px-[10%] bg-[#111215]"></img>
                </div>
            </div>
        </div>
    )
}

export default SliderTop