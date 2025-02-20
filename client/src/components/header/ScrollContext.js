import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ScrollContext = createContext();

export const useScroll = () => {
  return useContext(ScrollContext);
};

export const ScrollProvider = ({ children }) => {
  const [sectionRefs, setSectionRefs] = useState([]);
  const [indexToScroll, setIndexToScroll] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (index) => {
    if (sectionRefs[index]) {
      sectionRefs[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Effect to handle page load and scrolling after navigation
  useEffect(() => {
    if (indexToScroll !== null) {
      // Delay scrolling to allow the page to load after navigation
      const timeoutId = setTimeout(() => {
        scrollToSection(indexToScroll);
        setIndexToScroll(null); // Reset index after scrolling
      }, 500); // Adjust the delay if needed

      return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount or change
    }
  }, [indexToScroll]);

  // Effect to ensure scroll behavior when location changes
  useEffect(() => {
    if (indexToScroll !== null) {
      // Scroll to the section after navigation completes
      scrollToSection(indexToScroll);
      setIndexToScroll(null); // Reset the section to scroll to
    }
  }, [location, indexToScroll]);

  const navigateAndScroll = (index) => {
    setIndexToScroll(index); // Set the section to scroll to
    navigate('/'); // Navigate to the homepage or desired route
  };

  return (
    <ScrollContext.Provider value={{ sectionRefs, setSectionRefs, navigateAndScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};
