import Footer from '../components/Footer'
import CategorySearch from '../components/CategorySearch'
import CategoryDetail from '../components/categorypage/CategoryDetail'
import Contact from '../components/Contact'
import { useTranslation } from 'react-i18next'


function CategoryPage() {
    const { t } = useTranslation();

    return (
        <>
            <div className="min-h-screen font-plex-sans-thai">
                <CategoryDetail/>
                <div className="mx-[10%] max-w-[1400px] 2xl:mx-[auto] my-[30px] px-[20px] py-[10px] border-[1px] border-lightgray rounded-md">
                    <div className="pb-4">
                        <h1 className="text-[30px]">
                            {t('itempage.p1')}
                        </h1>
                        <div className="text-[#E2B22C] h-[3px] w-[60px] bg-[#0079A9]" />
                    </div>
                    <div className="px-4">
                        <Contact />
                    </div>
                </div>
                <CategorySearch />
                <Footer />
            </div>
        </>
    )
}

export default CategoryPage