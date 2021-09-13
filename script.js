let currentValue = "";
let previousValue = "";
let operator = "";
let grid = document.getElementById("button-grid");
const display = document.getElementById("calculator-screen");
for (let i = 1; i <= 18; ++i) {
    let cellButton = document.createElement("button");
    if (i % 4 != 0 && i >= 5 && i <= 15) {
        cellButton.textContent = 11 - i + Math.floor(i / 4) + (i % 4 - 1) * 2;
        cellButton.addEventListener("click",
            function () {
                pressNonZeroDigit(this.textContent);
            });
    }
    else {
        switch (i) {
            case 1: cellButton.textContent = "AC";
                cellButton.addEventListener("click", function () {
                    currentValue = "";
                    previousValue = "";
                    display.textContent = "";
                });
                break;
            case 2: cellButton.textContent = "CE";
                cellButton.addEventListener("click",
                    function () {
                        clearEntry();
                    });
                break;
            case 3: cellButton.textContent = "\u0025";
                cellButton.addEventListener("click",
                    function () {
                        pressPercentage();
                    }); break;
            case 4: cellButton.textContent = "\u00F7";
                cellButton.addEventListener("click",
                    function () {
                        pressOperator('/');
                    }); break;
            case 8: cellButton.textContent = "\u2715";
                cellButton.addEventListener("click",
                    function () {
                        pressOperator('*');
                    }); break;
            case 12: cellButton.textContent = "\u2212";
                cellButton.addEventListener("click",
                    function () {
                        pressOperator('-');
                    }); break;
            case 16: cellButton.textContent = "\uFF0B";
                cellButton.addEventListener("click",
                    function () {
                        pressOperator('+');
                    }); break;
            case 17: cellButton.textContent = "\u2022";
                cellButton.addEventListener("click",
                    function () {
                        pressDot();
                    });
                break;
            case 18: cellButton.textContent = "0";
                cellButton.addEventListener("click",
                    function () {
                        pressZero();
                    }); break;
        }
    }

    cellButton.classList.add("cell");
    grid.appendChild(cellButton);
}

let equalCell = document.createElement("button");
equalCell.textContent = "\u003D";
equalCell.addEventListener("click",
    function () {
        pressEqual();
    });
equalCell.classList.add("equal-cell");
grid.appendChild(equalCell);

function compute() {
    if (previousValue !== "")
        switch (operator) {
            case "+": currentValue = "" + (Number(currentValue) + Number(previousValue)); break;
            case "*": currentValue = "" + (Number(currentValue) * Number(previousValue)); break;
            case "/": if (Number(currentValue) === 0) { currentValue = ""; previousValue = ""; display.textContent = "Error"; return; } currentValue = "" + (Number(previousValue) / Number(currentValue)); break;
            case "-": currentValue = "" + (Number(previousValue) - Number(currentValue)); break;
        }
    currentValue = Math.round(currentValue * 10000) / 10000;
    display.textContent = Number(currentValue) + "";
    previousValue = currentValue;
    currentValue = "";
}

function pressNonZeroDigit(digit) {
    if (currentValue.length <= 18) {
        currentValue += digit;
        display.textContent = Number(currentValue) + "";
    }
}

function pressZero() {
    if (currentValue.length <= 18) {
        currentValue += "0";
        display.textContent = currentValue + "";
    }
}

function pressDot() {
    if (currentValue.indexOf('.') === -1) {
        currentValue += '.';
    }
    display.textContent = currentValue + "";
}

function pressEqual() {
    compute();
    currentValue = previousValue + "";
    previousValue = "";
}

function pressOperator(op) {
    compute();
    operator = op;
}

function pressPercentage() {
    compute();
    currentValue = "" + Math.round((Number(previousValue) / 100) * 10000) / 10000;
    display.textContent = Number(currentValue) + "";
    previousValue = "";
}

function clearEntry() {
    currentValue = currentValue.substring(0, currentValue.length - 1);
    display.textContent = currentValue + "";
    if (currentValue === "") {
        previousValue = "";
    }
}

/**
 * Adding keyboard support
 */
document.addEventListener('keydown', event => {
    let keyPressed = event.key;
    if (keyPressed >= '1' && keyPressed <= '9')
        pressNonZeroDigit(keyPressed);
    else {
        switch (keyPressed) {
            case '0': pressZero(); break;
            case '+': pressOperator('+'); break;
            case '-': pressOperator('-'); break;
            case '*': pressOperator('*'); break;
            case '/': pressOperator('/'); break;
            case '=': pressEqual(); break;
            case 'Enter': pressEqual(); break;
            case '.': pressDot(); break;
            case '%': pressPercentage(); break;
            case 'Backspace': clearEntry(); break;
        }
    }
});