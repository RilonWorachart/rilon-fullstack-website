import { useState } from 'react'

function RecommendProductCard({ id, image, name }) {
    const [isActive, setIsActive] = useState(false)

    return (
        <div className={`relative flex justify-center ${isActive ? 'bg-gradient-to-r from-[#0079A9] to-[#E2B22C]' : ''}`} onMouseEnter={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)}>
            <img
                className={`h-[100%] w-[50%] hover:opacity-75 transition-transform duration-300 transform  ${isActive ? ' opacity-75' : ''}`}
                src={`${process.env.REACT_APP_API}${image}`}
                alt={name}
            />
            {
                isActive && (
                    <div>
                        <p className="border border-white w-[90%] h-[90%] top-[5%] right-[5%] absolute"></p>
                        <p className="text-center text-[24px] text-white absolute bottom-[6%] left-0 right-0 ">
                            {name}
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default RecommendProductCard