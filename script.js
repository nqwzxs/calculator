const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const display = document.querySelector("#display");

let firstNumber;
let secondNumber;
let operator;
let result;

let isNumberFirst = true;
let isOperatorUsed = false;
let isEqualsUsed = false;

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

function updateDisplay(number) {
    if (isNumberFirst) {
        display.textContent = number;
        isNumberFirst = false;        
    } else {
        display.textContent += number;
    }
}

function useOperator(e) {
    operator = e.target.textContent;
    isOperatorUsed = true;
    
    if (isEqualsUsed) {
        firstNumber = +display.textContent;
        result = null;
        isEqualsUsed = false;
        isNumberFirst = true;
    } else if (isOperatorUsed) {
        if (result || firstNumber) {
            firstNumber = result ? result : firstNumber;
            secondNumber = +display.textContent;
            result = operate(firstNumber, secondNumber, operator);
            display.textContent = result;
        } else {
            firstNumber = +display.textContent;
        }
        isNumberFirst = true;
    }

    console.log("used operator");
    console.log(firstNumber);
    console.log(secondNumber);
    console.log(result);
}

function useEquals() {
    if (isOperatorUsed && firstNumber || result) {
        firstNumber = result ? result : firstNumber;
        secondNumber = +display.textContent;
        result = operate(firstNumber, secondNumber, operator);
        display.textContent = result;

        isOperatorUsed = false;
        isEqualsUsed = true;
        isNumberFirst = true;
    }

    console.log("used equals");
    console.log(firstNumber);
    console.log(secondNumber);
    console.log(result);
}

numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        updateDisplay(e.target.textContent);
    });
});

operators.forEach((operator) => {
    operator.addEventListener("click", useOperator)
});

equals.addEventListener("click", useEquals)

// if use operator
// first = display, operator = button
// if use operator with first again
// do nothing
// if use operator with second
// second = display, operate, display = result, second = none, operator
// if use operator with result
// result = first, operator = button