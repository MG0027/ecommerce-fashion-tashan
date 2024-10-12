import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './slideshow.module.css';

const slides = [
  {
    url: '/images/1448078.jpg',
    buttonLabel: 'EXPLORE NOW',
   
  },
  {
    url: '/images/thumb-1920-242452.jpg',
    buttonLabel: 'EXPLORE NOW',
   
  },
  {
    url: '/images/fashion-for-men.jpg',
    buttonLabel: 'EXPLORE NOW',
    
  },
  {
    url: '/images/Desktop-Fashion-HD-Wallpapers.jpg',
    buttonLabel: 'EXPLORE NOW',
   
  },
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.container}>
      <img
        src={slides[currentIndex].url}
        alt={`Slide ${currentIndex + 1}`}
        className={styles.image} style={{ objectFit:'cover', overflow:'hidden'}}
      />
      <Link
        to="/men"
        className={styles.button}
        style={{fontFamily:'Futura, sansSerif'}}
      >
        {slides[currentIndex].buttonLabel}
      </Link>

      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className={`${styles.arrowButton} ${styles.arrowButtonLeft}`}
      >
        &lt;
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className={`${styles.arrowButton} ${styles.arrowButtonRight}`}
      >
        &gt;
      </button>
    </div>
  );
};

export default Slideshow;
