"use client";

import { useState, useEffect } from "react";
import SortControls from "../Controls/SortControls";
import Visualization from "../Visualization/Visualization";
import ActionButton from "../ActionButton/ActionButton";
import InputField from "../InputField/InputField";

export default function Visualizer() {
  // State to hold the values that will be sorted
  const [values, setValues] = useState([]);
  
  // State to track if sorting is in progress
  const [isSorting, setIsSorting] = useState(false);
  
  // State to track if sorting is completed
  const [isCompleted, setIsCompleted] = useState(false);
  
  // State to store the type of input (either 'numbers' or 'alphabets')
  const [inputType, setInputType] = useState("numbers");
  
  // State to store the type of visualization (either 'bars' or 'array')
  const [visualizationType, setVisualizationType] = useState("bars"); 
  
  // State to store the user input string
  const [inputString, setInputString] = useState("");
  
  // State to control the delay between sorting steps for visualization
  const [delay, setDelay] = useState(100);
  
  // State to store the selected sorting algorithm
  const [sortingAlgorithm, setSortingAlgorithm] = useState("selection");

  const [positions, setPositions] = useState([]);

  const [highlightedIndices, setHighlightedIndices] = useState([]);

  const [theme, setTheme] = useState("default");

  useEffect(() => {
    setPositions(values.map((_, index) => index)); // Reset positions when values change
  }, [values]);

  useEffect(() => {
    window.generateRandomNumbers = generateRandomNumbers;
  }, [inputType]);

  const generateRandomNumbers = () => {
    if (isSorting) return; // Prevent generating while sorting
  
    setIsSorting(false);
    setIsCompleted(false);
  
    let randomValues = [];
    const arrayLength = 10;
  
    console.log("Current inputType:", inputType);
  
    if (inputType === "numbers") {
      randomValues = Array.from({ length: arrayLength }, () => Math.floor(Math.random() * 100) + 1);
    } else if (inputType === "alphabets") {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      randomValues = Array.from({ length: arrayLength }, () => alphabet[Math.floor(Math.random() * alphabet.length)]);
    } else {
      console.warn("Invalid inputType:", inputType);
    }
  
    setValues(randomValues);
    setPositions(randomValues.map((_, index) => index));
    setHighlightedIndices([]);
  };

  // Function to parse the input string into an array based on the input type (numbers or alphabets)
  const parseInput = () => {
    let newArray = [];
    if (inputType === "numbers") {
      // Convert the comma-separated string into an array of numbers
      newArray = inputString
        .split(",")
        .map((item) => parseInt(item.trim(), 10))
        .filter((item) => !isNaN(item)); // Ensure only valid numbers are included
    } else if (inputType === "alphabets") {
      // Convert the comma-separated string into an array of uppercase alphabets
      newArray = inputString
        .split(",")
        .map((item) => item.trim().toUpperCase())
        .filter((item) => /^[A-Z]$/.test(item)); // Ensure only valid alphabets are included
    }
    setValues(newArray); // Update the values array with the parsed input
  };

  useEffect(() => {
    parseInput(); // Parse the input string whenever it changes
  }, [inputString, inputType]);

  // Sorting algorithms (Selection, Merge, Insertion, Quick)
  const swap = (arr, positions, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap values
    [positions[i], positions[j]] = [positions[j], positions[i]]; // Swap positions

    setValues([...arr]);
    setPositions([...positions]);
  };
  
  const selectionSort = async (arr) => {
    let sortedArray = [...values];
    let pos = [...positions];
  
    for (let i = 0; i < sortedArray.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < sortedArray.length; j++) {
        if (sortedArray[j] < sortedArray[minIndex]) {
          minIndex = j;
        }
      }
  
      if (minIndex !== i) {
        swap(sortedArray, pos, i, minIndex);  
        setHighlightedIndices([i, minIndex]);
        setValues([...sortedArray]); 
        setPositions([...pos]); 
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  
    setHighlightedIndices([]);
    setIsSorting(false);
    setIsCompleted(true);
  };

  // Bubble Sort algorithm (Async)
  const bubbleSort = async (arr) => {
    let updatedArray = [...arr]; // Create a copy of the array for sorting
    let updatedPositions = [...positions];

    for (let i = 0; i < updatedArray.length - 1; i++) {
      for (let j = 0; j < updatedArray.length - i - 1; j++) {
        if (
          (inputType === "numbers" && updatedArray[j] > updatedArray[j + 1]) ||
          (inputType === "alphabets" && updatedArray[j].localeCompare(updatedArray[j + 1]) > 0)
        ) {
          // Swap the elements if they are out of order
          [updatedArray[j], updatedArray[j + 1]] = [updatedArray[j + 1], updatedArray[j]];
          [updatedPositions[j], updatedPositions[j + 1]] = [updatedPositions[j + 1], updatedPositions[j]];

          // Highlighting swapped elements
          setHighlightedIndices([j, j + 1]);

          // Update the values and positions for visualization
          setValues([...updatedArray]);
          setPositions([...updatedPositions]);

          // Delay to visualize the swap
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }
    setHighlightedIndices([]); // Clear highlighted indices
    setIsSorting(false); // Sorting is complete
    setIsCompleted(true); // Mark as completed
  };

  // Merge Sort algorithm (Async)
  const mergeSort = async (arr) => {
    const merge = async (left, right) => {
      let result = [];
      let i = 0, j = 0;
  
      while (i < left.length && j < right.length) {
        if (
          (inputType === "numbers" && left[i] < right[j]) ||
          (inputType === "alphabets" && left[i].localeCompare(right[j]) < 0)
        ) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
  
        // Update visualization after each merge step
        setValues([...result, ...left.slice(i), ...right.slice(j)]);
        setHighlightedIndices([i, j]); // Highlight merging elements
        await new Promise((resolve) => setTimeout(resolve, delay)); // Delay for visualization
      }
  
      return [...result, ...left.slice(i), ...right.slice(j)];
    };
  
    const sort = async (arr) => {
      if (arr.length <= 1) return arr;
  
      const mid = Math.floor(arr.length / 2);
      const left = await sort(arr.slice(0, mid));
      const right = await sort(arr.slice(mid));
  
      return await merge(left, right);
    };
  
    setIsSorting(true);
    const sortedArray = await sort([...arr]);
    setValues(sortedArray);
    setIsSorting(false);
    setIsCompleted(true);
  };

  // Insertion Sort algorithm (Async)
  const insertionSort = async (arr) => {
    let updatedArray = [...arr]; // Create a copy of the array for sorting
    let updatedPositions = [...positions];
  
    for (let i = 1; i < updatedArray.length; i++) {
      let key = updatedArray[i];
      let j = i - 1;
  
      while (
        j >= 0 &&
        ((inputType === "numbers" && updatedArray[j] > key) ||
          (inputType === "alphabets" && updatedArray[j].localeCompare(key) > 0))
      ) {
        updatedArray[j + 1] = updatedArray[j]; // Shift element to the right
        updatedPositions[j + 1] = updatedPositions[j];
        j--;
  
        // Highlight the moved elements
        setHighlightedIndices([j + 1, i]);
  
        // Update the values and positions for visualization
        setValues([...updatedArray]);
        setPositions([...updatedPositions]);
  
        // Delay for visualization effect
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      updatedArray[j + 1] = key; // Insert the key at the correct position
      updatedPositions[j + 1] = updatedPositions[i]; // Correct the positions
      setValues([...updatedArray]);
      setPositions([...updatedPositions]);
  
      // Delay for visualization effect
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  
    setHighlightedIndices([]); // Clear highlighted indices
    setIsSorting(false); // Sorting is complete
    setIsCompleted(true); // Mark as completed
  };

  // Quick Sort algorithm (Async)
  const quickSort = async (arr) => {
    const partition = async (arr, low, high) => {
      let pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (
          (inputType === "numbers" && arr[j] < pivot) ||
          (inputType === "alphabets" && arr[j].localeCompare(pivot) < 0)
        ) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap arr[i] and arr[j]
          setValues([...arr]); // Update the values state for visualization
          setHighlightedIndices([i, j]); // Highlight the swapped elements
          await new Promise((resolve) => setTimeout(resolve, delay)); // Delay for visualization
        }
      }

      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap arr[i+1] and arr[high]
      setValues([...arr]); // Update the values state for visualization
      setHighlightedIndices([i + 1, high]); // Highlight the swapped elements
      await new Promise((resolve) => setTimeout(resolve, delay)); // Delay for visualization

      return i + 1;
    };

    const sort = async (arr, low, high) => {
      if (low < high) {
        let pi = await partition(arr, low, high); // Get pivot index
        await sort(arr, low, pi - 1); // Recursively sort left part
        await sort(arr, pi + 1, high); // Recursively sort right part
      }
    };

    const arrCopy = [...arr];
    await sort(arrCopy, 0, arrCopy.length - 1); // Start the quick sort
    setIsSorting(false); // Sorting is complete
    setIsCompleted(true); // Mark as completed
  };

  // Function to run the selected sorting algorithm
  const runSortingAlgorithm = () => {
    if (values.length === 0) {
      alert("Please provide input values first!");
      return; // Prevent sorting if there are no values
    }
  
    if (!isSorting) {
      setIsSorting(true);
      setIsCompleted(false); // Reset completion state
  
      // Pass a fresh copy of values to prevent state issues
      const arrCopy = [...values];
  
      switch (sortingAlgorithm) {
        case "selection":
          selectionSort(arrCopy);
          break;
        case "merge":
          mergeSort(arrCopy);
          break;
        case "insertion":
          insertionSort(arrCopy);
          break;
        case "quick":
          quickSort(arrCopy);
          break;
        case "bubble":
          bubbleSort(arrCopy);
          break;
        default:
          console.warn("Unknown sorting algorithm:", sortingAlgorithm);
          break;
      }
    }
  };

  // Function to restart the sorting process
  const restartSorting = () => {
    setIsSorting(false); // Reset sorting state
    setIsCompleted(false); // Reset completed state
    setValues([]); // Clear the array
    setInputString(""); // Reset the input string
  };

  // Function to normalize values for visualization (for bars and arrays)
  const normalizeValue = (value) => {
    // If the value is a string
    if (typeof value === 'string') {
      return (value.charCodeAt(0) - 65) / (90 - 65) * 100; // Values are uppercase letters A-Z
    }
    
    // If the value is a number
    if (typeof value === 'number') {
      const maxValue = Math.max(...values); // Get the max value from the list
      return (value / maxValue) * 100; // Normalize number as a percentage
    }
  
    // Return a default value
    return 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold text-blue-500 text-center mb-8">Sorting Visualizer</h1>
        
        {/*Sorting Controls */}
        <SortControls
          sortingAlgorithm={sortingAlgorithm}
          setSortingAlgorithm={setSortingAlgorithm}
          inputType={inputType}
          setInputType={setInputType}
          setDelay={setDelay}
          setTheme={setTheme}
          delay={delay}
          visualizationType={visualizationType}
          setVisualizationType={setVisualizationType}
        />
        
        {/* Input Field for custom input */}
        <InputField 
          setValues={setValues} 
          inputType={inputType}
          // setIsSorting={setIsSorting}  
          // setIsCompleted={setIsCompleted}
        />

        {/* ActionButton for Start or Restart Sorting Button */}
        <ActionButton
          isSorting={isSorting}
          isCompleted={isCompleted}
          runSortingAlgorithm={runSortingAlgorithm}
          restartSorting={restartSorting}
        />

        {/* Visualization */}
        <Visualization
          values={values}
          positions={positions}
          inputType={inputType}
          visualizationType={visualizationType}
          highlightedIndices={highlightedIndices}
          normalizeValue={normalizeValue}
          theme={theme}
        />
      </div>
    </div>
  );
}