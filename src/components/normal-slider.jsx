import React, { useState, useEffect, useRef } from 'react';

const AutomaticImageSlider = ({ images }) => {
  const [speed, setSpeed] = useState(1);
  const sliderRef = useRef(null);
  const positionRef = useRef(0);
  
  // Clone the images array to create an infinite loop effect
  const extendedImages = [...images, ...images, ...images];
  
  useEffect(() => {
    const slider = sliderRef.current;
    let animationId;
    
    const animate = () => {
      positionRef.current -=5 * speed;
      
      // Reset position when a full set of images has passed
      if (Math.abs(positionRef.current) >= (images.length * 300)) {
        positionRef.current = 0;
      }
      
      if (slider) {
        slider.style.transform = `translateX(${positionRef.current}px)`;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [speed, images.length]);
  
  return (
    <div 
      className="w-full  relative"
      onMouseEnter={() => setSpeed(0.3)}
      onMouseLeave={() => setSpeed(1)}
      style={{ width: '100vw' }}
    >
      <div 
        ref={sliderRef}
        className="flex"
        style={{ willChange: 'transform' }}
      >
        {extendedImages.map((image, index) => (
          <div 
            key={index}
            className="w-72 h-80 flex-shrink-0 mx-4 relative transition-transform duration-300 hover:-translate-y-6"
          >
            <div className="w-full h-full  shadow-lg rounded">
              <img 
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomaticImageSlider;