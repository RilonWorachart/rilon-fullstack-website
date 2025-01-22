import Footer from '../components/Footer'
import CategorySearch from '../components/CategorySearch'
import ItemList from '../components/ItemList'
import SearchKeyButton from '../components/SearchKeyButton'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'


function CatalogPage() {
  const { t } = useTranslation();


  return (
    <>
      <div className="min-h-screen font-plex-sans-thai">
        <div className="mt-[70px] bg-[#E2B22C] text-white px-3 xl:px-24 py-3 ">
          <p className="py-1">
            <Link to="/">
              <span className="hover:text-[#00007E]">{t('categorypage.p1')}</span>
            </Link>
            <span> » </span>
            <span className="">{t('categorypage.p2')}</span>
          </p>
          <h2 className="py-1 text-[20px]">{t('categorypage.p3')}</h2>
        </div>


        <div className="flex justify-end">
          <SearchKeyButton />
        </div>

        <ItemList/>


        <CategorySearch />
        <Footer />
      </div>
    </>
  )
}

export default CatalogPage