export default function ActionButton({
  isSorting,
  isCompleted,
  runSortingAlgorithm,
  restartSorting,
}) {
  return (
    <div className="flex justify-center mb-4 space-x-4">
      <button
        onClick={runSortingAlgorithm}
        disabled={isSorting}
        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
      >
        {isSorting ? "Sorting..." : "Start Sorting"}
      </button>

      <button
        onClick={restartSorting}
        disabled={isSorting}
        className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:opacity-50 transition"
      >
        Restart
      </button>
    </div>
  );
}
