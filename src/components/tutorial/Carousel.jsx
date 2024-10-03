import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
const Carousel = ({ images, description }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  //Logic for handeling if the left or right arrow will be shown
  //Logic for trigger congratulation confetti
  //Logic for progess bar percentage text
  useEffect(() => {
    //HTMLElements
    let leftBtn = document.getElementById('leftBtn');
    let rightBtn = document.getElementById('rightBtn');
    let progressBar = document.getElementById('progressBar');

    //Progess bar completion percent
    if (currentIndex !== images.length - 1)
      progressBar.style.width = `${((currentIndex + 1) * 100) / images.length}%`;

    // Disable or Enable left arrow
    if (currentIndex === 0) {
      leftBtn.style.opacity = '0%';
      leftBtn.disabled = true;
    } else {
      leftBtn.style.opacity = '100%';
      leftBtn.disabled = false;
    }

    // Disable or Enable right arrow
    // Trigger confetti and 100% Progress bar completion
    if (currentIndex === images.length - 1) {
      congratsCompletion();
      progressBar.style.width = '100%';

      rightBtn.style.opacity = '0%';
      rightBtn.disabled = true;
    } else {
      rightBtn.style.opacity = '100%';
      rightBtn.disabled = false;
    }
  }, [currentIndex]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  //Confetti explosion
  const congratsCompletion = () => {
    confetti({
      particleCount: 300, // Number of confetti pieces
      spread: 150, // Distance
      angle: 300, // Angle of the confetti spread
      origin: { x: 0, y: 0 }, // Relative position of the confetti explosion
    });
    confetti({
      particleCount: 300,
      spread: 150,
      angle: 240,
      origin: { x: 1, y: 0 },
    });
    confetti({
      particleCount: 300,
      spread: 150,
      angle: 270,
      origin: { x: 0.5, y: -0.3 },
    });
    confetti({
      particleCount: 300,
      spread: 360,
      angle: 270,
      origin: { x: 0.5, y: 0.5 },
    });
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Carousel */}
      <div className="relative overflow-hidden bg-gray-200 border-2 shadow-lg rounded-[25px] p-4">
        {/* Left arrow */}
        <button
          id="leftBtn"
          className="absolute transition-colors duration-150 left-2 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full"
          onClick={goToPrevious}
        >
          &#10094;
        </button>
        {/* Carousel image placeholder */}
        <div
          className="w-full min-h-64 bg-contain bg-no-repeat bg-center transition-transform duration-500"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        ></div>
        {/* Right arrow */}
        <button
          id="rightBtn"
          className="absolute transition-colors duration-150 right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full"
          onClick={goToNext}
        >
          &#10095;
        </button>
      </div>
      {/* Progress bar */}
      <div className="h-[50px] border-[5px] mt-4 border-gray-700  drop-shadow-md rounded-full overflow-hidden">
        {/* Progress bar */}
        <div
          id="progressBar"
          className="bg-green-600 flex ease-in justify-center items-center  h-[100%] transition-all duration-300 rounded-r-full"
        >
          <p className="text-white italic text-lg w290:text-xl drop-shadow-md ">
            {Number(((currentIndex + 1) * 100) / images.length).toPrecision(3)}%
          </p>
        </div>
      </div>
      {/* Image description */}
      <h1 className="min-h-[150px] mt-4 bg-gray-100 p-2 text-lg w400:text-xl text-center rounded-lg border-2 shadow-lg">
        {description[currentIndex] && description[currentIndex]}
      </h1>
    </div>
  );
};

export default Carousel;
