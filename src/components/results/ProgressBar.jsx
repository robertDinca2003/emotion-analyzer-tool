import { useEffect } from 'react';
import triangle from '../../assets/triangle.svg';

export const ProgressBar = ({ score }) => {
  // Setting the position of the blue arrow on the vizualization
  useEffect(() => {
    document.getElementById('myScore').style.left =
      `calc(${Math.floor((score + 100) / 2)}% - 15px)`;
    document.getElementById('title').style.left =
      `calc(${Math.floor((score + 100) / 2)}% - 18px - 15px)`;
  }, []);

  return (
    // Colored bar from red via yellow to green
    <div className=" relative w-[100%] min-h-[30px] rounded-full border-gray-600 bg-gradient-to-r from-red-700 via-yellow-300 to-green-600">
      {/* Negative text marker */}
      <div className="absolute left-[10%] top-[-7.5px] w-[7.5px] h-[45px] bg-gray-400 rounded-lg"></div>
      {/* Netral text marker */}
      <div className="absolute left-[50%] top-[-7.5px] w-[7.5px] h-[45px] bg-gray-400 rounded-lg"></div>
      {/* Pozitive text marker */}
      <div className="absolute left-[90%] top-[-7.5px] w-[7.5px] h-[45px] bg-gray-400 rounded-lg"></div>
      {/* Blue triangle */}
      <div
        id="myScore"
        className="absolute top-[-8px] w-[30px] h-[20px] rounded-lg"
      >
        <img src={triangle} />
      </div>
      {/* Text above blue triangle */}
      <p
        id="title"
        className="absolute top-[-33px] w-max font-bold text-gray-800"
      >
        Your Text
      </p>
    </div>
  );
};
