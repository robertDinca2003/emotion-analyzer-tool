import '../../App.css';
import { useState, useEffect, useContext, useRef } from 'react';
import {
  isApropriateLanguage,
  getCurrentDate,
  warningNotify,
} from '../../utils/utility';
import { analyzeInputAnnotate } from '../../utils/apiCall';
import {
  InputInfoContext,
  AnalyzeDataContext,
  PageConditionContext,
} from '../../context/StateContext';

export const AnalyzerTool = () => {
  const { isAnalyzing, setIsAnalyzing } = useContext(PageConditionContext);

  const { evaluation, setEvaluation, analyzeHistory, setAnalyzeHistory } =
    useContext(AnalyzeDataContext);

  const { input, setInput, currentTextID, setCurrentTextID, newText } =
    useContext(InputInfoContext);

  const [fileName, setFileName] = useState('Upload .txt file');

  const [dailyLimit, setDailyLimit] = useState(
    localStorage.getItem('dailyUses') ? localStorage.getItem('dailyUses') : 50
  );

  const btnAnalyze = useRef(null);

  const clearInput = () => {
    setInput('');
    setFileName('Upload .txt file');
  };
  // Process inputed file
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileExtension = file.name.split('.').pop();
      // Checking for file format to be .txt
      if (fileExtension === 'txt') {
        //Update upload button's name and the input field content
        let fileName = file.name;

        if (fileName.length > 16) fileName = fileName.substring(0, 13) + '...';
        setFileName(fileName);

        const reader = new FileReader();

        reader.onload = function (e) {
          const fileContent = e.target.result;
          setInput(fileContent.substring(0, 5000));
        };
        reader.readAsText(file);
      } else {
        //Alert if the file format is not .txt
        setFileName('Upload .txt file');
        warningNotify(
          `Wrong file type: obtained .${fileExtension}, expected .txt`
        );
      }
    } else {
      setFileName('Upload .txt file');
    }
  };

  //Add new index in the analyzeHistory
  const addItemToHistory = (data) => {
    //The index of the analyzeHistory where is stored the new item
    setCurrentTextID(analyzeHistory.length);
    setAnalyzeHistory([
      ...analyzeHistory,
      {
        //Also the index in the array
        id: analyzeHistory.length,
        //Creation date
        createdAt: getCurrentDate(),
        //All variations of the inputed text
        text: [input],
        //All overall scores variations
        score: [data.documentSentiment.score * 100],
        //All overall magnitude variations
        magnitude: [data.documentSentiment.magnitude / data.sentences.length],
        //If the text has a apropriate language
        flagInapropriate: !isApropriateLanguage(data, false),
      },
    ]);
  };

  //Update the accessed index of analyzeHistory, to store the new input and it's scores
  const updateItemFromHistory = (data) => {
    //View addItemToHistory for more details
    const newHistory = analyzeHistory.map((element) => {
      if (element.id === currentTextID)
        return {
          ...element,
          createdAt: getCurrentDate(),
          text: [...element.text, input],
          score: [...element.score, data.documentSentiment.score * 100],
          magnitude: [
            ...element.magnitude,
            data.documentSentiment.magnitude / data.sentences.length,
          ],
          flagInapropriate: !isApropriateLanguage(data, false),
        };
      return element;
    });
    setAnalyzeHistory(newHistory);
  };
  const handleTextAnalyze = async () => {
    //Run condtions
    if (input.length <= 0) {
      warningNotify('No text inputed, try again');
      return;
    }
    if (dailyLimit <= 0) {
      warningNotify('No free uses left');
      return;
    }

    //API call
    try {
      //Fetching the analyze results
      const data = await analyzeInputAnnotate(input);

      setEvaluation(data);
      setDailyLimit(dailyLimit - 1);

      //Adding the new data in the analyzeHistory
      if (newText) {
        addItemToHistory(data);
      } else {
        updateItemFromHistory(data);
      }

      //Start loading animation
      setIsAnalyzing(true);
    } catch (err) {
      //Log the error and message the user
      // console.log('error api', err);
      warningNotify(
        'Unfortunetly we encounterd a problem processing your input. Try again!'
      );
      setEvaluation(null);
      setIsAnalyzing(false);
    }
  };

  //Add or remove glow effect on 'Analyze' button when it has a input
  useEffect(() => {
    if (input.length <= 0) {
      btnAnalyze.current.classList.remove('animate-glow');
    } else {
      btnAnalyze.current.classList.add('animate-glow');
    }
  }, [input]);

  return (
    // User input section
    <div className=" flex flex-col items-center w-[100%] border-2 rounded-[20px] bg-white/60 border-gray-100/30 backdrop-blur-lg shadow-lg divide-solid px-[8px] py-[12px] w800:w-[800px] w400:p-[25px]">
      <h1 className="mb-[25px] text-white text-stroke text-4xl text-center italic drop-shadow-lg w800:text-6xl ">
        Emotion Analyzer Tool
      </h1>

      <div className="flex flex-col gap-2  justify-between w-[100%] mb-[15px] w290:flex-row">
        {/* Upload file button */}
        <div className="flex w-[100%] w290:w-auto ">
          <input
            onChange={(e) => handleFileUpload(e)}
            id="file-upload"
            type="file"
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="w-[100%] p-2 px-5 border-2 rounded-[20px] text-center shadow-md cursor-pointerborder-slate-100 bg-slate-300/20 text-gray-800 border-white transition-colors duration-200 hover:bg-slate-300 hover:text-gray-950"
          >
            {fileName}
          </label>
        </div>

        {/* Clear input button */}
        <button
          onClick={clearInput}
          className="px-3 border-2 rounded-[20px]  border-white bg-slate-300/20 text-gray-800 shadow-md  transition-colors duration-200 hover:bg-slate-300 hover:text-gray-950 "
        >
          Clear
        </button>
      </div>
      {/* Text input area */}
      <div className="relative w-[100%] mb-[5px]">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={5000}
          rows={8}
          placeholder="Enter your text..."
          className="w-[100%] p-2 border-2 rounded-[12px]  bg-slate-300/30 border-slate-300 shadow-md"
        />
        <span className="absolute bottom-2 right-5 italic text-sm text-gray-400  pointer-events-none">
          {input.length}/5000
        </span>
      </div>
      <p className="mb-[25px] italic text-gray-500">
        *You have {dailyLimit} free analyze left for today*
      </p>

      {/* Analyze button */}
      <button
        id="analyze"
        ref={btnAnalyze}
        onClick={handleTextAnalyze}
        className="p-2 px-5 border-2 rounded-[20px] italic text-xl shadow-md border-gray-500 bg-gray-50  text-gray-600  transition-colors duration-200 hover:bg-slate-300 hover:text-gray-950"
      >
        Analyze
      </button>
    </div>
  );
};
