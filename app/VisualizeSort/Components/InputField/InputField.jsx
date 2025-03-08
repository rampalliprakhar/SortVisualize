import React, { useState } from "react";

const InputField = ({ setValues, inputType }) => {
  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  // Function to handle the input submission
  const handleSubmit = () => {
    let newValues = [];

    // If inputType is 'numbers', convert input to an array of numbers
    if (inputType === "numbers") {
      newValues = userInput
        .split(",")
        .map((val) => parseInt(val.trim(), 10))
        .filter((val) => !isNaN(val));
    } else {
      // If inputType is 'alphabets', convert input to an array of characters
      newValues = userInput.split(",").map((val) => val.trim().toUpperCase());
    }

    // Update the state with the new values (if valid input)
    if (newValues.length > 0) {
      setValues(newValues);
    }
  };

  // Function to generate a random array based on the input type
  const generateRandomArray = () => {
    let randomValues = [];
    const arrayLength = 10; // You can change this to adjust how many values to generate

    if (inputType === "numbers") {
      for (let i = 0; i < arrayLength; i++) {
        randomValues.push(Math.floor(Math.random() * 100)); // Generate random numbers
      }
    } else if (inputType === "alphabets") {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < arrayLength; i++) {
        randomValues.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      }
    }

    setValues(randomValues); // Set random array as the values
  };

  return (
    <div className="flex flex-col items-center mb-4 space-y-4">
      <div className="flex space-x-2">
        <input
          type="text"
          className="py-2 px-4 rounded-md border border-gray-300"
          placeholder={`Enter ${inputType === "numbers" ? "numbers" : "letters"} separated by commas`}
          value={userInput}
          onChange={handleChange}
        />
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <button
        className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700"
        onClick={generateRandomArray}
      >
        Generate Random {inputType === "numbers" ? "Numbers" : "Alphabets"}
      </button>
    </div>
  );
};

export default InputField;