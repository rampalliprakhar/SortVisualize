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
        <div className="relative flex-wrap items-start space-x-1 w-full max-w-3xl overflow-hidden">
          {values.map((value, index) => {
            //const leftPosition = positions[index] * 35;
            const isHighlighted = highlightedIndices.includes(index);
            const maxHeight = Math.max(...values);
            const heightPercentage = (value / maxHeight) * 100;

            return (
              <div
                key={index}
                className= "bar absolute"
                data-index={index}
                style={{
                  alignItems: "center",
                  backgroundColor: isHighlighted ? "#ff5733" : barColor,
                  borderRadius: "4px",
                  bottom: 0,
                  color: textColor,
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "12px",
                  fontWeight: "bold",
                  height: `${Math.max(heightPercentage, 5)}%`,
                  justifyContent: "flex-end",
                  position: "absolute",
                  transform: `translateX(${positions[index] * 35}px) rotateY(${isHighlighted ? "15deg" : "0deg"})`,
                  transition: "transform 0.5s ease-in-out",
                  width: "30px",
                }}
              >
                <span
                  style={{
                    color: textColor,
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginBottom: "2px",
                    textAlign: "center",
                  }}
                >
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full max-w-3xl h-auto flex justify-center items-center border-4 border-dashed border-blue-500 rounded-lg p-4 overflow-x-auto">
          <div className="text-lg font-bold flex flex-nowrap gap-2 justify-center">
            {values.map((value, index) => {
              const isHighlighted = highlightedIndices.includes(index);

              return (
                <div
                  key={index}
                  className={`px-2 py-1 rounded-md transition-transform duration-500 ${
                    isHighlighted ? "bg-red-500 text-white" : "bg-gray-200"
                  }`}
                  style={{
                    border: "1px solid #ccc",
                    minWidth: "20px",
                    padding: "8px 10px",
                    textAlign: "center",
                    fontSize: "clamp(12px, 3vw, 18px)", 
                    order: positions[index], 
                    transition: "order 0.5s ease-in-out",
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