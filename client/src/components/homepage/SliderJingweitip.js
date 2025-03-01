import { useEffect, useState } from 'react'
import axios from 'axios'

function SliderJingweitip() {
    const [banner, setBanner] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const fetchBanner = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/getbannerjw`);
            const result = response.data;
            setBanner(result.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchBanner();
    }, []);

    useEffect(() => {
        if (banner.length === 0) return;

        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === banner.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(intervalId);

    }, [banner]);

    return (
        <div className="4xl:mx-[20%] overflow-hidden">
            <div
                className="flex transition-transform duration-500 ease-in-out pt-[20px]"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {banner.map((item) => (
                    <img src={`${process.env.REACT_APP_API}${item.banner_path}`} className="w-full bg-[#111215]" alt={`bannerJW_${item.id}`}></img>
                ))}
            </div>
        </div>
    )
}

export default SliderJingweitip