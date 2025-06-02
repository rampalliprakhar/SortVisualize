"use client";
import React from "react";

const SortControls = ({
  sortingAlgorithm,
  setSortingAlgorithm,
  inputType,
  setInputType,
  setDelay,
  delay,
  visualizationType,
  setVisualizationType,
  theme,
  setTheme,
}) => {
  return (
    <div className="flex flex-col items-center mb-4 space-y-4">
      {/* Dropdown for selecting sorting algorithm */}
      <select
        className="bg-blue-600 text-white py-2 px-6 rounded-md"
        onChange={(e) => setSortingAlgorithm(e.target.value)}
        value={sortingAlgorithm}
      >
        <option value="selection">Selection Sort</option>
        <option value="merge">Merge Sort</option>
        <option value="insertion">Insertion Sort</option>
        <option value="quick">Quick Sort</option>
        <option value="bubble">Bubble Sort</option>
      </select>

      {/* Dropdown for selecting numbers or alphabets */}
      <select
        className="bg-blue-600 text-white py-2 px-6 rounded-md"
        onChange={(e) => setInputType(e.target.value)}
        value={inputType}
      >
        <option value="numbers">Numbers (0 to n)</option>
        <option value="alphabets">Alphabets (A to Z)</option>
      </select>

      {/* Delay input to adjust speed */}
      <select
        className="bg-blue-600 text-white py-2 px-6 rounded-md"
        onChange={(e) => setDelay(parseInt(e.target.value, 10))}
        value={delay}
      >
        <option value={1000}>Slow</option>
        <option value={500}>Medium</option>
        <option value={100}>Fast</option>
      </select>

      {/* Dropdown for selecting visualization type */}
      <select
        className="bg-blue-600 text-white py-2 px-6 rounded-md"
        onChange={(e) => setVisualizationType(e.target.value)}
        value={visualizationType}
      >
        <option value="bars">Bars</option>
        <option value="array">Array</option>
      </select>

      {/* Dropdown to choose a theme */}
      <select
        className="bg-blue-600 text-white py-2 px-6 rounded-md"
        onChange={(e) => setTheme(e.target.value)}
        value={theme}
      >
        <option value="default">Default</option>
        <option value="dark">Dark Mode</option>
        <option value="pastel">Pastel Colors</option>
        <option value="neon">Neon Theme</option>
      </select>
    </div>
  );
};

export default SortControls;
