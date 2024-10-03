import { useEffect } from 'react';
import triangle from '../../assets/triangle.svg';

//Component out of use
export const MagnitudeProgress = ({ magnitude }) => {
  //Positioning the blue triange
  useEffect(() => {
    let position;
    if (magnitude < 0.5) position = 'calc(16.5% - 15px)';
    if (magnitude < 1.5) position = 'calc(50% - 15px)';
    else position = 'calc(83.5% - 15px)';

    document.getElementById('triangle').style.left = position;
  }, []);

  return (
    <div className=" flex flex-row relative h-[35px] w-[300px]  italic text-gray-800">
      <div className="flex justify-center items-center w-[33%] h-[100%] bg-red-700  rounded-l-full">
        <p> 0 - 0.5</p>
      </div>
      <div className="flex justify-center items-center w-[33%] h-[100%] bg-yellow-300 ">
        <p> 0.5 - 1.5</p>
      </div>
      <div className="flex justify-center items-center w-[33%] h-[100%] rounded-r-full bg-green-600  ">
        <p>1.5+</p>
      </div>
      <img
        id="triangle"
        className="absolute top-[-12px] h-[20px] w-[30px]"
        src={triangle}
      />
    </div>
  );
};
