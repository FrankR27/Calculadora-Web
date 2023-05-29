const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
const historyList = document.querySelector("#historyList");

buttons.forEach((item) => {
    item.onclick = () => {
        if (item.id == "clear") {
            display.innerText = "";
        } else if (item.id == "backspace") {
            let string = display.innerText.toString();
            display.innerText = string.substr(0, string.length - 1);
        } else if (display.innerText != "" && item.id == "equal") {
            const operation = display.innerText;
            const result = eval(operation);
            display.innerText = result;

            // Guardar la operación y el resultado en el localStorage
            const historyItem = { operation, result };
            saveOperationToLocalStorage(historyItem);

            // Agregar la operación y el resultado al historial en la página
            addHistoryItem(operation, result);
        } else if (display.innerText == "" && item.id == "equal") {
            display.innerText = "Empty!";
            setTimeout(() => (display.innerText = ""), 2000);
        } else {
            display.innerText += item.id;
        }
    };
});

const themeToggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");
const toggleIcon = document.querySelector(".toggler-icon");
let isDark = true;
themeToggleBtn.onclick = () => {
    calculator.classList.toggle("dark");
    themeToggleBtn.classList.toggle("active");
    isDark = !isDark;
};

// Cargar el historial almacenado en el localStorage al cargar la página
window.onload = () => {
    const storedOperations = getOperationsFromLocalStorage();
    if (storedOperations) {
        storedOperations.forEach((historyItem) => {
            addHistoryItem(historyItem.operation, historyItem.result);
        });
    }
};

function saveOperationToLocalStorage(historyItem) {
    const storedOperations = getOperationsFromLocalStorage() || [];
    storedOperations.push(historyItem);
    localStorage.setItem("calculatorOperations", JSON.stringify(storedOperations));
}

function getOperationsFromLocalStorage() {
    const storedOperations = localStorage.getItem("calculatorOperations");
    return storedOperations ? JSON.parse(storedOperations) : null;
}

function addHistoryItem(operation, result) {
    const historyItem = document.createElement("li");
    historyItem.textContent = `${operation} = ${result}`;
    historyList.appendChild(historyItem);
}