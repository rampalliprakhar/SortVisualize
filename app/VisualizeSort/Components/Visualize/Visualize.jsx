"use client";

import { useState, useEffect } from "react";
import SortControls from "../Controls/SortControls";
import Visualization from "../Visualization/Visualization";
import ActionButton from "../ActionButton/ActionButton";
import InputField from "../InputField/InputField";
import Link from 'next/link';

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

  // Selection Sort algorithm (Async)
  const selectionSort = async (arr) => {
    let updatedArray = [...arr]; // Create a copy of the array for sorting
    for (let i = 0; i < updatedArray.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < updatedArray.length; j++) {
        if (
          (inputType === "numbers" && updatedArray[j] < updatedArray[minIndex]) ||
          (inputType === "alphabets" && updatedArray[j].localeCompare(updatedArray[minIndex]) < 0)
        ) {
          minIndex = j; // Find the minimum element's index
        }
      }
      if (minIndex !== i) {
        // Swap the elements if a smaller element is found
        [updatedArray[i], updatedArray[minIndex]] = [updatedArray[minIndex], updatedArray[i]];
        setValues([...updatedArray]); // Update the values state for visualization
        await new Promise((resolve) => setTimeout(resolve, delay)); // Delay for visualization effect
      }
    }
    setIsSorting(false); // Sorting is complete
    setIsCompleted(true); // Mark as completed
  };

  // Bubble Sort algorithm (Async)
  const bubbleSort = async (arr) => {
    let updatedArray = [...arr]; // Create a copy of the array for sorting
    for (let i = 0; i < updatedArray.length - 1; i++) {
      for (let j = 0; j < updatedArray.length - i - 1; j++) {
        if (
          (inputType === "numbers" && updatedArray[j] > updatedArray[j + 1]) ||
          (inputType === "alphabets" && updatedArray[j].localeCompare(updatedArray[j + 1]) > 0)
        ) {
          // Swap the elements if they are out of order
          [updatedArray[j], updatedArray[j + 1]] = [updatedArray[j + 1], updatedArray[j]];
          setValues([...updatedArray]); // Update the values state for visualization
          await new Promise((resolve) => setTimeout(resolve, delay)); // Delay for visualization effect
        }
      }
    }
    setIsSorting(false); // Sorting is complete
    setIsCompleted(true); // Mark as completed
  };

  // Merge Sort algorithm (Async)
  const mergeSort = async (arr) => {
    const merge = (left, right) => {
      let result = [], i = 0, j = 0;
      // Merge two sorted arrays
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
      }
      return result.concat(left.slice(i)).concat(right.slice(j));
    };

    const sort = async (arr) => {
      if (arr.length <= 1) return arr;
      const mid = Math.floor(arr.length / 2); // Find the middle index
      const left = arr.slice(0, mid); // Split the array into left part
      const right = arr.slice(mid); // Split the array into right part

      const sortedLeft = await sort(left); // Recursively sort the left part
      const sortedRight = await sort(right); // Recursively sort the right part
      const merged = merge(sortedLeft, sortedRight); // Merge the sorted parts

      setValues([...merged]); // Update the array with the merged result
      await new Promise((resolve) => setTimeout(resolve, delay)); // Delay for visualization

      return merged; // Return the merged sorted array
    };

    await sort(arr); // Start the merge sort
    setIsSorting(false); // Sorting is complete
    setIsCompleted(true); // Mark as completed
  };

  // Insertion Sort algorithm (Async)
  const insertionSort = async (arr) => {
    let updatedArray = [...arr]; // Create a copy of the array for sorting
    for (let i = 1; i < updatedArray.length; i++) {
      let key = updatedArray[i];
      let j = i - 1;
      // Move elements of arr[0..i-1] that are greater than key to one position ahead
      while (
        j >= 0 &&
        ((inputType === "numbers" && updatedArray[j] > key) ||
          (inputType === "alphabets" && updatedArray[j].localeCompare(key) > 0))
      ) {
        updatedArray[j + 1] = updatedArray[j];
        j--;
        setValues([...updatedArray]); // Update the values state for visualization
        await new Promise((resolve) => setTimeout(resolve, delay)); // Delay for visualization effect
      }
      updatedArray[j + 1] = key; // Insert the key at the correct position
      setValues([...updatedArray]); // Update the values state
      await new Promise((resolve) => setTimeout(resolve, delay)); // Delay for visualization effect
    }
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
          await new Promise((resolve) => setTimeout(resolve, delay)); // Delay for visualization
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap arr[i+1] and arr[high]
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
  
    if (!isSorting && !isCompleted) {
      setIsSorting(true); // Mark sorting as started
      setIsCompleted(false); // Reset completed state
      switch (sortingAlgorithm) {
        case "selection":
          selectionSort(values); // Run selection sort
          break;
        case "merge":
          mergeSort(values); // Run merge sort
          break;
        case "insertion":
          insertionSort(values); // Run insertion sort
          break;
        case "quick":
          quickSort(values); // Run quick sort
          break;
        case "bubble":
          bubbleSort(values); // Run bubble sort
          break;
        default:
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
  // Function to handle delay input change
  const handleDelayChange = (e) => {
    const newDelay = parseInt(e.target.value, 10);
    if (!isNaN(newDelay)) {
      setDelay(newDelay); // Set the new delay value
    } else {
      setDelay(100); // Reset to default value if the input is invalid
    }
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
          delay={delay}
          visualizationType={visualizationType}
          setVisualizationType={setVisualizationType}
        />
        
        {/* Input Field for custom input */}
        <InputField setValues={setValues} inputType={inputType} />

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
          inputType={inputType}
          visualizationType={visualizationType}
          normalizeValue={normalizeValue}
        />
      </div>
    </div>
  );
}
