import laptopImg from '../assets/laptopManWoman.png';
import dislikeMan from '../assets/dislikeMan.png';
import horayWoman from '../assets/horayWoman.png';

import accOldInput from '../assets/tutorial/AccessOldInputs.png';
import chartSent from '../assets/tutorial/ChartSentences.png';
import compAverage from '../assets/tutorial/CompareAgainstAverage.png';
import getOverview from '../assets/tutorial/GetOverview.png';
import giveInput from '../assets/tutorial/GiveInput.png';
import improveScore from '../assets/tutorial/ImproveScore.png';
import newText from '../assets/tutorial/NewText.png';
import pressAnalyze from '../assets/tutorial/PressAnalyze.png';
import selectSentence from '../assets/tutorial/SelectSentence.png';
import sentimentDistribution from '../assets/tutorial/SentimentDistribution.png';
import docScore from '../assets/tutorial/docScore.png';

import Carousel from '../components/tutorial/Carousel.jsx';
import { PageConditionContext } from '../context/StateContext.jsx';
import { useContext } from 'react';

export const Tutorial = () => {
  const { setTutorial } = useContext(PageConditionContext);

  //Carousel Images
  const images = [
    giveInput,
    pressAnalyze,
    docScore,
    compAverage,
    selectSentence,
    getOverview,
    chartSent,
    sentimentDistribution,
    improveScore,
    newText,
    accOldInput,
  ];

  //Carousel image description
  const description = [
    'Type your input manually in the text box or upload a .txt file. You can insert up to 5000 characteres.',
    'Press "Analyze" to start the scanning. Do not forget that an inapropriate language will be discard!',
    'Document overall score. Try to maximize the score depending on your needs: -100 is a negative, 0 is a neutral, 100 is a positive overall sentiment transmited. The overall magnitude is the sum of every sentence magnitude.',
    'Compare your text results on a scale. The gray bar represents the suit spots where for a positive, neutral and negative. Try to optimize your text to get as close to the extreme or in the middle.',
    "Use the visual representation of your sentences' score to understand the evolution of the transmited emotions. Click on any sentence to get a review.",
    "Every sentece has it's own score and magnitude, try to optimize the sentence if the score is not suitable. The overview gives a general description of the transmited emotions",
    'Emotion evolution sentence by sentence. This chart suggests the emotional rollercoster your text posses.',
    'Emotion distribution in text, this chart showcase a static about the intesity of emotion transmited',
    '"Improve Score" button will return you to your text, and let you modify it to get a better score. You can compare your previous results too.',
    '"New Text To Analyze" button will return you to the input section, but the future input will not be sync to the current one.',
    'Access any of your past inputs and continue to work on them, or create a new one using "New Analyze".',
  ];

  //Close the tutorial interface
  const closeTutorial = () => {
    localStorage.setItem('firstTime', false);
    setTutorial(false);
  };

  return (
    <div className=" flex justify-center items-center absolute top-0 left-0 h-[100%] min-w-[100%] z-30 bg-slate-700/50 backdrop-blur-sm">
      <div className="relative w-[100%] p-2  rounded-lg bg-gradient-to-t  from-gray-100 to-gray-300 drop-shadow-lg  sm:h-[960px] sm:w-[620px] w290:p-[10px] w400:p-5">
        {/* Close Tutorial Button */}
        <div
          onClick={closeTutorial}
          className=" flex items-center justify-center absolute right-2 top-2 h-[45px] w-[45px]  border-2 rounded-full cursor-pointer  bg-white  text-gray-600 border-slate-300 shadow-md duration-200 transition-colors hover:text-red-800 hover:border-red-800"
        >
          <p className=" font-bold text-2xl">X</p>
        </div>
        {/* Header: Lukas & Nadia image and welcome text  */}
        <div className="flex flex-col gap-3  justify-between items-center mb-5 w400:gap-0 w400:flex-row">
          <img
            className="drop-shadow-lg"
            src={laptopImg}
            width={'200px'}
            height={'200px'}
          />
          <h1 className="text-4xl text-center italic text-stroke2 font-bold text-gray-100 drop-shadow-md">
            Welcome to <br />
            Emotion Analyzer
          </h1>
        </div>

        {/* Message from Lukas & Nadia */}
        <h2 className="relative border-2 rounded-lg mb-10 p-3 text-lg bg-gray-200 drop-shadow-lg  w290:text-xl w400:text-2xl">
          <span className="text-8xl absolute top-[-23px] left-[-13px] w290:left-[-15px] w400:left-[-17px] text-stroke2 text-gray-700">
            "
          </span>
          I am <span className="italic font-bold">Nadia</span>, and togheter
          with my friend <span className="italic font-bold">Lukas</span> will
          take you though a complet tour of our tool
          <span className="absolute bottom-[-67px] right-[-13px] text-8xl text-stroke2 text-gray-700 w290:right-[-17px] w400:right-[-19px]">
            "
          </span>
        </h2>

        {/* Carousel component, display the above images */}
        <Carousel images={images} description={description} />
      </div>
    </div>
  );
};
