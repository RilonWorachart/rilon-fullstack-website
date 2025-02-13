import React from 'react'
import { useTranslation } from 'react-i18next';

function Company() {
    const { t } = useTranslation();

    return (
        <div className="px-[10%] 4xl:px-[20%] pt-[100px] bg-[#FFD600]">
            <div className="pb-[40px] text-center">
                <h1 className="text-[34px]">
                    {t('homepage.h9')}
                </h1>
                <div className="text-[#E2B22C] h-[3px] w-[60px] text-center mx-[auto] bg-[#0079A9]" />
            </div>
            <img src='/images/page_images/logo-w.png' className="w-[300px] mx-[auto] my-[20px]" alt="logo" />
            <p className="text-center py-[20px] 4xl:px-[20%]">{t('homepage.p8')}</p>
            <div className="pt-[40px] mx-[auto] overflow-hidden w-[200px] lg:w-[600px]"> {/* Adjusted margin */}
                <div className="images-wrapper">
                    <img src='/images/page_images/Rilonlogo.png' className="image" alt="logo" />
                    <img src='/images/page_images/JWInverterlogo.png' className="image" alt="logo" />
                    <img src='/images/page_images/Jingweitiplogo.png' className="image" alt="logo" />
                    <img src='/images/page_images/Rilonlogo.png' className="image" alt="logo" />
                    <img src='/images/page_images/JWInverterlogo.png' className="image" alt="logo" />
                    <img src='/images/page_images/Jingweitiplogo.png' className="image" alt="logo" />
                </div>
            </div>
        </div>
    )
}

export default Company