console.log('script loaded');

const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');

let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;


function calculate(first, operator, second) {
    switch (operator) {
        case '+': return first + second;
        case '-': return first - second;
        case '*': return first * second;
        case '/': return second !== 0 ? first / second : '오류';
        default: return second;
    }
}

buttons.forEach(button => {
    button.addEventListener('click', event => {
        const target = event.currentTarget;
        const value = target.textContent;

        console.log('버튼 클릭됨:', value);

        if (value === 'C') {
            display.textContent = '0';
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;

        } else if (value === '.') {
            if (waitingForSecondOperand) {
                display.textContent = '0.';
                waitingForSecondOperand = false;
            } else if (!display.textContent.includes('.')) {
                display.textContent += '.';
            }

        } else if (target.classList.contains('number')) {
            if (display.textContent === '0' || waitingForSecondOperand) {
                display.textContent = value;
                waitingForSecondOperand = false;
            } else {
                display.textContent += value;
            }

        } else if (target.classList.contains('operator')) {
            if (value === '=') {
                if (operator && firstOperand !== null && !waitingForSecondOperand) {
                    const secondOperand = parseFloat(display.textContent);
                    const result = calculate(firstOperand, operator, secondOperand);

                    display.textContent = result;
                    firstOperand = typeof result === 'number' ? result : null;
                    operator = null;
                    waitingForSecondOperand = true;
                }
            } else {
                const inputValue = parseFloat(display.textContent);

                if (operator && firstOperand !== null && !waitingForSecondOperand) {

                    const result = calculate(firstOperand, operator, inputValue);
                    display.textContent = result;
                    firstOperand = typeof result === 'number' ? result : null;
                } else {

                    firstOperand = inputValue;
                }

                operator = value;
                waitingForSecondOperand = true;

                console.log('firstOperand:', firstOperand);
                console.log('operator:', operator);
            }
        }
    });
});
