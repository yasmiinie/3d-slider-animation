import React, { useState, useEffect, useRef } from 'react';

const ThreeDCarousel = ({ images = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const stageRef = useRef(null);
    const boxesRef = useRef([]);
    const animationRef = useRef(null);
    
    // Number of boxes to display
    const boxCount = images.length || 13;
    // Angle between each box
    const angle = 360 / boxCount;
    // Radius of the carousel
    const radius = 300;
    // Rotation speed (lower number = faster rotation)
    const rotationSpeed = 30; // milliseconds per degree
  
    useEffect(() => {
      // Set up the initial positions of the boxes
      boxesRef.current.forEach((box, index) => {
        if (box) {
          const rotationY = index * angle;
          box.style.transform = `rotateY(${rotationY}deg) translateZ(${radius}px)`;
          box.dataset.rotationY = rotationY;
        }
      });
  
      // Start automatic rotation
      let lastTime = 0;
      let totalRotation = 0;
  
      const animateCarousel = (timestamp) => {
        if (!lastTime) lastTime = timestamp;
        const deltaTime = timestamp - lastTime;
        
        // Calculate how much to rotate based on time passed
        const rotationAmount = deltaTime / rotationSpeed;
        totalRotation += rotationAmount;
        
        // Apply rotation to all boxes
        boxesRef.current.forEach((box, index) => {
          if (box) {
            const currentRotation = parseFloat(box.dataset.rotationY);
            const newRotation = currentRotation + rotationAmount;
            box.dataset.rotationY = newRotation;
            
            // Apply the new rotation without transition for smooth animation
            box.style.transition = 'none';
            box.style.transform = `rotateY(${newRotation}deg) translateZ(${radius}px)`;
          }
        });
  
        // Update the current index based on total rotation
        if (totalRotation >= angle) {
          setCurrentIndex(prev => (prev + 1) % boxCount);
          totalRotation = 0;
        }
  
        lastTime = timestamp;
        animationRef.current = requestAnimationFrame(animateCarousel);
      };
  
      animationRef.current = requestAnimationFrame(animateCarousel);
  
      // Clean up animation on unmount
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, []);
  
    // Create an array of colors for the boxes
    const boxColors = [
      'bg-[hsla(80,100%,50%,0.8)]',
      'bg-[hsla(40,100%,50%,0.8)]',
      'bg-[hsla(0,100%,50%,0.8)]',
      'bg-[hsla(120,100%,50%,0.8)]',
      'bg-[hsla(280,100%,50%,0.8)]',
      'bg-[hsla(200,100%,50%,0.8)]',
      'bg-[hsla(240,100%,50%,0.8)]',
      'bg-[hsla(160,100%,50%,0.8)]',
      'bg-[hsla(320,100%,50%,0.8)]',
      'bg-[hsla(350,100%,50%,0.8)]',
      'bg-[hsla(360,100%,50%,0.8)]',
      'bg-[hsla(10,100%,50%,0.8)]',
      'bg-[hsla(30,100%,50%,0.8)]'
    ];
  
    return (
      <div className=" min-h-screen ">
        <div className="w-full max-w-[680px]  mx-auto  p-1">
          <div 
            ref={stageRef}
            className="h-[325px] mt-4 ml-4 mr-2 text-gray-200 relative"
            style={{
              perspective: '1100px',
              transformStyle: 'preserve-3d'
            }}
          >
            {Array.from({ length: boxCount }).map((_, index) => (
              <div
                key={index}
                ref={(el) => (boxesRef.current[index] = el)}
                className={`absolute w-[180px] h-[180px] ${boxColors[index % boxColors.length]} 
                           m-[10px_20px_20px_235px] inline-block overflow-hidden`}
                style={{
                  transformOrigin: '50% 50%',
                  transform: `rotateY(${index * angle}deg) translateZ(${radius}px)`,
                }}
              >
              
                <div className="w-full h-full absolute flex items-center justify-center text-white font-bold text-2xl">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ThreeDCarousel;