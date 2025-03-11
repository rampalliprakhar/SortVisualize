import React from 'react';

const Visualization = ({ values, positions, visualizationType, normalizeValue, highlightedIndices = [] }) => {
  return (
    <div className="flex justify-center mb-8 relative h-96 border-4 border-dashed border-blue-500 rounded-lg">
      {visualizationType === "bars" ? (
        <div className="relative flex items-end justify-center space-x-1 w-full max-w-3xl">
          {values.map((value, index) => {
            // Find the current index's position for animation
            const leftPosition = positions[index] * 35;

            // Check if the current index is highlighted
            const isHighlighted = highlightedIndices.includes(index);

            return (
              <div
                key={index}
                className={`absolute transition-all duration-500 ${isHighlighted ? 'bg-red-500' : ''}`}
                style={{
                  alignItems:"center",
                  backgroundColor: isHighlighted ? "#ff5733" : "#00ff00",
                  bottom: 0,
                  display: "flex",
                  flexDirection: "column",
                  height: `${Math.max(normalizeValue(value), 20)}px`,
//                  height: `${Math.max(value * 3, 30)}px`,
                  justifyContent:"flex-end",
                  left: `${leftPosition}px`,
                  position: "absolute",
                  transition: "left 0.5s ease-in-out",
                  width: "30px",
                }}
              >
                <span 
                  style={{
                    bottom:"2px",
                    color: normalizeValue * 3 < 20 ? "black":"white",
                    fontSize: "14px",
                    fontWeight: "bold",
                    position: "absolute",
                    textAlign:"center",
                    width:"100%"
                  }}
                >{value}</span>
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
                    border: '1px solid #ccc', 
                    borderRadius: '4px', 
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',  
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