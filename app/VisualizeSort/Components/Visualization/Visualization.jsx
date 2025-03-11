import React, { useState, useEffect } from 'react';

const Visualization = ({ values, visualizationType, normalizeValue, highlightedIndices = [] }) => {
  // Generate initial positions based on array indices
  const [positions, setPositions] = useState(values.map((_, index) => index));

  useEffect(() => {
    setPositions(values.map((_, index) => index)); // Reset positions when values change
  }, [values]);

  return (
    <div className="flex justify-center mb-8 relative h-96 border-4 border-dashed border-blue-500 rounded-lg">
      {visualizationType === "bars" ? (
        <div className="relative flex items-end justify-center space-x-1 w-full max-w-3xl">
          {values.map((value, index) => {
            // Calculate the left position 
            const leftPosition = positions[index] * 35;

            // Check if the current index is highlighted
            const isHighlighted = highlightedIndices.includes(index);

            return (
              <div
                key={index}
                className={`flex items-end justify-center absolute transition-all duration-300`}
                style={{
                  height: `${normalizeValue(value)}%`,
                  left: `${leftPosition}px`,
                  bottom: 0,
                  width: "30px",
                  transition: "all 0.5s ease-in-out",
                  position: "absolute"
                }}
              >
                <div
                  style={{
                    backgroundColor: isHighlighted ? "#ff5733" : "#00ff00",  
                    height: '100%',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <span style={{ marginBottom: "5px", color: "#202020" }}>{value}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full max-w-3xl h-96 flex justify-center items-center border-4 border-dashed border-blue-500 rounded-lg">
          <div className="text-xl font-bold flex space-x-2">
            {values.map((value, index) => {
              // Check if the current element is highlighted 
              const isHighlighted = highlightedIndices.includes(index);

              return (
                <div
                  key={index}
                  className={`px-2 py-1 mx-1 rounded-md transition-all duration-500 ${isHighlighted ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                  style={{
                    backgroundColor: '#f0f0f0', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px', 
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
                    display: 'inline-block', 
                    fontSize: '18px', 
                    fontWeight: 'bold', 
                    minWidth: '40px',
                    padding: '8px 12px', 
                    textAlign: 'center',
                    transform: isHighlighted ? "scale(1.1)" : "scale(1)",
                    transition: 'transform 0.3s ease-in-out',  
                  }}
                >
                  {value}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Visualization;