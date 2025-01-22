import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const ScrollContext = createContext();

export const useScroll = () => {
  return useContext(ScrollContext);
};

export const ScrollProvider = ({ children }) => {
  const [sectionRefs, setSectionRefs] = useState([]);
  const navigate = useNavigate();

  const scrollToSection = (index) => {
    if (sectionRefs[index]) {
      sectionRefs[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };


  const navigateAndScroll = (index) => {
    // Navigate to the Home page first
    navigate('/');
    
    // After navigation, scroll to the specific section
    setTimeout(() => {
      scrollToSection(index);
    }, 500);  // Wait for the page to load before scrolling (adjust time as needed)
  };

  return (
    <ScrollContext.Provider value={{ sectionRefs, setSectionRefs, navigateAndScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};
