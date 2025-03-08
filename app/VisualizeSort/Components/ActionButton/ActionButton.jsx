import React from 'react'

const ActionButton = ({ isSorting, isCompleted, runSortingAlgorithm, restartSorting }) => {
    return (
      <div className="flex justify-center mb-4">
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
          aria-label="Start Sorting"
          onClick={isCompleted ? restartSorting : runSortingAlgorithm}
          disabled={isSorting && !isCompleted}
        >
          {isSorting ? "Sorting..." : isCompleted ? "Restart" : "Start Sorting"}
        </button>
      </div>
    );
  };
  
export default ActionButton;