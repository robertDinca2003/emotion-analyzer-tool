import { useEffect } from 'react';
import { getSentimentColor } from '../../utils/utility';
export const SentencePreview = ({ setSentence, sentences }) => {
  const clickSentence = (sentenceNumber) => {
    // console.log(sentenceNumber);
    setSentence(sentenceNumber);
  };

  //Setting up a div and store every sentence from the input
  //in individual span, such that become independent components
  //every span will have it's own color depending on the sentence score
  useEffect(() => {
    let container = document.getElementById('textContainer');
    container.innerHTML = '';
    sentences.forEach((element, key) => {
      container.innerHTML += `<span class = 'cursor-pointer transition-colors duration-200 hover:text-white py-[1px]  px-2 mx-1 rounded-lg' style='background-color: ${getSentimentColor(element.sentiment.score)}'>${element.text.content} </span>`;
    });
    let allSpans = container.children;
    for (let i = 0; i < allSpans.length; i++)
      allSpans[i].addEventListener('click', () => {
        clickSentence(i);
      });
  }, []);

  return (
    <div className="h-[50%] m-4 rounded-lg overflow-scroll  ">
      <h1 className="text-2xl italic text-gray-800">Sentence Analyzer</h1>
      <div
        id="textContainer"
        className=" min-h-[100%] w-[100%] rounded-xl text-lg text-gray-900 p-4 bg-gray-300"
      ></div>
    </div>
  );
};
