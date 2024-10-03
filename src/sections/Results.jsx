import { useEffect, useState, useContext, useRef } from 'react';
import { isApropriateLanguage, messageEmotion } from '../utils/utility.js';
import { CircleLoader } from '../components/results/CircleLoader.jsx';
import { ProgressBar } from '../components/results/ProgressBar.jsx';
import { MagnitudeProgress } from '../components/results/MagnitudeProgress.jsx';
import { SentencePreview } from '../components/results/SentencePreview.jsx';
import { SentenceAnalyze } from '../components/results/SentenceAnalyze.jsx';
import { ChartSentence } from '../components/results/ChartSentence.jsx';
import { ChartEmotionDistribution } from '../components/results/ChartEmotionDistribution.jsx';
import { ChartOverallEvolution } from '../components/results/ChartOverallEvolution.jsx';
import {
  InputInfoContext,
  AnalyzeDataContext,
  PageConditionContext,
} from '../context/StateContext';

/*
  HTML Structure

  // It occupies the entire page
  // Is above the Analyzer Tool and the Side bar
  <div id='analyzeTab' style='absolute'>
      <div id='placeholder'>
          // Holds all different components(containg metrics)
          <div id='whole-loading'>

          // Loading animation
            <div>
                // Three dots loader
            </div>
            <div>
                // Progress bar loader
            </div>

          //After the loading animation, the following components
          // will receive a display:flex instead of hidden
          // and the loading components will be hidden
            <div>
              // Document Overall score and magnitude
            </div>

            <div>
              // Overall Score on a comparasion progress bar
            </div>

            <div>
              // Charts Section, Containg 3 charts for
              // sentence by sentence score evolution, emotion tone distribution, overall scoring evolution
            </div>

            <div>
              // Sentence preview
            </div>

            <button>Improve Score</button>
            <button>New Text To Analyze</button>

          </div>
      </div>
  </div>

*/

/*
  Animation structure

  First part:
    Fake loader,
    Continues until the progress bar is full
  Transition 1:
    The fake loader will disapear
  Transition 2:
    The size of the placeholder will increase
  Part 2:
    All sections with analytics will show up
*/

