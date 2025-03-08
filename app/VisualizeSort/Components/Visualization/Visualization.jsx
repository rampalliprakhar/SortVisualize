import React from 'react';

const Visualization = ({ values, inputType, visualizationType, normalizeValue }) => {
  return (
    <div className="flex justify-center mb-8">
      {visualizationType === "bars" ? (
        <div className="w-full max-w-3xl h-96 flex items-end justify-center space-x-1 border-4 border-dashed border-blue-500 rounded-lg">
          {values.map((value, index) => (
            <div
              key={index}
              style={{
                height: `${normalizeValue(value)}%`,
                width: "10px",
                backgroundColor: "#00ff00",
                marginBottom: "2px",
                margin: "0 5px",
                transition: "height 0.3s ease-in-out",
              }}
            />
          ))}
        </div>
      ) : (
        <div className="w-full max-w-3xl h-96 flex justify-center items-center">
          <div className="text-xl font-bold">{values.join(" | ")}</div>
        </div>
      )}
    </div>
  );
};

export default Visualization;
