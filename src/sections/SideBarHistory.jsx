import {
  InputInfoContext,
  AnalyzeDataContext,
  PageConditionContext,
} from '../context/StateContext';

import { useContext, useEffect, useState } from 'react';

export const SideBarHistory = () => {
  const { setInput, setNewText, setCurrentTextID } =
    useContext(InputInfoContext);
  const { analyzeHistory } = useContext(AnalyzeDataContext);
  const { setTutorial, windowSize } = useContext(PageConditionContext);

  const [analyzeLogs, setAnalyzeLogs] = useState(
    JSON.parse(JSON.stringify(analyzeHistory))
  );
  const [isOpen, setIsOpen] = useState(windowSize.width > 1300);
  let today = new Date();

  //Sorting all entries from analyzeHistory in ascending order by creation time
  const sortLogs = (logs) => {
    setAnalyzeLogs(
      logs.sort((el1, el2) => {
        if (el1.createdAt[0] > el2.createdAt[0]) return -1;
        return 1;
      })
    );
  };
  //Logic for open and close the sidebar, modifying the style
  const CloseOpen = () => {
    let btn = document.getElementById('btnHide');
    let sidebar = document.getElementById('SideBar');
    let side = document.getElementById('SideView');

    if (isOpen) {
      sidebar.classList.add('-translate-x-[300px]');
      btn.classList.add('rotate-[180deg]');
      side.classList.remove('z-10');
    } else {
      sidebar.classList.remove('-translate-x-[300px]');
      btn.classList.remove('rotate-[180deg]');
      side.classList.add('z-10');
    }

    setIsOpen(!isOpen);
  };

  const runTutorial = () => {
    setTutorial(true);
  };

  //After selecting an older session
  //Let the user continue to modify older inputs
  const updateText = (selectedLog) => {
    setInput(selectedLog.text[selectedLog.text.length - 1]);
    setNewText(false);
    setCurrentTextID(selectedLog.id);
  };

  //Create a new session
  const createNewText = () => {
    setInput('');
    setNewText(true);
    setCurrentTextID(0);
  };

  useEffect(() => {
    sortLogs(JSON.parse(JSON.stringify(analyzeHistory)));
  }, [analyzeHistory]);

  return (
    <div
      id={'SideView'}
      className={
        windowSize.width > 1300
          ? 'absolute z-10 h-[100%] '
          : 'absolute  h-[100%]'
      }
    >
      {/* Open and Close button */}
      <button
        id={'btnHide'}
        onClick={() => CloseOpen(true)}
        className={
          windowSize.width > 1300
            ? ' absolute  left-1 top-[50px] px-4 py-2 text-white bg-gray-800 bg-opacity-50 rounded-full transform -translate-y-1/2 transition-all duration-300 hover:bg-opacity-75'
            : 'absolute  left-1 top-[50px]  px-4 py-2 text-white bg-gray-800 bg-opacity-50  rounded-full rotate-[180deg]  transform -translate-y-1/2 transition-all duration-300 hover:bg-opacity-75'
        }
      >
        &#10094;
      </button>
      {/* Entire Sidebar */}
      <div
        id={'SideBar'}
        className={
          windowSize.width > 1300
            ? ' flex flex-col top-0 w-[250px] h-[100%]  border-r-2 bg-gray-200/95 duration-300 transition-all xl:bg-white/60'
            : 'flex flex-col top-0 w-[250px] h-[100%] bg-gray-200/95  border-r-2 -translate-x-[300px] duration-300 transition-all xl:bg-white/60 '
        }
      >
        {/* New Analyze Button */}
        <div className="flex items-center justify-center h-[100px]  border-b-2 border-gray-400">
          <button
            onClick={() => createNewText()}
            className="p-2 px-3 border-2 rounded-[20px] shadow-md  text-xl text-gray-800  border-white bg-slate-300/20     transition-colors duration-200 hover:bg-slate-300 hover:text-gray-50"
          >
            New Analyze
          </button>
        </div>
        {/* All previous sessions */}
        <div className="h-[calc(100%-100px-100px)] overflow-auto">
          {analyzeLogs.length != 0 && (
            <p className="px-2 py-2 italic border-b-2 text-gray-800  border-gray-400">
              Today
            </p>
          )}
          {/* Sessions from the last 24h */}
          {analyzeLogs.map((element, key) => {
            let today = new Date();
            if (today.getTime() - element.createdAt[0] <= 86400000)
              return (
                <button
                  key={key}
                  id={String(key)}
                  onClick={() => {
                    updateText(element);
                  }}
                  className="w-[100%] h-[100px] overflow-hidden p-2 border-t-2 border-b-2 border-gray-400 "
                >
                  {element.text[element.text.length - 1].substring(0, 70)}
                  {element.text[element.text.length - 1].length > 70 && '...'}
                </button>
              );
          })}
          {analyzeLogs.length != 0 &&
            today.getDate() - analyzeLogs[analyzeLogs.length - 1].createdAt[0] >
              86400000 && (
              <p className="px-2 py-2 border-b-2 italic text-gray-800  border-gray-400">
                This Week
              </p>
            )}
          {/* Sessions from the last week / 7days */}
          {analyzeLogs.map((element, key) => {
            let today = new Date();
            if (
              today.getTime() - element.createdAt[0] > 86400000 &&
              today.getTime() - element.createdAt[0] <= 7 * 86400000
            )
              return (
                <button
                  id={String(key)}
                  onClick={() => {
                    updateText(element);
                  }}
                  className="w-[100%] h-[100px] overflow-hidden p-2 border-t-2 border-b-2 border-gray-400 "
                >
                  {element.text[element.text.length - 1].substring(0, 70)}
                  {element.text[element.text.length - 1].length > 70 && '...'}
                </button>
              );
          })}
          {analyzeLogs.length != 0 &&
            today.getDate() - analyzeLogs[analyzeLogs.length - 1].createdAt[0] >
              7 * 86400000 && (
              <p className="px-2 py-2 italic text-gray-800 border-b-2 border-gray-400">
                This Month
              </p>
            )}
          {/* Sessions from last mounth and more */}
          {analyzeLogs.map((element, key) => {
            let today = new Date();
            if (today.getTime() - element.createdAt[0] > 7 * 86400000)
              return (
                <button
                  id={String(key)}
                  onClick={() => {
                    updateText(element);
                  }}
                  className="w-[100%] h-[100px] overflow-hidden p-2 border-t-2 border-b-2 border-gray-400 "
                >
                  {element.text[element.text.length - 1].substring(0, 70)}
                  {element.text[element.text.length - 1].length > 70 && '...'}
                </button>
              );
          })}
        </div>
        {/* Open Tutorial */}
        <div className="flex items-center justify-center h-[100px] border-t-2 border-gray-400">
          <button
            onClick={() => runTutorial()}
            className="px-3 p-2 border-2 rounded-[20px] text-xl  shadow-md  border-white bg-slate-300/20   text-gray-800  transition-colors duration-200 hover:bg-slate-300 hover:text-gray-50"
          >
            Tutorial
          </button>
        </div>
      </div>
    </div>
  );
};
