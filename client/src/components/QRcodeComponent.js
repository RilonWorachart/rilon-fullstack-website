import React from 'react'
import { useTranslation } from 'react-i18next';

function QRcodeComponent() {
  const { t } = useTranslation();


  return (
    <div className="px-[100px] text-[#FF0000] text-center">
      <p className="text-[20px] font-bold">
        {t('qrcode.p1')}
      </p>
      <div className="flex justify-center items-center py-8">
        <img src='/images/page_images/QRcode.png' className="w-[150px]" alt="qrcode"></img>
      </div>
      <p className="font-bold text-[18px]">
        {t('qrcode.p2')}
      </p>
      <a href="https://page.line.me/156vctty?openQrModal=true" className="flex justify-center items-center py-4">
        <img src='/images/page_images/Addline.png' className="w-[200px]" alt="addline"></img>
      </a>
    </div>
  )
}

export default QRcodeComponent