export const Results = () => {
  const { evaluation, analyzeHistory, setAnalyzeHistory } =
    useContext(AnalyzeDataContext);

  const { setInput, newText, setNewText, currentTextID } =
    useContext(InputInfoContext);

  const { setIsAnalyzing, windowSize, setTutorial } =
    useContext(PageConditionContext);

  const [currentStatus, setCurrentStatus] = useState(0);
  const [duration, setDuration] = useState(Math.random() * 5 + 5);
  const [selectedSentence, setSelectedSentence] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const HTMLElemenetsRef = useRef({});

  const textVerifying = [
    'Sending your text to evaluation...',
    'Checking for non family friendly language...',
    'Scanning Text Emotional Score...',
    'Results Received',
  ];
  //Updating the layout depending on screen size
  useEffect(() => {
    if (!isLoaded) return;
    const elements = HTMLElemenetsRef.current;

    //Geting all sections from the analyze results
    let cards = document.getElementsByClassName('holder');

    if (Math.min(windowSize.width, windowSize.height) >= 1000) {
      //Absolut positioning of the sections
      elements.holeLoading.style.height = '90vh';
      elements.holeLoading.style.width = '90%';
      for (let i = 0; i < cards.length; i++) {
        cards[i].classList.add('absolute');
        cards[i].style.width = '';
      }
      elements.placeholder.classList.add('items-center');
      elements.chartArea.style.height = '';
      elements.sentenceArea.style.height = '';
      elements.sentenceArea.style.overflowY = '';
      elements.btnImprove.style.height = '';
      elements.btnNewText.style.height = '';
      elements.documentScoreArea.style.height = '';
      elements.ratingArea.style.height = '';
    } else {
      //Displaying in one column, flex

      elements.holeLoading.style.height = '2400px';

      if (Math.min(windowSize.width, windowSize.height) > 650)
        elements.holeLoading.style.width = '90%';
      else elements.holeLoading.style.width = '100%';
      if (Math.min(windowSize.width, windowSize.height) < 400)
        elements.holeLoading.style.padding = '4px';

      //Removing position absolute
      for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove('absolute');
        cards[i].style.width = '100%';
      }
      elements.placeholder.classList.remove('items-center');

      //Setting fixed height for every section
      elements.chartArea.style.height = '1000px';
      elements.sentenceArea.style.height = '600px';
      elements.sentenceArea.style.overflowY = 'scroll';
      elements.btnImprove.style.height = '50px';
      elements.btnNewText.style.height = '50px';
      elements.documentScoreArea.style.height = '175px';
      elements.ratingArea.style.height = '250px';
    }
  }, [windowSize]);

  //Checking for inapropriate language
  //If found, it will cancel the analyzing animation
  //and alert the user
  const verifyInapropriateLanguage = (timeout) => {
    if (!isApropriateLanguage(evaluation, true)) {
      let copyAnalyzeHistory;

      copyAnalyzeHistory = JSON.parse(JSON.stringify(analyzeHistory));

      if (newText) {
        copyAnalyzeHistory.pop();
      } else {
        copyAnalyzeHistory[currentTextID].score.pop();
        copyAnalyzeHistory[currentTextID].text.pop();
        copyAnalyzeHistory[currentTextID].magnitude.pop();
      }
      setAnalyzeHistory(copyAnalyzeHistory);
      setNewText(true);
      setIsAnalyzing(false);
      clearTimeout(timeout);
      return;
    }
  };

  //Setting the html elements for the loading animation
  const stageOneAnimation = () => {
    const elements = HTMLElemenetsRef.current;
    elements.loadingBar.style.width = '0%';
    elements.bar.style.width = '90%';
    elements.bar.classList.remove('animation-bar');
    elements.progress.style.display = 'flex';
    elements.status.style.opacity = '100%';
    elements.loadingBar.classList.add('rounded-r-[15px]');
  };

  // Transition: after the loading animation ends
  // the three dots loader and progress bar will be hide
  const stageOneToTwoTransition = () => {
    const elements = HTMLElemenetsRef.current;
    elements.loadingBar.classList.remove('rounded-r-[15px]');
    elements.bar.classList.add('animation-bar');
    elements.status.style.opacity = '0%';
    elements.loadingCircle.style.opacity = '0%';
  };

  //The placeholder will increase in size
  //such that all result section will have enough space
  const stageTwoAnimation = () => {
    const elements = HTMLElemenetsRef.current;

    //Hidding the loading components
    elements.progress.style.display = 'none';
    elements.loadingCircle.style.display = 'none';

    //Scalling depending the screen size
    if (Math.min(windowSize.width, windowSize.height) > 1000) {
      elements.holeLoading.style.height = '90vh';
      elements.holeLoading.style.width = '90%';
    } else {
      elements.holeLoading.style.height = '2400px';
      if (Math.min(windowSize.width, windowSize.height) > 650)
        elements.holeLoading.style.width = '90%';
      else elements.holeLoading.style.width = '100%';
      if (Math.min(windowSize.width, windowSize.height) < 400)
        elements.holeLoading.style.padding = '4px';
    }
  };

  //The result sections will be shown using a fade animation
  const stageThreeAnimation = () => {
    const elements = HTMLElemenetsRef.current;

    //Getting all result sections
    let cards = document.getElementsByClassName('holder');

    for (let i = 0; i < cards.length; i++) {
      //Make them visible
      cards[i].classList.remove('hidden');
      if (Math.min(windowSize.width, windowSize.height) < 1000) {
        cards[i].classList.remove('absolute');
        cards[i].style.width = '100%';
      }
      cards[i].classList.add('flex');
      cards[i].classList.add(`reveal${Math.floor(i / 2) + 1}`);
    }

    //Setting fixed sizes for small devices
    if (Math.min(windowSize.width, windowSize.height) < 1000) {
      elements.placeholder.classList.remove('items-center');
      elements.chartArea.style.height = '1000px';
      elements.sentenceArea.style.height = '600px';
      elements.sentenceArea.style.overflowY = 'scroll';
      elements.btnImprove.style.height = '50px';
      elements.btnNewText.style.height = '50px';
      elements.documentScoreArea.style.height = '175px';
      elements.ratingArea.style.height = '250px';
    }
  };

  //The entire animation
  useEffect(() => {
    const analyzeAnimation = () => {
      //Store the number of seconds the animation will take
      const time = duration;
      setCurrentStatus(0);

      //Setting up the animation
      stageOneAnimation();
      let timeout = setTimeout(
        () => {
          //After 25% of the animation duration the first check will be completed
          HTMLElemenetsRef.current.loadingBar.style.width = '33%';
          setCurrentStatus(1);
          setTimeout(
            () => {
              //After another 40% of the animation duration
              //the second check will be complete
              loadingBar.style.width = '67%';
              setCurrentStatus(2);
              setTimeout(
                () => {
                  //After another 35% of the animation duration
                  //it will scan for inapropriate language
                  verifyInapropriateLanguage(timeout);

                  HTMLElemenetsRef.current.loadingBar.style.width = '100%';
                  setCurrentStatus(3);
                  setTimeout(
                    () => {
                      // After another 20% of the animation duration, the results are received
                      // Hidding previous animation components, preparing for secound phase
                      stageOneToTwoTransition();

                      setTimeout(() => {
                        // After 2.2s, will increase the placeholder size
                        stageTwoAnimation();

                        setTimeout(() => {
                          // After 0.7s will reveal all analyze results
                          stageThreeAnimation();

                          setIsLoaded(true);
                        }, 700);
                      }, 2200);
                    },
                    time * 0.2 * 1000
                  );
                },
                time * 0.35 * 1000
              );
            },
            time * 0.4 * 1000
          );
        },
        time * 0.25 * 1000
      );
    };

    return analyzeAnimation();
  }, []);

  return (
    // Entire page
    <div
      id={'analyzeTab'}
      ref={(tag) => (HTMLElemenetsRef.current.analyzeTab = tag)}
      className="flex justify-center items-center absolute top-0 left-0 w-[100%] min-h-screen h-[100%]  z-20 bg-slate-700/50 overflow-scroll backdrop-blur-sm   "
    >
      {/* Placeholder */}
      <div
        id={'placeholder'}
        ref={(tag) => (HTMLElemenetsRef.current.placeholder = tag)}
        className="flex  justify-center items-center  w-[100%] h-[100%] max-h-screen rounded-[25px] overflow-y-auto "
      >
        {/* All result sections and loading animation elements */}
        <div
          id="whole-loading"
          ref={(tag) => (HTMLElemenetsRef.current.holeLoading = tag)}
          className="flex flex-col items-center justify-center  gap-5 relative h-[400px] w-[100vw] py-6 px-[25px] rounded-3xl bg-gray-300 w1000:justify-left transition-all duration-300  w800:w-[800px]  w800:h-[425px]"
        >
          {/* Three dots loading circle */}
          <div
            id="loadingCircle"
            ref={(tag) => (HTMLElemenetsRef.current.loadingCircle = tag)}
            className="flex items-center justify-center w-[125px] h-[125px] border-[16px] rounded-full border-gray-500 duration-500"
          >
            <div className="flex flex-row gap-1">
              <div className="animate-dot1 w-[17px] h-[17px] bg-gray-500 rounded-full"></div>
              <div className="animate-dot2 w-[17px] h-[17px] bg-gray-500 rounded-full"></div>
              <div className="animate-dot3 w-[17px] h-[17px] bg-gray-500 rounded-full"></div>
            </div>
          </div>
          {/* Loading progress bar */}
          <div
            id="progress"
            ref={(tag) => (HTMLElemenetsRef.current.progress = tag)}
            className="flex flex-col justify-center items-center w-[95%] h-[250px] w800:w-[625px] "
          >
            {/* Current Status Message */}
            <h2
              id="status"
              ref={(tag) => (HTMLElemenetsRef.current.status = tag)}
              className=" text-center text-lg font-bold italic text-gray-800 transition-all duration-200 w400:text-xl w800:text-2xl "
            >
              {textVerifying[currentStatus]}
            </h2>
            {/* Progress bar */}
            <div
              id="bar"
              ref={(tag) => (HTMLElemenetsRef.current.bar = tag)}
              className="h-[50px] w-[90%] rounded-full border-[6px] overflow-hidden border-gray-500"
            >
              <div
                id="loadingBar"
                ref={(tag) => (HTMLElemenetsRef.current.loadingBar = tag)}
                className="h-[100%] w-[0%] rounded-r-[15px] transition-all ease-out duration-200 bg-green-600  "
              ></div>
            </div>
          </div>

          {/* First Section: Document Overall Scoring */}
          <div
            ref={(tag) => (HTMLElemenetsRef.current.documentScoreArea = tag)}
            className="scoreCircles holder hidden flex-row justify-between gap-[2%] absolute left-10 top-10 h-[20%] w-[25%] opacity-0 p-[1%] rounded-xl drop-shadow-lg bg-gray-100 transition-all duration-100"
          >
            {/* Overall Score */}
            <div className="flex flex-col justify-center items-center gap-[4%] w-[48%] h-[100%]">
              <CircleLoader
                duration={duration + 4.5}
                name="score"
                percent={Math.floor(100 * evaluation.documentSentiment.score)}
              />
              <p>SCORE</p>
            </div>
            {/* Overall magnitude */}
            <div className="flex flex-col justify-center items-center gap-[4%] w-[48%] h-[100%]  ">
              <CircleLoader
                duration={duration + 4.5}
                name="magnitude"
                percent={Math.floor(
                  100 *
                    (evaluation.documentSentiment.magnitude /
                      evaluation.sentences.length)
                )}
              />
              <p>MAGNITUDE</p>
            </div>
            {/* Open Tutorial */}
            <div
              onClick={() => setTutorial(true)}
              className="cursor-pointer animate-glow flex flex-col justify-center items-center gap-[12%] absolute h-[30px] w-[30px] right-[4%] top-[4%] rounded-full overflow-hidden bg-gray-400 "
            >
              <p className=" italic font-bold text-xl text-gray-50">?</p>
            </div>
          </div>

          {/* Second Section: Score Vizualization on a progress bar  */}
          <div
            ref={(tag) => (HTMLElemenetsRef.current.ratingArea = tag)}
            className="ratingBar holder hidden flex-col justify-center absolute right-10 top-10 h-[20%] w-[calc(75%-80px-35px)]  px-2 py-3  opacity-0 rounded-xl  bg-gray-100 drop-shadow-lg transition-all  duration-100 w400:px-8"
          >
            {/* Message 'Your text scored...' */}
            <div className="flex flex-row justify-between mb-[30px] ">
              <div>
                <h2 className="text-lg italic text-gray-800">
                  Your text scored{' '}
                  {Math.floor(evaluation.documentSentiment.score * 100)} out of{' '}
                  {100}. ({messageEmotion(evaluation.documentSentiment.score)})
                </h2>
                <h3 className="text-sm">
                  Magnitude = Suggest the strength of the emotion.{' '}
                </h3>
                <h3 className="text-sm">
                  Score = Suggest the type of emotion.{' '}
                  <span className="hidden w290:block">
                    (-80 as negative, 0 as neutral, +80 as positive)
                  </span>
                </h3>
              </div>
            </div>

            <ProgressBar score={evaluation.documentSentiment.score * 100} />
          </div>
          {/* Third Section: Chart analyzation */}
          <div
            ref={(tag) => (HTMLElemenetsRef.current.chartArea = tag)}
            className="charts holder hidden flex-col absolute top-[calc(20%+75px)] left-10 opacity-0 h-[60%] w-[35%] py-5 px-5 overflow-scroll   rounded-xl bg-gray-100 drop-shadow-lg transition-all  duration-200"
          >
            <div className="">
              <h2 className="italic text-gray-800  text-2xl ">
                Your Text Statistics
              </h2>

              <ChartSentence senteces={evaluation.sentences} />
              <h3 className="p-1 border-2 rounded-xl mt-2 mb-10 text-center bg-gray-400 text-gray-50  drop-shadow-md">
                Score and Magnitude Evolution, sentence by sentence
              </h3>

              <ChartEmotionDistribution sentences={evaluation.sentences} />
              <h3 className="mt-2 mb-10 p-1 border-2 rounded-xl text-center bg-gray-400  text-gray-50  drop-shadow-md">
                Distribution of emotions found in your text
              </h3>

              <ChartOverallEvolution
                analyzeHistory={analyzeHistory[currentTextID]}
              />
              <h3 className="p-1 mt-2 border-2 rounded-xl text-center bg-gray-400 text-gray-50  drop-shadow-md">
                Score and Magnitude Evolution, between reviews
              </h3>
            </div>
          </div>

          {/* Fourth section: Analyze every sentence results */}
          <div
            ref={(tag) => (HTMLElemenetsRef.current.sentenceArea = tag)}
            className="sentences holder hidden flex-col absolute top-[calc(20%+75px)] right-10 h-[60%] w-[calc(65%-80px-35px)] opacity-0  rounded-xl bg-gray-100 drop-shadow-lg duration-200 transition-all"
          >
            <SentencePreview
              setSentence={setSelectedSentence}
              sentences={evaluation.sentences}
            />
            <SentenceAnalyze
              setSentence={setSelectedSentence}
              number={selectedSentence}
              maxNumber={evaluation.sentences.length}
              aboutSentence={evaluation.sentences[selectedSentence]}
            />
          </div>

          {/* Improve Score Button */}
          <button
            onClick={() => {
              setIsAnalyzing(false);
              setNewText(false);
            }}
            ref={(tag) => (HTMLElemenetsRef.current.btnImprove = tag)}
            className="btnImp holder hidden  items-center justify-center absolute left-10 bottom-10  w-[25%] h-[calc(20%-40px-35px-35px-40px)] opacity-0 rounded-xl  text-xl bg-gray-100 drop-shadow-lg  transition-all  duration-300 hover:text-gray-50 hover:bg-gray-400 "
          >
            Improve Score
          </button>

          {/* New Text Button */}
          <button
            onClick={() => {
              setIsAnalyzing(false);
              setInput('');
              setNewText(true);
            }}
            ref={(tag) => (HTMLElemenetsRef.current.btnNewText = tag)}
            className="btnNew holder hidden items-center justify-center  absolute bottom-10 right-10  w-[25%]  h-[calc(20%-40px-35px-35px-40px)]  opacity-0 rounded-xl  text-xl bg-gray-100 drop-shadow-lg transition-all  duration-300 hover:text-gray-50 hover:bg-gray-400"
          >
            New Text To Analyze
          </button>
        </div>
      </div>
    </div>
  );
};
