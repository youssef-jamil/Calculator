// Light / Dark theme toggle script
const toggleElement = document.querySelector(".themes__toggle");

const toggleDarkTheme = () => {
  toggleElement.classList.toggle("themes__toggle--isActive");
};
// Add keyboard accessibility
const DarkThemeWithEnter = (event) => {
  if (event.key === "Enter" || event.key === " ") {
    toggleDarkTheme();
  }
};
// Event listeners
toggleElement.addEventListener("keydown", DarkThemeWithEnter);
toggleElement.addEventListener("click", toggleDarkTheme);
// End theme toggle script
// Create Logic for Calculator
let storedNumber = "",
  currentNumber = "",
  calculationOperator = "";

const calcScreen = document.querySelector(".calc__result");
const KeyNumbers = document.querySelectorAll(".calc__key[data-type]");
const updateScreen = (value) => {
  calcScreen.innerText = !value ? "0" : value;
};
const numberClick = (value) => {
  if (value === "." && currentNumber.includes(".")) {
    return;
  }
  if (value === "0" && !currentNumber) {
    return;
  }
  currentNumber += value;
  updateScreen(currentNumber);
};

// Reset all calculator values
const resetAll = () => {
  storedNumber = "";
  currentNumber = "";
  calculationOperator = "";
  updateScreen(currentNumber);
};

// Delete button functionality
const deleteButtonHandler = () => {
  if (!currentNumber || currentNumber === "0") return;
  if (currentNumber.length === 1) {
    currentNumber = "";
  } else {
    currentNumber = currentNumber.slice(0, -1);
  }
  updateScreen(currentNumber);
};

// Execute calculation
const executeCalculation = () => {
  if (currentNumber && storedNumber && calculationOperator) {
    switch (calculationOperator) {
      case "+":
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
        break;
      case "-":
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
        break;
      case "*":
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);

        break;
      case "/":
        storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
        break;
    }
    currentNumber = "";
    updateScreen(storedNumber);
  }
};

// Handle operator click
const operatorClick = (value) => {
  if (!currentNumber && !storedNumber) return;
  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    calculationOperator = value;
  } else if (storedNumber) {
    calculationOperator = value;
    if (currentNumber) {
      executeCalculation();
    }
  }
};

// Handle key elements
const keyElementsHandler = (element) => {
  element.addEventListener("click", () => {
    if (element.dataset.type === "number") {
      numberClick(element.dataset.value);
    } else if (element.dataset.type === "operation") {
      switch (element.dataset.value) {
        // Add a Handler for reset Button
        case "c":
          resetAll();
          break;
        // Add a Handler for the Delete Button
        case "Backspace":
          deleteButtonHandler();
          break;
        case "Enter":
          executeCalculation();
          break;
        default:
          operatorClick(element.dataset.value);
          break;
      }
    }
  });
};

KeyNumbers.forEach(keyElementsHandler);

// End Calculator Logic
// Keyboard support for calculator
const availableNumbers = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "."
];
const availableOperations = ["+", "-", "*", "/"];
const specialKeys = ["Enter", "Backspace", "c"];
const availableKeys = [
  ...availableNumbers,
  ...availableOperations,
  ...specialKeys
];
window.addEventListener("keydown", (event) => {
  keyboardWithHover(event.key);
});
// Function to simulate key press with hover effect
const keyboardWithHover = (key) => {
  if (availableKeys.includes(key)) {
    const keyElement = document.querySelector(`[data-value="${key}"]`);
    keyElement.classList.add("hover");
    keyElement.click();
    setTimeout(() => {
      keyElement.classList.remove("hover");
    }, 100);
  }
};
