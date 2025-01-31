import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function CategorySearch() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const searchwords = [
    { id: 1, name_th: 'เครื่องเชื่อมอินวอเตอร์ราคาถูก', name_en: 'Cheap Inverter Welding Machine' },
    { id: 2, name_th: 'เครื่องเชื่อมอินวอเตอร์คุณภาพดี', name_en: 'High-Quality Inverter Welding Machine' },
    { id: 3, name_th: 'เครื่องเชื่อมไฟฟ้าราคาถูก', name_en: 'Cheap Electric Welding Machine' },
    { id: 4, name_th: 'เครื่องเชื่อมไฟฟ้าคุณภาพดี', name_en: 'High-Quality Electric Welding Machine' },
    { id: 5, name_th: 'เครื่องเชื่อมทิกราคาถูก', name_en: 'Cheap TIG Welding Machine' },
    { id: 6, name_th: 'เครื่องเชื่อมทิกคุณภาพดี', name_en: 'High-Quality TIG Welding Machine' },
    { id: 7, name_th: 'เครื่องเชื่อมอาร์กอนราคาถูก', name_en: 'Cheap Argon Welding Machine' },
    { id: 8, name_th: 'เครื่องเชื่อมอาร์กอนคุณภาพดี', name_en: 'High-Quality Argon Welding Machine' },
    { id: 9, name_th: 'เครื่องเชื่อมอลูมีเนียมสแตนเลสราคาถูก', name_en: 'Cheap Aluminum Stainless Steel Welding Machine' },
    { id: 10, name_th: 'เครื่องเชื่อมอลูมีเนียมสแตนเลสคุณภาพดี', name_en: 'High-Quality Aluminum Stainless Steel Welding Machine' },
    { id: 11, name_th: 'เครื่องเชื่อมมิกราคาถูก', name_en: 'Cheap MIG Welding Machine' },
    { id: 12, name_th: 'เครื่องเชื่อมมิกคุณภาพดี', name_en: 'High-Quality MIG Welding Machine' },
    { id: 13, name_th: 'เครื่องเชื่อมซีโอทูราคาถูก', name_en: 'Cheap CO2 Welding Machine' },
    { id: 14, name_th: 'เครื่องเชื่อมซีโอทูคุณภาพดี', name_en: 'High-Quality CO2 Welding Machine' },
    { id: 15, name_th: 'เครื่องตัดพลาสม่าราคาถูก', name_en: 'Cheap Plasma Cutting Machine' },
    { id: 16, name_th: 'เครื่องตัดพลาสม่าคุณภาพดี', name_en: 'High-Quality Plasma Cutting Machine' },
    { id: 17, name_th: 'อุปกรณ์งานเชื่อมราคาถูก', name_en: 'Cheap Welding Equipment' },
    { id: 18, name_th: 'อุปกรณ์งานเชื่อมคุณภาพดี', name_en: 'High-Quality Welding Equipment' },
    { id: 19, name_th: 'อะไหล่เครื่องเชื่อมราคาถูก', name_en: 'Cheap Welding Machine Spare Parts' },
    { id: 20, name_th: 'อะไหล่เครื่องเชื่อมคุณภาพดี', name_en: 'High-Quality Welding Machine Spare Parts' },
    { id: 21, name_th: 'สายเชื่อมตู้เชื่อมราคาถูก', name_en: 'Cheap Welding Machine Cables' },
    { id: 22, name_th: 'สายเชื่อมตู้เชื่อมคุณภาพดี', name_en: 'High-Quality Welding Machine Cables' },
    { id: 23, name_th: 'สายเชื่อมอาร์กอนราคาถูก', name_en: 'Cheap Argon Welding Cables' },
    { id: 24, name_th: 'สายเชื่อมอาร์กอนคุณภาพดี', name_en: 'High-Quality Argon Welding Cables' }
  ];


  return (
    <>
      <div className="px-[10%]">
        <div>
          <h1 className="pt-2 text-[30px] text-center">
            {t('search.p1')}
          </h1>
          <div className="text-[#E2B22C] h-[3px] w-[60px] text-center mx-[auto] bg-[#E2B22C]" />
        </div>
        <div className="flex flex-wrap justify-center items-center mx-[auto] py-10" >
          {searchwords.map((result) => (
            <Link to={`/catalog/keyword/${encodeURIComponent(result.name_th)}`} key={result.id}>
              <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 inline-block">
                {currentLang === 'th' ? result.name_th : result.name_en}
              </button>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-[10%]">
        <div>
          <h1 className="pt-2 text-[30px] text-center">
            {t('search.p16')}
          </h1>
          <div className="text-[#E2B22C] h-[3px] w-[60px] text-center mx-[auto] bg-[#E2B22C]" />
        </div>
        <div className="flex flex-wrap justify-center items-center mx-[auto] py-10" >
          <Link to={`/catalog/keyword/rilon`}>
            <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">{currentLang === 'th' ? 'ไรล่อน' : 'RILON'}</button>
          </Link>
          <Link to={`/catalog/keyword/JW INVERTER`}>
            <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">JW INVERTER</button>
          </Link>
          <Link to={`/catalog/keyword/JW JINGWEITIP`}>
            <button className="bg-[#E2B22C] border text-white py-1 px-6 m-1 rounded-full hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300">JW JINGWEITIP</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default CategorySearch