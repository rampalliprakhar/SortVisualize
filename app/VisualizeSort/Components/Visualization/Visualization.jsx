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
                position:"relative",
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