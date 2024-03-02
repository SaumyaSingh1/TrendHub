import { useState, useEffect } from 'react';
import mensSlider from "../assets/MensSlider.png";
import womensSlider from "../assets/womensSlider.png";
import kidsSlider from "../assets/kidsSlider2.png";
import { Link } from 'react-router-dom';

function Banner() {
  // Properties for slider dimensions
  const properties = {
    height: "70vh", // Height of the slider
    width: "100%", // Width of the slider
  };

  // Array containing slider images and categories
  const SliderArray = [
    { image: mensSlider, key: "womens", category: "women's wear" }, // Men's wear image
    { image: womensSlider, key: "mens", category: "men's wear" }, // Women's wear image
    { image: kidsSlider, key: "kids", category: "kid's wear" }, // Kids' wear image
  ];

  // State variable to keep track of current index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle banner rotation
  const bannerFxn = () => {
    // Calculate the index of the next image in the SliderArray
    const nextIndex = (currentIndex + 1) % SliderArray.length;
    setCurrentIndex(nextIndex); // Update the currentIndex
  };

  // useEffect hook to run bannerFxn at an interval
  useEffect(() => {
    const interval = setInterval(bannerFxn, 3000); // Rotate the banner every 3 seconds
    return () => clearInterval(interval); // Cleanup function to clear the interval
  }, [currentIndex]); // Run useEffect whenever currentIndex changes

  return (
    <div className='relative'>
      {/* Link to inventory page with category state */}
      <Link to='/inventory' state={{ category: SliderArray[currentIndex].category }}>
        {/* Image slider */}
        <img src={SliderArray[currentIndex].image} style={properties} className='py-5' alt="Banner" />
        {/* Discount overlay */}
        <div className="absolute bottom-12 left-0 text-white p-4 bg-black bg-opacity-50">50% OFF </div>
      </Link>
    </div>
  );
}

export default Banner;
