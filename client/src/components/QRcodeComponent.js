import { useEffect, useState, useRef } from 'react'


function QRcodeComponent() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [inView, setInView] = useState(false); // To track if the div is in the viewport
  const divRef = useRef(null); // Reference to the div
  const isFlexColumn = window.innerWidth < 1024;


  useEffect(() => {
    // Store the ref value in a variable before observing it
    const currentDivRef = divRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true); // Set inView to true when the component is in the viewport
          }
        });
      },
      { threshold: 0.2 } // Trigger when 50% of the element is visible
    );

    if (currentDivRef) {
      observer.observe(currentDivRef); // Observe the target div
    }

    return () => {
      // Use the variable to ensure it's accessed correctly during cleanup
      if (currentDivRef) {
        observer.unobserve(currentDivRef); // Clean up observer on unmount
      }
    };
  }, []); // Empty dependency array to set up observer once



  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY); // Update the scroll position
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up event listener on unmount
    };
  }, []);


  const scrollEffect = inView ? Math.min(scrollPosition / 3, 100) : 0;

  return (
    <div ref={divRef} className="mx-[10%] text-center flex flex-col lg:flex-row justify-center items-center gap-x-[20px] pb-[40px] overflow-hidden">
      <div className="bg-[#0079A9] rounded-lg my-[10px] lg:my-[0px] lg:mx-[10px] transition-transform duration-500 ease-in-out"
        style={{
          transform: `${isFlexColumn ? `translateY(${100 - scrollEffect}%)` : `translateX(-${100 - scrollEffect}%)`}`
        }}>
        <img src='/images/page_images/Line1.png' alt="line1" className="py-4 px-[auto] px-4"></img>
        <p className="text-center text-white pb-4 text-[22px]">095-961-9901</p>
      </div>
      <div className="bg-[#E2B22C] rounded-lg my-[10px] lg:my-[0px] lg:mx-[10px] transition-transform duration-500 ease-in-out"
        style={{
          transform: `${isFlexColumn ? `translateY(${100 - scrollEffect}%)` : `translateX(-${100 - scrollEffect}%)`}`
        }}>
        <img src='/images/page_images/Line2.png' alt="line2" className="py-4 px-[auto] px-4"></img>
        <p className="text-center text-white pb-4 text-[22px]">089-660-9609</p>
      </div>
      <div className="bg-[#0079A9] rounded-lg my-[10px] lg:my-[0px] lg:mx-[10px] transition-transform duration-500 ease-in-out"
        style={{
          transform: `${isFlexColumn ? `translateY(${100 - scrollEffect}%)` : `translateX(-${100 - scrollEffect}%)`}`
        }}>
        <img src='/images/page_images/Line3.png' alt="line3" className="py-4 px-[auto] px-4"></img>
        <p className="text-center text-white pb-4 text-[22px]">081-694-5000</p>
      </div>
    </div>
  )
}

export default QRcodeComponent