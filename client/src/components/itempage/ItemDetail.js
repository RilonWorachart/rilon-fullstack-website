import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaFacebook, FaLine, FaYoutube, FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import QRcodeComponent from '../QRcodeComponent'
import SearchKeyButton from '../SearchKeyButton';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

function ItemDetail() {
    const { id } = useParams();
    const [productData, setProductData] = useState([])
    const { t } = useTranslation();

    useEffect(() => {
        // Fetch product data (products.json)
        fetch(`/locales/${i18next.language}/products.json`)
          .then((response) => response.json())
          .then((result) => {
            // Find the product based on the 'id' prop
            const foundProduct = result[`product${id}`]; // Assuming the key format is 'product1', 'product2', etc.
    
            if (foundProduct) {
              // Translate product fields using i18next
              const translatedProduct = {
                ...foundProduct,
                name: t(foundProduct.name), // Translate name
                description: t(foundProduct.description), // Translate description
                category: foundProduct.category.map(cat => t(cat)), // Translate each category
                searchword: t(foundProduct.searchword), // Translate searchword
                brand: t(foundProduct.brand), // Translate brand
                html: foundProduct.html, // HTML can be directly inserted
              };
              setProductData(translatedProduct);
            }
          })
          .catch((error) => {
            console.error('Error fetching product data:', error);
          });
      }, [id, t]); 


    return (
        <>
            <div className="mt-[70px] bg-[#E2B22C] text-white px-3 xl:px-24 py-3 md:flex md:justify-between md:items-center">
                <p className="py-1">
                    <Link to="/">
                        <span className="hover:text-[#00007E]">{t('itempage.p2')}</span>
                    </Link>
                    <span> » </span>
                    <Link to="/catalog">
                        <span className="hover:text-[#00007E]">{t('itempage.p3')}</span>
                    </Link>
                    <span> » </span>
                    <span className="">{productData.name}</span>
                </p>
                <h2 className="py-1 text-[20px]">{t('itempage.p4')}</h2>
            </div>

            <div className="flex justify-end ">
                <SearchKeyButton />
            </div>

            <div className="mx-[10%] max-w-[1400px] 2xl:mx-[auto] my-[30px] px-[15px] py-[15px] border-[1px] border-lightgray rounded-md md:flex">
                <img className=" w-[100%] md:w-[35%] md:h-[100%]  border rounded-md md:mr-[40px]" src={`/images/products/${productData.image}`} alt={productData.name} />
                <div className="lg:w-[70%]">
                    <p className="text-[32px] pt-4">{productData.name}</p>
                    <p className="py-1">
                        <span>{t('itempage.p5')} </span>
                        <Link to={`/catalog/keyword/${productData.brand}`}>
                            <span className="text-[#E2B22C]">{productData.brand}</span>
                        </Link>
                    </p>
                    <hr></hr>
                    <div className="flex py-6">
                        <Link to={`/catalog/item/${id}/request-form`}>
                            <button className="bg-[#E2B22C] border text-white py-2 px-6 mr-4 hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 inline-block">{t('itempage.p13')}</button>
                        </Link>
                        <Link to={`/catalog/item/${id}/request-form`}>
                            <button className="bg-[#E2B22C] border text-white py-2 px-6 hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 inline-block">{t('itempage.p14')}</button>
                        </Link>
                    </div>
                    <hr></hr>
                    <p className="py-2">{t('itempage.p6')}</p>
                    <div className="flex">
                        {
                            productData?.category_filter?.length > 0 ? (
                                productData.category_filter.map((filterData, index) => {                                   
                                    return (
                                        <Link key={index} to={`/catalog/keyword/${filterData}`}>
                                            <button className="bg-[#E2B22C] border text-white text-[13px] py-1 px-4 mr-2 hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 inline-block">
                                                {productData.category[index]} {/* Display category name */}
                                            </button>
                                        </Link>
                                    );
                                })
                            ) : (
                                <p>{t('itempage.p7')}</p>  // Fallback if no categories are available
                            )
                        }
                    </div>
                    <p className="py-2">{t('itempage.p12')}</p>
                    <Link to={`/catalog/keyword/${productData.searchword_filter}`}>
                        <button className="bg-[#E2B22C] border text-white text-[13px] mb-2 py-1 px-4 mr-4 hover:bg-white hover:text-[#42189F] hover:border hover:border-[#42189F] transition duration-300 inline-block">{productData.searchword}</button>
                    </Link>
                    <div>

                    </div>
                    <hr></hr>
                    <p className="py-2">{t('itempage.p8')}</p>

                    <div className="flex">
                        <a href="https://page.line.me/156vctty?openQrModal=true">
                            <div className="p-1.5 mr-1.5 text-[18px] bg-white border border-[#02B92E] text-[#02B92E] rounded-full hover:bg-[#02B92E] hover:text-white transition duration-300">
                                <FaLine />
                            </div>
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61555700229121">
                            <div className="p-1.5 mr-1.5 text-[18px] bg-white border border-[#1773EA] text-[#1773EA] rounded-full hover:bg-[#1773EA] hover:text-white transition duration-300">
                                <FaFacebook />
                            </div>
                        </a>
                        <a href="https://www.instagram.com/rilonthailand/">
                            <div className="p-1.5 mr-1.5 text-[18px] bg-white border border-[#BB5287] text-[#BB5287] rounded-full hover:bg-[#BB5287] hover:text-white transition duration-300">
                                <FaInstagram />
                            </div>
                        </a>
                        <a href="https://www.youtube.com/@rilon_thailand">
                            <div className="p-1.5 mr-1.5 text-[18px] bg-white border border-[#E60023] text-[#E60023] rounded-full hover:bg-[#E60023] hover:text-white transition duration-300">
                                <FaYoutube />
                            </div>
                        </a>
                        <a href="mailto:janenyrilon_jingwei@hotmail.com">
                            <div className="p-1.5 mr-1.5 text-[18px] bg-white border border-[#0078D4] text-[#0078D4] rounded-full hover:bg-[#0078D4] hover:text-white transition duration-300">
                                <MdOutlineEmail />
                            </div>
                        </a>
                    </div>

                </div>

            </div>

            <div className="mx-[10%] max-w-[1400px] 2xl:mx-[auto] my-[30px] px-[20px] py-[10px] border-[1px] border-lightgray rounded-md">
                <div>
                    <h1 className="text-[30px]">
                        {t('itempage.p9')}
                    </h1>
                    <div className="text-[#E2B22C] h-[3px] w-[60px] bg-[#E2B22C]" />
                </div>
                <div>
                    <h1 className="text-[32px] pt-4 pb-2 text-center">{productData.name}</h1>
                    <div dangerouslySetInnerHTML={{ __html: productData.html }} className="py-4" />
                </div>
                <QRcodeComponent />
                <div className="text-center">
                    <p className="pt-10 pb-2 font-bold text-[16px] text-[#FF0000]">{t('itempage.p10')}</p>
                    <div className="pb-8 text-[17px] font-semibold">
                        <p className="py-2">08-1694-5000 , 098-426-6953 </p>
                        <p className="py-2">095-961-9901 , 089-660-9609</p>
                        <p className="py-2">094-695-5599</p>
                        <p className="py-2">081-697-7000 office</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ItemDetail