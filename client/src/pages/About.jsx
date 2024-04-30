import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import backgroundImageUrl from '../assets/pexels-photo-290518.jpeg';

const About = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const textElement = textRef.current;
      const scrollPosition = window.pageYOffset;
      const elementPosition = textElement.offsetTop;
      const windowHeight = window.innerHeight;

      if (scrollPosition > elementPosition - windowHeight + 200) {
        textElement.style.opacity = 1;
        textElement.style.transform = 'translateY(0)';
      } else {
        textElement.style.opacity = 0;
        textElement.style.transform = 'translateY(50px)';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center">
      <Link to="/search" className="absolute inset-0 w-full h-full">
        <div
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%',
          }}
        ></div>
      </Link>
      <div className="relative z-10 max-w-3xl px-8">
        <div
          ref={textRef}
          className="opacity-0 transform translate-y-50 transition-all duration-1000 bg-gray-900 bg-opacity-80 rounded-lg p-8 text-white"
        >
          <h2 className="text-4xl font-bold mb-4">About WoodlandEscape</h2>
          <p className="text-lg leading-relaxed mb-4">
            At WoodlandEscape, we believe that nature has a way of rejuvenating the soul and bringing peace to the mind. Our passion lies in providing individuals with the opportunity to connect with the beauty of the great outdoors through memorable woodland getaways.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Founded with a love for nature and a desire to share its wonders with others, WoodlandEscape is more than just a rental and real estate website it's a gateway to serenity and tranquility. We understand the allure of escaping the hustle and bustle of city life, and we're committed to helping you find the perfect woodland retreat where you can unwind, recharge, and reconnect with nature.
          </p>
          <p className="text-lg leading-relaxed mb-8">
            Our mission is simple: to help you discover the magic of the woods and create cherished memories that last a lifetime. So why wait? Start your journey to tranquility today with WoodlandEscape – where the beauty of nature awaits.
          </p>
          <Link to="/search" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Explore Properties
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;