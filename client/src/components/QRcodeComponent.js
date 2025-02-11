import React from 'react'
import { useTranslation } from 'react-i18next';

function QRcodeComponent() {
  const { t } = useTranslation();
  
  return (
    <div className="mx-[10%] text-center flex flex-col lg:flex-row justify-center items-center gap-x-[20px] pb-[40px]">
      <div className="bg-[#0079A9] rounded-lg my-[10px] lg:my-[0px] lg:mx-[10px]">
        <img src='/images/page_images/Line1.png' alt="line1" className="py-4 px-[auto] px-4"></img>
        <p className="text-center text-white pb-4 text-[22px]">095-961-9901</p>
      </div>
      <div className="bg-[#E2B22C] rounded-lg my-[10px] lg:my-[0px] lg:mx-[10px]">
        <img src='/images/page_images/Line2.png' alt="line2" className="py-4 px-[auto] px-4"></img>
        <p className="text-center text-white pb-4 text-[22px]">089-660-9609</p>
      </div>
      <div className="bg-[#0079A9] rounded-lg my-[10px] lg:my-[0px] lg:mx-[10px]">
        <img src='/images/page_images/Line3.png' alt="line3" className="py-4 px-[auto] px-4"></img>
        <p className="text-center text-white pb-4 text-[22px]">081-694-5000</p>
      </div>
    </div>
  )
}

export default QRcodeComponent