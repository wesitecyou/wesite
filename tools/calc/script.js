const display = document.getElementById('number-display');
const operatorDisplay = document.getElementById('operator-display');
let currentValue = '0';
let operator = null;
let previousValue = null;
let waitingForSecondValue = false;
function updateDisplay() {
    if (currentValue.length > 10) {
        currentValue = parseFloat(currentValue).toExponential(5);
    }
    display.textContent = currentValue;
}
function updateOperatorDisplay() {
    if (operator) {
        operatorDisplay.textContent = getOperatorSymbol(operator);
    } else {
        operatorDisplay.textContent = '';
    }
}
function getOperatorSymbol(op) {
    switch (op) {
        case 'add':
            return '+';
        case 'subtract':
            return '−';
        case 'multiply':
            return '×';
        case 'divide':
            return '÷';
        case 'equals':
            return '=';
        default:
            return '';
    }
}
function handleNumber(number) {
    if (waitingForSecondValue) {
        currentValue = number;
        waitingForSecondValue = false;
    } else {
        currentValue = currentValue === '0' ? number : currentValue + number;
    }
    updateDisplay();
}
function handleOperator(nextOperator) {
    if (operator && !waitingForSecondValue) {
        performCalculation();
    }
    operator = nextOperator;
    previousValue = currentValue;
    waitingForSecondValue = true;
    updateOperatorDisplay();
}
function performCalculation() {
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    if (operator === 'add') {
        currentValue = String(roundResult(prev + current));
    } else if (operator === 'subtract') {
        currentValue = String(roundResult(prev - current));
    } else if (operator === 'multiply') {
        currentValue = String(roundResult(prev * current));
    } else if (operator === 'divide') {
        currentValue = String(roundResult(prev / current));
    }
    operator = null;
    previousValue = currentValue;
    waitingForSecondValue = true;
    updateDisplay();
    updateOperatorDisplay();
}
function roundResult(value) {
    return Math.round(value * 1000000000000000) / 1000000000000000;
}
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        const { id } = button;
        if (['add', 'subtract', 'multiply', 'divide'].includes(id)) {
            handleOperator(id);
        } else if (id === 'equals') {
            performCalculation();
            operator = 'equals';
            updateOperatorDisplay();
            operator = null;
        } else if (id === 'clear') {
            currentValue = '0';
            operator = null;
            previousValue = null;
            waitingForSecondValue = false;
            operatorDisplay.textContent = '';
        } else if (id === 'plus-minus') {
            currentValue = String(parseFloat(currentValue) * -1);
        } else if (id === 'percent') {
            currentValue = String(roundResult(parseFloat(currentValue) / 100));
        } else if (id === 'decimal') {
            if (!currentValue.includes('.')) {
                currentValue += '.';
            }
        } else {
            handleNumber(id);
        }
        updateDisplay();
    });
});
updateDisplay();