import { useState } from 'react';
import okMan from '../../assets/okMan.png';

export const LukaTip = () => {
  // Picking a random number
  const [tipNumber, setTipNumber] = useState(Math.trunc(Math.random() * 5));

  // Picking one of the below tips based on tipNumber
  const tips = [
    'Increase negative emotions: Use strong, emotionally charged words: Incorporate harsh or extreme language that evokes pain, anger, or sadness. For example, use words like "devastated," "betrayed," "miserable," or "hopeless.',
    'Increase negative emotions: Describe personal or irreversible loss: Focus on irreversible situations or personal devastation, emphasizing hopelessness or frustration.',
    'Increase positive emotions: Use exuberant, joyful language: Incorporate vibrant and energetic words like "ecstatic," "blissful," "overjoyed," or "elated."',
    'Increase positive emotions: Emphasize achievement or connection: Focus on moments of great success or personal fulfillment, highlighting feelings of accomplishment, love, or deep satisfaction.',
    'Keep neutral emotions: Keep the language factual and balanced: Avoid strong adjectives and emotional language, focusing on straightforward, objective descriptions.',
  ];

  return (
    <div className=" flex gap-5 flex-col-reverse items-center relative w800:gap-0 w800:flex-row w800:w-[800px] w800:h-[150px]">
      <h3 className="min-h-[150px] p-3 pt-[24px] border-2 rounded-xl text-center text-gray-700 italic  text-md w400:text-xl  bg-white/60 ">
        <span className="hidden absolute top-[-23px] left-[-17px] text-8xl  text-stroke2 text-gray-700 w800:block">
          "
        </span>
        <span className="hidden absolute top-[-16px] left-[30px] text-3xl   text-gray-700 w800:block ">
          Lukas' Tip
        </span>
        {tips[tipNumber]}
        <span className="hidden absolute bottom-[-67px] right-[150px] text-8xl text-stroke2 text-gray-700 w800:block">
          "
        </span>
      </h3>
      <img
        className=" h-[150px] w-[150px] ml-3 drop-shadow-lg"
        width={150}
        height={150}
        src={okMan}
      />
    </div>
  );
};
