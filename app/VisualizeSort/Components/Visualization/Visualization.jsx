import React from 'react';

const Visualization = ({ values, inputType, visualizationType, normalizeValue, highlightedIndices = [] }) => {
  return (
    <div className="flex justify-center mb-8 relative h-96 border-4 border-dashed border-blue-500 rounded-lg">
      {visualizationType === "bars" ? (
        <div className="relative flex items-end justify-center space-x-1 w-full max-w-3xl">
          {values.map((value, index) => (
            <div
              key={index}
              style={{
                height: `${normalizeValue(value)}%`,
                width: "30px",
                backgroundColor: highlightedIndices.includes(index) ? "#ff5733" : "#00ff00",
                transition: "all 0.5s ease-in-out",
                position: "absolute",
                left: `${index * 35}px`,
              }}
            >
              {/* Display the value inside the bar */}
              <span
                style={{
                  bottom: '100%',
                  color: '#000',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  left: '50%',
                  position: 'absolute',
                  transform: 'translateX(-50%)',
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full max-w-3xl h-96 flex justify-center items-center border-4 border-dashed border-blue-500 rounded-lg">
          <div className="text-xl font-bold flex space-x-2">
            {values.map((value, index) => (
              <div
                key={index}
                className={`px-2 py-1 mx-1 rounded-md transition-all duration-500 ${highlightedIndices.includes(index) ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
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
                  textAlign: 'center'
                }}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Visualization;