import React from "react";

const Visualization = ({ values, positions, visualizationType, normalizeValue, highlightedIndices, theme = [] }) => {
  const getThemeColors = (theme) => {
    switch (theme) {
      case "dark":
        return { barColor: "#3498db", textColor: "#ecf0f1", bgColor: "#2c3e50" };
      case "pastel":
        return { barColor: "#f8b195", textColor: "#355c7d", bgColor: "#f8f1f1" };
      case "neon":
        return { barColor: "#39ff14", textColor: "#ff00ff", bgColor: "#000000" };
      default:
        return { barColor: "#00ff00", textColor: "#202020", bgColor: "#ffffff" };
    }
  };

  const { barColor, textColor } = getThemeColors(theme);

  return (
    <div className="flex justify-center mb-8 relative h-96 border-4 border-dashed border-blue-500 rounded-lg">
    {visualizationType === "bars" ? (
      <div className="relative flex items-end justify-center space-x-1 w-full max-w-3xl">
          {values.map((value, index) => {
            const leftPosition = positions[index] * 35;

            const isHighlighted = highlightedIndices.includes(index);

            return (
              <div
                key={index}
                className={`absolute transition-all duration-500 ${
                  isHighlighted ? 'bg-red-500' : ''
                }`}
                style={{
                  left: `${leftPosition}px`,
                  bottom: 0,
                  width: "30px",
                  height: `${Math.max(value * 3, 20)}px`,
                  backgroundColor: isHighlighted ? "#ff5733" : barColor,
                  color: textColor,
                  transition: "left 0.5s ease-in-out",
                }}
              >
                <span style={{ color: textColor, fontWeight: "bold", fontSize: "14px" }}>
                  {value}
                </span>
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
