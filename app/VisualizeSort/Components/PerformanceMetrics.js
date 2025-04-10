import React from "react";

export default function PerformanceMetrics({ metrics }) {
    return (
      <div className="flex flex-col items-center mb-4 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <div className="bg-blue-600 text-white py-2 px-4 rounded-md text-center">
            <p className="text-lg font-bold">{metrics.comparisons}</p>
            <p className="text-sm">Comparisons</p>
          </div>
          <div className="bg-blue-600 text-white py-2 px-4 rounded-md text-center">
            <p className="text-lg font-bold">{metrics.swaps}</p>
            <p className="text-sm">Swaps</p>
          </div>
          <div className="bg-blue-600 text-white py-2 px-4 rounded-md text-center">
            <p className="text-lg font-bold">{metrics.executionTime}ms</p>
            <p className="text-sm">Time</p>
          </div>
          <div className="bg-blue-600 text-white py-2 px-4 rounded-md text-center">
            <p className="text-lg font-bold">O({metrics.spaceComplexity})</p>
            <p className="text-sm">Space</p>
          </div>
        </div>
      </div>
    );
}