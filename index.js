const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById("clear-screen");
const currentCal = document.querySelector(".current-cal");

//variable used to store operands and operators globally
let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

//this function will update the last calculation text
function updateCurrCal(val1, val2, oper) {
    if (oper === '/') {
        oper = '÷';
    }
    if (oper === '*') {
        oper = '×';
    }
    currentCal.textContent = `${val1} ${oper}  ${val2}`;
}

//this function checks if an operator has been entered or not, if entered, starts a new operand 
//considers the operand to be contnuious 
function sendButtonValue(buttonVal) {
    if (awaitingNextValue) {
        calculatorDisplay.textContent = buttonVal;
        awaitingNextValue = false;
    } else {
        const displayValue = calculatorDisplay.textContent
        calculatorDisplay.textContent = displayValue === '0' ? buttonVal : (displayValue + buttonVal);
    }

}

// disables multiple decimals and decimals once operators are entered
function handleDecimal() {
    if (awaitingNextValue) {
        return;
    }
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

//using object to apply simple functionality
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
};

//updating operator and calculation
function useOperator(operator) {
    const selectedNumber = Number(calculatorDisplay.textContent);
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator; //to update operator if we press wrong and to continue multiple operations on results
        return; // do not proceed if we already have an operator and are waiting for another input
    }
    if (!firstValue) {
        firstValue = selectedNumber;
    } else {
        const calculationResult = calculate[operatorValue](firstValue, selectedNumber);
        calculatorDisplay.textContent = calculationResult;
        updateCurrCal(firstValue, selectedNumber, operatorValue);
        firstValue = calculationResult; //to continue operations on obtained results
    }
    awaitingNextValue = true;
    operatorValue = operator;
}

//event listeners on buttons
inputBtns.forEach((button) => {
    if (button.classList.length === 0) {
        button.addEventListener('click', () => sendButtonValue(button.value));
    } else if (button.classList.contains('operator')) {
        button.addEventListener('click', () => useOperator(button.value));
    } else if (button.classList.contains('decimal')) {
        button.addEventListener('click', () => handleDecimal());
    }
});

//Adding the clear button functionality 
function resetAll() {
    calculatorDisplay.textContent = '0';
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    currentCal.textContent = '0';
}

clearBtn.addEventListener('click', () => resetAll());