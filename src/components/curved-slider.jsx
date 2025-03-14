import React, { useState, useEffect, useRef } from 'react';

const CurvedSlider = ({ images = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const isHoveringRef = useRef(false);
    const stageRef = useRef(null);
    const boxesRef = useRef([]);
    const animationRef = useRef(null);
    const lastTimeRef = useRef(0);
    const totalRotationRef = useRef(0);
    
    // Use the images passed as props
    const carouselImages = images;
    
    // Number of images to display
    const boxCount = carouselImages.length;
    
    // Angle between each image
    const angle = 360 / boxCount;
    
    // Radius of the carousel
    const radius = 720;
    
    // Rotation speed (lower number = faster rotation)
    const rotationSpeed = 38; // milliseconds per degree
    
    // Define hover event handlers that modify the ref directly
    const handleMouseEnter = () => {
      isHoveringRef.current = true;
    };
    
    const handleMouseLeave = () => {
      isHoveringRef.current = false;
    };
  
    // Set up animation loop
    useEffect(() => {
      // Set up the initial positions of the images
      boxesRef.current.forEach((box, index) => {
        if (box) {
          const rotationY = index * angle;
          box.style.transform = `rotateY(${rotationY}deg) translateZ(${radius}px)`;
          box.dataset.rotationY = rotationY;
        }
      });
  
      // Create a persistent animation function
      const animateCarousel = (timestamp) => {
        if (!lastTimeRef.current) lastTimeRef.current = timestamp;
        const deltaTime = timestamp - lastTimeRef.current;
        
        // Calculate how much to rotate based on time passed
        // Reduce speed when hovering using the ref
        const hoverSpeedFactor = isHoveringRef.current ? 0.3 : 1;
        const rotationAmount = (deltaTime / rotationSpeed) * hoverSpeedFactor;
        totalRotationRef.current += rotationAmount;
        
        // Apply rotation to all images
        boxesRef.current.forEach((box, index) => {
          if (box) {
            const currentRotation = parseFloat(box.dataset.rotationY);
            const newRotation = currentRotation + rotationAmount;
            box.dataset.rotationY = newRotation;
            
            // Apply the new rotation without transition for smooth animation
            box.style.transition = 'none';
            
            // Store the base transform without any hover effects
            const baseTransform = `rotateY(${newRotation}deg) translateZ(${radius}px)`;
            box.dataset.baseTransform = baseTransform;
            box.style.transform = baseTransform;
            
            // Hide front-facing images (those within a certain angle range)
            const normalizedRotation = newRotation % 360;
            const isFrontFacing = normalizedRotation <= 60 || normalizedRotation >= 300;
            
            box.style.opacity = isFrontFacing ? '0' : '1';
          }
        });
        
        // Update the current index based on total rotation
        if (totalRotationRef.current >= angle) {
          setCurrentIndex(prev => (prev + 1) % boxCount);
          totalRotationRef.current = 0;
        }
        
        lastTimeRef.current = timestamp;
        animationRef.current = requestAnimationFrame(animateCarousel);
      };
      
      // Start the animation
      animationRef.current = requestAnimationFrame(animateCarousel);
      
      // Clean up animation on unmount only
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [angle, boxCount, radius, rotationSpeed]);
  
    // Individual card hover handlers
    const handleCardMouseEnter = (index) => {
      const box = boxesRef.current[index];
      if (box && box.dataset.baseTransform) {
        // Apply the upward translation by modifying the transform
        const baseTransform = box.dataset.baseTransform;
        box.style.transform = `${baseTransform} translateY(-15px)`;
        box.style.transition = 'transform 0.3s ease'; // Add smooth transition
      }
    };
    
    const handleCardMouseLeave = (index) => {
      const box = boxesRef.current[index];
      if (box && box.dataset.baseTransform) {
        // Remove the upward translation by reverting to base transform
        box.style.transform = box.dataset.baseTransform;
        box.style.transition = 'transform 0.3s ease'; // Keep smooth transition for return
      }
    };
  
    return (
      <div className=" min-h-screen ">
        <div className="w-full max-w-[680px]  mx-auto p-1">
          <div
            ref={stageRef}
            className="h-[325px] mt-4 ml-4 mr-2 text-gray-200 relative cursor-pointer"
            style={{
              perspective: '1100px',
              transformStyle: 'preserve-3d'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {carouselImages.map((imageUrl, index) => (
              <div
                key={index}
                ref={(el) => (boxesRef.current[index] = el)}
                className="absolute w-[180px] h-[280px] m-[10px_20px_20px_235px] inline-block rounded-lg overflow-hidden"
                style={{
                  transformOrigin: '50% 50%',
                  transform: `rotateY(${index * angle}deg) translateZ(${radius}px)`,
                }}
                onMouseEnter={() => handleCardMouseEnter(index)}
                onMouseLeave={() => handleCardMouseLeave(index)}
              >
                <img 
                  src={imageUrl} 
                  alt={`Carousel image ${index + 1}`}
                  className="w-full h-full object-cover pointer-events-none" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default CurvedSlider;