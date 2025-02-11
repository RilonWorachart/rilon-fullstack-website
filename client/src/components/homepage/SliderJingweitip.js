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
                <img src="/images/page_images/Torch.png" alt="torch" className="w-[100%]"></img>
                <img src='/images/page_images/Equipment.png' alt="equipment" className="w-[100%]"></img>
                <img src='/images/page_images/WP.png' alt="wp" className="w-[100%]"></img>
                <img src='/images/page_images/Jingweitip.png' alt="jingweitip" className="w-[100%]"></img>
            </div>
        </div>
    )
}

export default SliderJingweitip