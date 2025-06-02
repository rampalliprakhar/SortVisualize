"use client";

import { useState, useEffect } from "react";
import SortControls from "../Controls/SortControls";
import Visualization from "../Visualization/Visualization";
import ActionButton from "../ActionButton/ActionButton";
import InputField from "../InputField/InputField";
import AudioManager from "../AudioManager";
import PerformanceMetrics from "../PerformanceMetrics";

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

  const [audioManager, setAudioManager] = useState(null);

  const [metrics, setMetrics] = useState({
    comparisons: 0,
    swaps: 0,
    executionTime: 0,
    spaceComplexity: "n",
  });

  useEffect(() => {
    setAudioManager(new AudioManager());
  }, []);

  const compare = (a, b) => {
    setMetrics((prev) => ({ ...prev, comparisons: prev.comparisons + 1 }));
    if (audioManager) {
      audioManager.playSound(a, "compare");
    }
    return inputType === "numbers" ? a - b : String(a).localeCompare(String(b));
  };

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
      randomValues = Array.from(
        { length: arrayLength },
        () => Math.floor(Math.random() * 100) + 1
      );
    } else if (inputType === "alphabets") {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      randomValues = Array.from(
        { length: arrayLength },
        () => alphabet[Math.floor(Math.random() * alphabet.length)]
      );
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
  const swap = async (
    arr,
    pos,
    i,
    j,
    setValues,
    setPositions,
    setHighlightedIndices,
    delay
  ) => {
    return new Promise((resolve) => {
      metrics.swaps++;
      setMetrics((prev) => ({ ...prev, swaps: prev.swaps + 1 }));

      if (audioManager) {
        audioManager.playSound(arr[i], "swap");
      }

      setHighlightedIndices([i, j]); // Highlight the elements being swapped

      // Animate the swap by updating positions first
      setPositions((prevPositions) => {
        const newPositions = [...prevPositions];
        [newPositions[i], newPositions[j]] = [newPositions[j], newPositions[i]];
        return newPositions;
      });

      setTimeout(() => {
        // Performing swap
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setValues([...arr]); // Update the values state

        setHighlightedIndices([]); // Remove highlight
        resolve();
      }, delay);
    });
  };

  const selectionSort = async (
    arr,
    positions,
    setValues,
    setPositions,
    setHighlightedIndices,
    delay
  ) => {
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (compare(arr[j], arr[minIndex]) < 0) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        await swap(
          arr,
          positions,
          i,
          minIndex,
          setValues,
          setPositions,
          setHighlightedIndices,
          delay
        );
      }
    }
  };

  // Bubble Sort algorithm (Async)
  const bubbleSort = async (
    arr,
    positions,
    setValues,
    setPositions,
    setHighlightedIndices,
    delay
  ) => {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (compare(arr[j], arr[j + 1]) > 0) {
          await swap(
            arr,
            positions,
            j,
            j + 1,
            setValues,
            setPositions,
            setHighlightedIndices,
            delay
          );
        }
      }
    }
  };

  // Merge Sort algorithm (Async)
  const mergeSort = async (
    arr,
    positions,
    setValues,
    setPositions,
    setHighlightedIndices,
    delay
  ) => {
    const merge = async (left, right) => {
      let result = [];
      let i = 0,
        j = 0;
      while (i < left.length && j < right.length) {
        if (compare(left[i], right[j]) <= 0) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
        setValues([...result, ...left.slice(i), ...right.slice(j)]);
        setHighlightedIndices([i, j]);
        await new Promise((resolve) => setTimeout(resolve, delay));
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

    const sortedArray = await sort([...arr]);
    setValues(sortedArray);
    setHighlightedIndices([]);
  };

  // Insertion Sort algorithm (Async)
  const insertionSort = async (
    arr,
    positions,
    setValues,
    setPositions,
    setHighlightedIndices,
    delay
  ) => {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && compare(arr[j], key) > 0) {
        arr[j + 1] = arr[j];
        positions[j + 1] = positions[j];
        j--;
        setHighlightedIndices([j + 1, i]);
        setValues([...arr]);
        setPositions([...positions]);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      arr[j + 1] = key;
      positions[j + 1] = positions[i];
      setValues([...arr]);
      setPositions([...positions]);
    }
    setHighlightedIndices([]);
  };

  // Quick Sort algorithm (Async)
  const quickSort = async (
    arr,
    positions,
    setValues,
    setPositions,
    setHighlightedIndices,
    delay
  ) => {
    const partition = async (arr, low, high) => {
      let pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        if (compare(arr[j], pivot) < 0) {
          i++;
          await swap(
            arr,
            positions,
            i,
            j,
            setValues,
            setPositions,
            setHighlightedIndices,
            delay
          );
        }
      }
      await swap(
        arr,
        positions,
        i + 1,
        high,
        setValues,
        setPositions,
        setHighlightedIndices,
        delay
      );
      return i + 1;
    };

    const sort = async (arr, low, high) => {
      if (low < high) {
        let pi = await partition(arr, low, high);
        await sort(arr, low, pi - 1);
        await sort(arr, pi + 1, high);
      }
    };
    await sort(arr, 0, arr.length - 1);
  };

  const getSpaceComplexity = (algorithm) => {
    switch (algorithm) {
      case "merge":
        return "n";
      case "quick":
        return "log n";
      case "selection":
      case "bubble":
      case "insertion":
        return "1";
      default:
        return "n";
    }
  };

  // Function to run the selected sorting algorithm
  const runSortingAlgorithm = async () => {
    if (values.length === 0) {
      alert("Please provide input values first!");
      return;
    }

    if (!isSorting) {
      let arrCopy = [...values];
      let posCopy = [...positions];

      setIsSorting(true);
      setIsCompleted(false);

      // Reset and start tracking metrics
      setMetrics((prev) => ({ ...prev, comparisons: 0, swaps: 0 }));
      const startTime = performance.now();

      switch (sortingAlgorithm) {
        case "selection":
          await selectionSort(
            arrCopy,
            posCopy,
            setValues,
            setPositions,
            setHighlightedIndices,
            delay
          );
          break;
        case "bubble":
          await bubbleSort(
            arrCopy,
            posCopy,
            setValues,
            setPositions,
            setHighlightedIndices,
            delay
          );
          break;
        case "insertion":
          await insertionSort(
            arrCopy,
            posCopy,
            setValues,
            setPositions,
            setHighlightedIndices,
            delay
          );
          break;
        case "quick":
          await quickSort(
            arrCopy,
            posCopy,
            setValues,
            setPositions,
            setHighlightedIndices,
            delay
          );
          break;
        case "merge":
          await mergeSort(
            arrCopy,
            posCopy,
            setValues,
            setPositions,
            setHighlightedIndices,
            delay
          );
          break;
        default:
          console.warn("Unknown sorting algorithm:", sortingAlgorithm);
          break;
      }

      const endTime = performance.now();
      setMetrics((prev) => ({
        ...prev,
        executionTime: Math.round(endTime - startTime),
        spaceComplexity: getSpaceComplexity(sortingAlgorithm),
      }));

      setIsSorting(false);
      setIsCompleted(true);
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
    if (typeof value === "string") {
      return ((value.charCodeAt(0) - 65) / (90 - 65)) * 100; // Values are uppercase letters A-Z
    }

    // If the value is a number
    if (typeof value === "number") {
      const maxValue = Math.max(...values); // Get the max value from the list
      return (value / maxValue) * 100; // Normalize number as a percentage
    }

    // Return a default value
    return 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold text-blue-500 text-center mb-8">
          Sorting Visualizer
        </h1>

        {/* Performance Metrics */}
        <div className="mb-4">
          <PerformanceMetrics metrics={metrics} />
        </div>

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
