const inputDisplay = document.getElementById("calculator-input");
const outputDisplay = document.getElementById("calculator-output");
const buttons = document.querySelectorAll(".calculator-buttons button");

let history = [];

function updateHistoryDisplay() {
  const historyDisplay = document.getElementById("history-display");
  historyDisplay.innerHTML = history
    .map((entry) => `<div>${entry}</div>`)
    .join("");
}

function calculateExpression(expression) {
  try {
    const result = eval(expression);
    history.push(`${expression} = ${result}`);
    updateHistoryDisplay();
    return result;
  } catch (error) {
    return "Error";
  }
}

document.getElementById("clear-history-btn").addEventListener("click", () => {
  history = [];
  updateHistoryDisplay();
});

let currentInput = "";

function updateDisplay() {
  inputDisplay.textContent = currentInput || "0";
}

function appendToInput(value) {
  currentInput += value;
  updateDisplay();
}

function clearLastEntry() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function clearAll() {
  currentInput = "";
  outputDisplay.textContent = "0";
  updateDisplay();
}

function calculate() {
  if (!currentInput) return;

  try {
    const expression = currentInput.replace(/\^/g, "**");
    const result = eval(expression);
    history.push(`${currentInput} = ${result}`);
    updateHistoryDisplay();
    outputDisplay.textContent = result;
    currentInput = ""; 
    updateDisplay();
  } catch (error) {
    outputDisplay.textContent = "Error";
  }
}

function handleKeyboardInput(event) {
  const key = event.key;

  if (!isNaN(key) || key === ".") {
    appendToInput(key);
  } else if (["+", "-", "*", "/", "^", "(", ")"].includes(key)) {
    appendToInput(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    clearLastEntry();
  } else if (key === "Escape") {
    clearAll();
  }
}

document.addEventListener("keydown", handleKeyboardInput);

buttons.forEach(button => {
  const value = button.value;

  button.addEventListener("click", () => {
    if (value === "=") {
      calculate();
    } else if (button.id === "clear-btn") {
      clearLastEntry();
    } else if (button.id === "clear-all-btn") {
      clearAll();
    } else {
      appendToInput(value);
    }
  });
});

document.getElementById("equal-sign").addEventListener("click", () => {
  calculate();
});

updateDisplay();
outputDisplay.textContent = "0";