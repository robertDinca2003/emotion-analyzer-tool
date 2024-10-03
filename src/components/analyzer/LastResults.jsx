import { useEffect, useState } from 'react';
import { CircleLoader } from '../results/CircleLoader';

export const LastResults = ({ analyzeHistory }) => {
  const [index, setIndex] = useState(analyzeHistory.score.length - 1);

  //Set the index to the latest modification of the input
  useEffect(() => {
    setIndex(analyzeHistory.score.length - 1);
  }, [analyzeHistory]);

  //Logic for showing the left and right arrow
  //such that the index will not go on negative
  useEffect(() => {
    let btnLeft = document.getElementById('left');
    let btnRight = document.getElementById('right');
    if (index == 0) {
      btnLeft.style.display = 'none';
    } else {
      btnLeft.style.display = 'block';
    }
    if (index == analyzeHistory.score.length - 1) {
      btnRight.style.display = 'none';
    } else {
      btnRight.style.display = 'block';
    }
  }, [index]);

  const increaseIndex = (increment) => {
    setIndex(index + increment);
  };

  return (
    <div className="flex flex-col justify-center gap-4 relative w-[100%]  px-2 py-6 border-2 rounded-[20px] bg-white/60 border-gray-100/30 backdrop-blur-lg shadow-lg divide-solid w400:p-[25px]  w800:w-[800px]">
      <h2 className="italic text-2xl text-gray-800">Analyze History</h2>
      {/* Score and Magnitude vizualization */}
      <div className="flex flex-col items-center justify-between gap-4 w290:gap-0 w290:flex-row ">
        <div>
          <CircleLoader
            duration={-3.5}
            name={'score'}
            percent={Math.floor(analyzeHistory.score[index])}
          />
          <p className="text-center text-xl">Score</p>
        </div>
        <div>
          <CircleLoader
            duration={-3.5}
            name={'magnitude'}
            percent={Math.floor(analyzeHistory.magnitude[index] * 100)}
          />
          <p className="text-center text-xl">Magnitude</p>
        </div>
      </div>
      {/* Review text and Copy button */}
      <div className="flex flex-col justify-between items-center w290:flex-row">
        <h3 className="text-xl italic text-gray-800">Review {index + 1}</h3>
        <button
          onClick={() => {
            navigator.clipboard.writeText(analyzeHistory.text[index]);
            alert('Copied to clipboard');
          }}
          className="p-2 px-5 cursor-pointer border-2 rounded-[20px] border-slate-100 bg-slate-300/20  text-gray-800  shadow-md  transition-colors duration-200 hover:bg-slate-300 hover:text-gray-50"
        >
          Copy text
        </button>
      </div>
      {/* Text area to preview past inputs */}
      <div className="relative">
        {/* Old Input */}
        <p className="h-[300px] p-2 border-2 rounded-[12px] bg-slate-300/30  border-slate-300 shadow-md overflow-y-scroll ">
          {analyzeHistory.text[index]}
        </p>
        {/* Left arrow */}
        <button
          onClick={() => increaseIndex(-1)}
          id={'left'}
          className="absolute top-[calc(50%-40px)] left-[-5px] px-4 py-2 rounded-full text-gray-50 bg-gray-700/30 w400:left-[-24px] hover:bg-gray-700/50 "
        >
          &#10094;
        </button>
        {/* Right arrow */}
        <button
          onClick={() => increaseIndex(1)}
          id={'right'}
          className="absolute top-[calc(50%-40px)] right-[-5px] px-4 py-2 rounded-full text-gray-50 bg-gray-700/30  w400:right-[-24px] hover:bg-gray-700/50   "
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};
