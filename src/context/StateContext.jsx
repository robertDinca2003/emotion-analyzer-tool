import React, { createContext, useContext, useState } from 'react';

// Context used to store information about useState related to making an input
export const InputInfoContext = createContext();

// Context used to store information about analyzed information
export const AnalyzeDataContext = createContext();

// State used to store different conditions
export const PageConditionContext = createContext();
