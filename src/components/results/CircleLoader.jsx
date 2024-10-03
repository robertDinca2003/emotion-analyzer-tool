import { useContext, useEffect, useRef, useState } from 'react';
import { PageConditionContext } from '../../context/StateContext';
import { getSentimentColor } from '../../utils/utility';
export const CircleLoader = ({ percent, name, duration }) => {
  const circularProgress = useRef(null);

  const [inAnimation, setInAnimation] = useState(true);

  const { isAnalyzing } = useContext(PageConditionContext);
  const getCircleColor = () => {
    // Setting the circle color
    if (name == 'score') {
      return getSentimentColor(percent / 100);
    }

    // Setting the circle color
    if (name == 'magnitude') {
      return getSentimentColor((percent * 2 - 100) / 100);
    }
  };

  const progressAnimation = () => {
    // Setting up the animation parameters
    let startValue = 0;
    let endValue = percent;
    if (name == 'magnitude') endValue = 100;
    let speed = 15;

    // Setting the circle color
    let progressColor = getCircleColor();
    if (!circularProgress.current) return;
    circularProgress.current.style.color = progressColor;
    circularProgress.current.style.background = `conic-gradient(${progressColor} ${startValue * 3.6}deg, #d1d5db 0deg`;

    // Start Animation
    setTimeout(() => {
      const progress = setInterval(() => {
        //For every 'speed' amount of milliseconds, the circle will increase
        if (!circularProgress.current) {
          clearInterval(progress);
          return;
        }
        startValue++;
        circularProgress.current.style.color = progressColor;
        circularProgress.current.style.background = `conic-gradient(${progressColor} ${startValue * 3.6}deg, #d1d5db 0deg`;

        //Animation will stop when the startValue will reach endValue
        if (startValue >= Math.abs(endValue)) {
          clearInterval(progress);
          setInAnimation(false);
        }
      }, speed);
    }, duration * 1000);
  };

  useEffect(() => {
    if (!inAnimation && circularProgress.current && percent) {
      let progressColor = getCircleColor();

      circularProgress.current.style.color = progressColor;
      if (name === 'score')
        circularProgress.current.style.background = `conic-gradient(${progressColor} ${Math.abs(percent) * 3.6}deg, #d1d5db 0deg`;
      else {
        circularProgress.current.style.background = `conic-gradient(${progressColor} ${100 * 3.6}deg, #d1d5db 0deg`;
      }
    }
  }, [percent, inAnimation]);

  useEffect(() => {
    return progressAnimation();
  }, []);

  return (
    <div
      id={name}
      ref={circularProgress}
      className="flex justify-center items-center w-[100px] h-[100px] rounded-full "
    >
      <div className="flex justify-center items-center w-[70px] h-[70px] bg-gray-100 rounded-full  ">
        <p className="text-gray-800 text-3xl font-bold italic">{percent}</p>
      </div>
    </div>
  );
};
