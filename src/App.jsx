import { useEffect, useState } from 'react';
import { Analyzer } from './sections/Analyzer';
import { Tutorial } from './sections/Tutorial';
import { Results } from './sections/Results';
import { LastResults } from './components/analyzer/LastResults.jsx';
import { analyzeInputAnnotate, analyzeInputSentiment } from './utils/apiCall';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { SideBarHistory } from './sections/SideBarHistory';
import {
  InputInfoContext,
  AnalyzeDataContext,
  PageConditionContext,
} from './context/StateContext';
import { createContext, useContext } from 'react';

/*
HTML Structure

<body>
  <div id="the entire aplication" style="relative flex">

    <div style='absolute'>
      // Toast Notification
      // Placed absolute, relative to the entire screen to top-center
    </div>

    <div style="absolute">
      // Side Bar
      // Placed absolute, relative to the entire screen to the left
    </div>

    <div style='z-index: 0'>
      // Analyzer Tool
    </div>
    
    //if an input is made
    <div style='z-index: 10'>
      // (Analyze) Results
    </div>

    //if is in tutorial
    <div style='z-index: 20'>
      // Tutorial
    </div>

</body>



*/

function App() {
  // Get the user input
  const [input, setInput] = useState('');

  // Stores the API response
  const [evaluation, setEvaluation] = useState(null);

  // Boolean variables
  const [tutorial, setTutorial] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [newText, setNewText] = useState(true);

  // AnalyzeHistory = An array of evaluatiosn
  const [currentTextID, setCurrentTextID] = useState(0);
  const [analyzeHistory, setAnalyzeHistory] = useState(
    localStorage.getItem('analyzeHistory')
      ? JSON.parse(localStorage.getItem('analyzeHistory'))
      : []
  );

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  // Turn on tutorial for the first time on the website
  const verifyFirstLogin = () => {
    let today = new Date();
    if (!localStorage.getItem('firstTime')) {
      setTutorial(true);
      localStorage.setItem('firstTime', false);
      localStorage.setItem('dailyUses', 50);
      localStorage.setItem(
        'lastLoggin',
        today.getDate() + today.getMonth() + today.getFullYear()
      );
    }
  };

  // Save last date of logging in, and update the daily uses
  const updateLastLogin = () => {
    let today = new Date();
    if (
      localStorage.getItem('lastLoggin') !==
      today.getDate() + today.getMonth() + today.getFullYear()
    )
      localStorage.setItem('dailyUses', 50);

    localStorage.setItem(
      'lastLoggin',
      today.getDate() + today.getMonth() + today.getFullYear()
    );
  };

  // Extra verifying for inapropriate language in analyze history
  const verifyInapropriateHistoryAnalyze = () => {
    let analyzeData;
    analyzeData = JSON.parse(localStorage.getItem('analyzeHistory'));

    if (analyzeData.length > 0) {
      for (let i = 0; i < analyzeData.length; i++) {
        if (analyzeData[i].flagInapropriate) {
          if (analyzeData[i].text.length > 1) {
            analyzeData[i].text.pop();
            analyzeData[i].score.pop();
            analyzeData[i].magnitude.pop();
            analyzeData[i].flagInapropriate = false;
          }
        }
      }
      if (analyzeData[analyzeData.length - 1].flagInapropriate) {
        analyzeData.pop();
      }
      setAnalyzeHistory(analyzeData);
    }
  };

  useEffect(() => {
    localStorage.setItem('analyzeHistory', JSON.stringify(analyzeHistory));
  }, [analyzeHistory]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    verifyFirstLogin();

    updateLastLogin();
    // console.log('Checking!')
    verifyInapropriateHistoryAnalyze();
  }, []);

  return (
    <div className="relative overflow-hidden">
      <PageConditionContext.Provider
        value={{
          isAnalyzing,
          setIsAnalyzing,
          tutorial,
          setTutorial,
          windowSize,
        }}
      >
        <InputInfoContext.Provider
          value={{
            input,
            setInput,
            newText,
            setNewText,
            currentTextID,
            setCurrentTextID,
          }}
        >
          <AnalyzeDataContext.Provider
            value={{
              evaluation,
              setEvaluation,
              analyzeHistory,
              setAnalyzeHistory,
            }}
          >
            <ToastContainer />
            <SideBarHistory />
            <Analyzer />
            {tutorial && <Tutorial />}
            {isAnalyzing && <Results />}
          </AnalyzeDataContext.Provider>
        </InputInfoContext.Provider>
      </PageConditionContext.Provider>
    </div>
  );
}

export default App;
