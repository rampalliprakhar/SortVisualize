import Link from 'next/link';

export default function HelpPage () {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold text-blue-500 text-center mb-8">Sorting Visualizer Help</h1>

        {/* Project Overview */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">What is this?</h2>
          <p className="text-lg">
            This Sorting Visualizer helps you learn how different sorting algorithms work by showing the sorting process visually.
            You can choose from various algorithms, input types (numbers or alphabets), and control the speed of sorting to better understand how these algorithms function.
          </p>
        </div>

        {/* How it Works */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <p className="text-lg">
            The visualizer supports the following sorting algorithms:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li><strong>Selection Sort:</strong> Finds the minimum element from the unsorted portion and swaps it with the first unsorted element.</li>
            <li><strong>Merge Sort:</strong> Divides the array into two halves, sorts them recursively, and merges them back together.</li>
            <li><strong>Insertion Sort:</strong> Builds the sorted array one item at a time by picking elements and inserting them in the correct position.</li>
            <li><strong>Quick Sort:</strong> Divides the array using a pivot and sorts the elements around it recursively.</li>
            <li><strong>Bubble Sort:</strong> Repeatedly compares adjacent elements and swaps them if they are in the wrong order. This process continues until no more swaps are needed, meaning the array is sorted.</li>
          </ul>
        </div>

        {/* How to Use */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">How to Use</h2>
          <p className="text-lg">
            To use the sorting visualizer, follow these steps:
          </p>
          <ol className="list-decimal pl-6 mt-2">
            <li>Select a sorting algorithm from the dropdown menu.</li>
            <li>Choose whether you want to sort numbers or alphabets.</li>
            <li>Enter the values you want to sort in the input box (comma-separated). If you're sorting numbers, enter them like "1, 3, 100". For alphabets, use "A, B, C".</li>
            <li>Adjust the speed of sorting using the delay input.</li>
            <li>Click the "Start Sorting" button to visualize the sorting process.</li>
            <li>Switch between the "Array View" and "Bar Chart View" for different visual representations.</li>
          </ol>
        </div>

        {/* Link to go back to the visualizer */}
        <div className="flex justify-center mb-4">
        <Link href="/" legacyBehavior className='"bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"'>
          Back to Visualizer
        </Link>
        </div>
      </div>
    </div>
  );
};
