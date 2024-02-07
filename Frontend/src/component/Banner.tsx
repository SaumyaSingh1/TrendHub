import { useState, useEffect } from 'react';
import mensSlider from "../assets/MensSlider.png";
import womensSlider from "../assets/womensSlider.png";
import kidsSlider from "../assets/kidsSlider2.png";
import { Link } from 'react-router-dom';

function Banner() {
  const properties = {
    height: "70vh",
    width: "100%",
  };

  const SliderArray = [
    { image: mensSlider, key: "womens", category: "women's wear" },
    { image: womensSlider, key: "mens", category: "men's wear" },
    { image: kidsSlider, key: "kids", category: "kid's wear" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const bannerFxn = () => {
    const nextIndex = (currentIndex + 1) % SliderArray.length;
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    const interval = setInterval(bannerFxn, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className='relative'>
      <Link to='/inventory' state={{ category: SliderArray[currentIndex].category }}>
        <img src={SliderArray[currentIndex].image} style={properties} className='py-5' alt="Banner" />
        <div className="absolute bottom-12 left-0 text-white p-4 bg-black bg-opacity-50">50% OFF </div>
      </Link>
    </div>
  );
}

export default Banner;
