const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const display = document.querySelector("#display");
const decimal = document.querySelector(".decimal");

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

function updateDisplay(value) {
    display.textContent = value;
}

function useOperator(e) {
    if (displayValue && firstNumber && operator) {
        useEquals();
        operator = e.target.textContent;
    } else {
        if (display.textContent === "0") firstNumber = "0";
        if (!firstNumber) firstNumber = displayValue;
        operator = e.target.textContent;
        displayValue = "";
    }
}

function useEquals() {
    if (displayValue && firstNumber && operator) {
        secondNumber = displayValue;
        displayValue = operate(+firstNumber, +secondNumber, operator).toString();
        updateDisplay(displayValue);
        firstNumber = displayValue;
        secondNumber = "";
        displayValue = "";
        operator = "";
    }
}

function clearDisplay() {
    updateDisplay("0");
    displayValue = "";
    firstNumber = "";
    secondNumber = "";
    operator = "";
}

function addDecimal() {
    if (!display.textContent.includes(".")) {
        display.textContent += ".";
    }
}

numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        displayValue += +e.target.textContent;
        updateDisplay(displayValue);

        console.log(firstNumber);
        console.log(operator);
        console.log(secondNumber);
        console.log(displayValue);
    });
});

operators.forEach((operator) => {
    operator.addEventListener("click", useOperator);
});

equals.addEventListener("click", useEquals);
clear.addEventListener("click", clearDisplay);
decimal.addEventListener("click", addDecimal);