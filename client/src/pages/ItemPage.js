import Footer from '../components/Footer'
import CategorySearch from '../components/CategorySearch'
import ItemDetail from '../components/itempage/ItemDetail'
import Contact from '../components/Contact'
import RelateItem from '../components/itempage/RelateItem'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'


function ItemPage() {
    const { id } = useParams();
    const { t } = useTranslation();

    return (
        <>
            <div className="min-h-screen font-plex-sans-thai">
                <ItemDetail />
                <div className="mx-[10%] max-w-[1400px] 2xl:mx-[auto] mt-[30px] mb-[20px] px-[20px] py-[10px] border-[1px] border-lightgray rounded-md">
                    <div className="pb-4">
                        <h1 className="text-[30px]">
                            {t('itempage.p1')}
                        </h1>
                        <div className="text-[#E2B22C] h-[4px] w-[60px] bg-[#0079A9]" />
                    </div>
                    <div className="px-4">
                        <Contact />
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 125 1440 155"><path fill="#0079A9" fill-opacity="1" d="M0,256L120,240C240,224,480,192,720,181.3C960,171,1200,181,1320,186.7L1440,192L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
                <RelateItem id={id}/>
                <CategorySearch />
                <Footer />
            </div>
        </>
    )
}

export default ItemPage