const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const display = document.querySelector("#display");
const decimal = document.querySelector(".decimal");
const deleteNumber = document.querySelector(".delete-number");

let displayValue = "";
let firstNumber = "";
let secondNumber = "";
let operator = "";

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(firstNumber, secondNumber, operator) {
    switch (operator) {
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return subtract(firstNumber, secondNumber);
        case "*":
            return multiply(firstNumber, secondNumber);
        case "/":
            return divide(firstNumber, secondNumber);
    }
}

function displayOperator() {
    const operators = ["+", "-", "*", "/"]; 
    if (operators.some(operator => display.textContent.includes(operator))) {
        display.textContent = display.textContent.slice(0, -2);
    }
    display.textContent += ` ${operator}`;
}

function useOperator(e) {
    if (displayValue && firstNumber && operator) {
        useEquals();
        operator = e.target.textContent;
    } else {
        if (display.textContent === "ERROR!!1") return;
        if (display.textContent === "0") firstNumber = "0";
        if (!firstNumber) firstNumber = displayValue;
        operator = e.target.textContent;
        displayValue = "";
    }

    displayOperator();
}

function useEquals() {
    if (displayValue === "0" && operator === "/") {
        clearDisplay();
        display.textContent = "ERROR!!1";
    } else if (displayValue && firstNumber && operator) {
        secondNumber = displayValue;
        displayValue = (Math.round(operate(+firstNumber, +secondNumber, operator) * 100) / 100).toString();
        display.textContent = `= ${displayValue}`;
        firstNumber = displayValue;
        secondNumber = "";
        displayValue = "";
        operator = "";
    }
}

function clearDisplay() {
    display.textContent = "0";
    displayValue = "";
    firstNumber = "";
    secondNumber = "";
    operator = "";
}

function deleteLast() {
    if (displayValue.length <= 1) {
        displayValue = "";
        display.textContent = "0";
    } else {
        displayValue = displayValue.slice(0, -1);
        display.textContent = displayValue;
    }
}

function addDecimal() {
    if (!displayValue.includes(".")) {
        if (display.textContent === "0") {
            displayValue = "0.";
        } else {
            displayValue += ".";
        }    
        display.textContent = displayValue;
    }
}

numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        if (displayValue.length > 8) return;
            
        if (displayValue === "0") {
            displayValue = "0";
        } else {
            displayValue += +e.target.textContent;
        }    
        display.textContent = displayValue;        
    });
});

operators.forEach((operator) => {
    operator.addEventListener("click", useOperator);
});

equals.addEventListener("click", useEquals);
clear.addEventListener("click", clearDisplay);
decimal.addEventListener("click", addDecimal);
deleteNumber.addEventListener("click", deleteLast);