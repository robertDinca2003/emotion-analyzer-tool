import '../App.css';
import { useState, useEffect, useContext, useRef } from 'react';
import { LastResults } from '../components/analyzer/LastResults';
import { isApropriateLanguage, getCurrentDate } from '../utils/utility';
import { analyzeInputAnnotate } from '../utils/apiCall';
import {
  InputInfoContext,
  AnalyzeDataContext,
  PageConditionContext,
} from '../context/StateContext';
import { LukaTip } from '../components/analyzer/LukaTip';
import { AnalyzerTool } from '../components/analyzer/AnalyzeTool';

export const Analyzer = () => {
  const { isAnalyzing } = useContext(PageConditionContext);

  const { analyzeHistory } = useContext(AnalyzeDataContext);

  const { currentTextID, newText } = useContext(InputInfoContext);

  return (
    <div className="flex gap-10 flex-col justify-center items-center min-h-screen py-20 bg-[#B0BEC5]">
      {/* Lukas' tip section */}
      <LukaTip />
      {/* Analyze Tool */}
      <AnalyzerTool />
      {/* Results History */}
      {!newText && !isAnalyzing && (
        <LastResults analyzeHistory={analyzeHistory[currentTextID]} />
      )}
    </div>
  );
};
