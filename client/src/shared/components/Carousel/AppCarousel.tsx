import React, { useState, useEffect } from 'react';
import AppButton from '../Buttons/AppButton';
import LazyImage from '../LazyImage';
import styled from 'styled-components'

interface CarouselProps {
  images: string[];
  interval: number;
}

const AppCarousel: React.FC<CarouselProps> = ({ images, interval  }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [interval]);

  return (
    <AppCarouselStyle>
      <div className="vs-carousel">
          <AppButton className='d-md-none' variant="dark" icon="angle-left" onClick={prevSlide} ariaLabel='Back image'></AppButton>
          <div className="vs-carousel-items">
              {images.map((image, index) => (
                  <LazyImage 
                  key={index}
                  src={image}
                  alt={`Imagen ${index + 1}`}
                  className={index === currentImageIndex ? 'active' : ''}
                  />
              ))}
          </div>
          <AppButton className='d-md-none' variant="dark" icon="angle-right" onClick={nextSlide} ariaLabel='Next image'></AppButton>
      </div>
    </AppCarouselStyle>
  );
};

export default AppCarousel;

const AppCarouselStyle = styled.div `
  .vs-carousel {
    display: flex;
    align-items: center;
    margin: 0.5rem 0;
  }
  .vs-carousel-items {
    display: flex;
    overflow: hidden;
    gap: 1rem;
    border-radius: 10px;
  }
  .vs-carousel-items img {
    width: 350px;    
    height: 120px;
    object-fit: cover;
    display: none;
  }

  .vs-carousel-items img.active {
    display: block;
  }

  .vs-carousel-items button {
    font-size: 1.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--color-gray-400);
  }

  .vs-carousel-items button:focus {
    outline: none;
  }

  @media (min-width: 992px) {
    .vs-carousel-items {
        display: flex; 
    }
    .vs-carousel-items img {
        max-width: 100%;
        display: block;
    }
    .vs-carousel {
        margin: 0.5rem 1.5rem;
    }
  }
`