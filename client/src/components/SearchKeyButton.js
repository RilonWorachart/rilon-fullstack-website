import {useState} from 'react'
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function SearchKeyButton() {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
      };
    
    
      const handleSearch = (e) => {
        e.preventDefault();
      }

    
      const linkPath = searchTerm === "" ? "/catalog" : `/catalog/keyword/${searchTerm}`;

    return (
        <>
            <form className="flex items-center border-[1px] border-lightgray py-1 px-3 mx-[80px] mt-[30px] rounded-full text-[#6C757D]" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder={t('categorypage.p4')}
                    className="flex-grow p-1 border-none outline-none rounded-l-full"
                    onChange={handleInputChange}
                    value={searchTerm}
                    required
                />
                <Link to={linkPath}>
                    <button
                        type="submit"
                        className="bg-transparent border-none text-[#6C757D]  rounded-r-full"
                    >
                        <FaSearch />
                    </button>
                </Link>
            </form>

        </>
    )
}

export default SearchKeyButton