import '../css/ScrollUp.css';
import { IoIosArrowUp } from "react-icons/io";
  const ScrollUp: React.FC = () => {

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
    
      });
    };
  
   
    return (
      <>
      
      
   
      <button data-aos="fade-down" className='  showScrollUp ' onClick={scrollToTop}>
        <IoIosArrowUp onClick={scrollToTop} className="ArrowIcon" />
      </button>
   
      </>
    );
  };

  export default ScrollUp;