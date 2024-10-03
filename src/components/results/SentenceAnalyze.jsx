import { useEffect } from 'react';
import { getSentimentColor } from '../../utils/utility';
export const SentenceAnalyze = ({
  aboutSentence,
  number,
  maxNumber,
  setSentence,
}) => {
  const getOverview = (score) => {
    if (score >= 90) {
      return "Overflowing with joy and excitement, these expressions capture moments of triumph, where everything feels like it's falling perfectly into place. The emotions are intense, uplifting, and exhilarating.";
    } else if (score >= 60) {
      return "A sense of genuine happiness and optimism shines through. These words convey confidence, accomplishment, and satisfaction, where things are going well and there's plenty to feel good about.";
    } else if (score >= 30) {
      return 'A gentle sense of contentment comes across. There’s a pleasant mood, marked by small victories or enjoyable moments, without being overly enthusiastic or exuberant.';
    } else if (score >= -30) {
      return 'Emotionally even, these thoughts are straightforward and matter-of-fact. Neither happy nor sad, they reflect the day-to-day, without any emotional highs or lows.';
    } else if (score >= -60) {
      return 'Hints of frustration or disappointment surface, though nothing too overwhelming. The feeling is more of annoyance or dissatisfaction, where things haven’t gone as expected but aren’t catastrophic.';
    } else if (score >= -90) {
      return 'Stronger emotions of sadness or anger dominate, with clear signs of distress or unhappiness. There’s a deep sense of discontent, where things feel seriously off track.';
    } else {
      return 'Words soaked in despair, conveying a sense of hopelessness or profound sadness. The emotions here are overwhelming, painting a picture of deep emotional pain or failure.';
    }
  };

  const addToSentenceNumber = (increment) => {
    let newNumber = number + increment;
    if (newNumber >= maxNumber) newNumber = 0;
    if (newNumber < 0) newNumber = maxNumber - 1;

    setSentence(newNumber);
  };

  return (
    <div className="w-[100%] flex flex-col p-4">
      {/* Sentence number, left and right arrows */}
      <div className="mb-5 flex flex-row justify-between border-2 p-2 items-center rounded-2xl bg-gray-200 drop-shadow-lg">
        {/* Sentence number */}
        <h2>
          Sentence {number + 1}/{maxNumber}
        </h2>
        {/* left & right arrows */}
        <div className="flex flex-row text-2xl animate-glow">
          {/* left arrow */}
          <button
            onClick={() => {
              addToSentenceNumber(-1);
            }}
            className="w-[50px] h-[30px]  bg-gray-600 text-gray-50"
          >
            &#10094;
          </button>
          {/* right arrow */}
          <button
            onClick={() => {
              addToSentenceNumber(1);
            }}
            className="w-[50px] h-[30px]  bg-gray-400 text-gray-50"
          >
            &#10095;
          </button>
        </div>
      </div>
      {/* Sentence Overview */}
      <div className=" flex flex-row justify-between">
        {/* Score display */}
        <h4>
          Score:
          <span
            className={`rounded-lg italic px-1 py-1 bg-gray-400 text-white`}
          >
            <span
              className="rounded-lg px-1"
              style={{
                backgroundColor: getSentimentColor(
                  aboutSentence?.sentiment?.score
                ),
              }}
            >
              {(aboutSentence?.sentiment?.score * 100).toPrecision(3)}
            </span>
            / {(aboutSentence?.sentiment?.score > 0 ? 1 : -1) * 100}
          </span>
        </h4>
        {/* Magnitude display */}
        <h4>
          Magnitude:
          <span
            style={{
              backgroundColor: getSentimentColor(
                aboutSentence?.sentiment?.magnitude * 2 - 1
              ),
            }}
            className=" rounded-lg text-white p-1 italic "
          >
            {(aboutSentence?.sentiment?.magnitude * 100).toPrecision(3)}
          </span>
        </h4>
      </div>
      {/* The analyzed sentence */}
      <h3 className=" my-4 rounded-lg text-lg text-center italic font-bold bg-gray-200 xl:text-xl drop-shadow-md">
        "{aboutSentence?.text?.content}"
      </h3>
      {/* Overview Text */}
      <div className="flex flex-col gap-1 p-2 bg-gray-200  rounded-2xl drop-shadow-lg">
        <h3 className="p-1 rounded-lg bg-gray-400 text-gray-100 ">
          Overview:{' '}
        </h3>
        <h3> "{getOverview(aboutSentence?.sentiment?.score * 100)}"</h3>
      </div>
    </div>
  );
};
