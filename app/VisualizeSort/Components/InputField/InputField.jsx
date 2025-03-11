import React, { useState } from "react";

const InputField = ({ setValues, setIsSorting, inputType, setIsCompleted }) => {
  const [userInput, setUserInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setUserInput(e.target.value);
    setErrorMessage("");
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
        if(newValues.length === 0){
          setErrorMessage("Please enter valid numbers!!");
        } else {
          setValues(newValues);
        }
    } else {
      // If inputType is 'alphabets', convert input to an array of characters
      newValues = userInput
        .split(",")
        .map((val) => val.trim().toUpperCase())
        .filter((val) => /^[A-Z]$/.test(val));
      if (newValues.length === 0){
        setErrorMessage("Please enter valid alphabets!!");
      } else {
        setValues(newValues);
      }
    }
  };

  // Function to generate a random array based on the input type
  const generateRandomArray = () => {  
    setIsSorting(false);  // Reset sorting state
    setIsCompleted(false); // Ensure sorting can restart
  
    let randomValues = [];
    const arrayLength = 10;
  
    if (inputType === "numbers") {
      for (let i = 0; i < arrayLength; i++) {
        randomValues.push(Math.floor(Math.random() * 100));
      }
    } else {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < arrayLength; i++) {
        randomValues.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      }
    }
  
    setValues(randomValues);
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
      {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default InputField;