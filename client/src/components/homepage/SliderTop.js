import { useEffect, useState } from 'react'
import axios from 'axios'

function SliderTop() {
    const [banner, setBanner] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const fetchBanner = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/getbannertop`);
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
        <div className="overflow-hidden">
            <div className="relative">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {banner.map((item) => (
                        <img src={`${process.env.REACT_APP_API}${item.banner_path}`} className="w-full 4xl:px-[280px] bg-[#111215]" alt={`bannertop_${item.id}`}></img>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SliderTop