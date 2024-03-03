document.addEventListener("DOMContentLoaded", function() {
    const incomeList = document.getElementById("income-list");
    const fixedList = document.getElementById("fixed-list");
    const variableList = document.getElementById("variable-list");
    const totalIncome = document.getElementById("total-income");
    const totalFixed = document.getElementById("total-fixed");
    const totalVariable = document.getElementById("total-variable");
    const totalIncomeDifference = document.getElementById("total-income-difference");
    const totalFixedDifference = document.getElementById("total-fixed-difference");
    const totalVariableDifference = document.getElementById("total-variable-difference");
    const totalIncomeActual = document.getElementById("total-income-actual");
    const totalFixedActual = document.getElementById("total-fixed-actual");
    const totalVariableActual = document.getElementById("total-variable-actual");

    let incomeTotal = 0;
    let fixedTotal = 0;
    let variableTotal = 0;

    // Load saved items from local storage
    loadItemsFromStorage("income", incomeList);
    loadItemsFromStorage("fixed", fixedList);
    loadItemsFromStorage("variable", variableList);

    // Calculate totals
    calculateTotal("income", incomeList, totalIncome, totalIncomeDifference, totalIncomeActual);
    calculateTotal("fixed", fixedList, totalFixed, totalFixedDifference, totalFixedActual);
    calculateTotal("variable", variableList, totalVariable, totalVariableDifference, totalVariableActual);

    document.getElementById("add-income-btn").addEventListener("click", function() {
        addItem("income", incomeList, totalIncome, totalIncomeDifference, totalIncomeActual);
    });

    document.getElementById("add-fixed-btn").addEventListener("click", function() {
        addItem("fixed", fixedList, totalFixed, totalFixedDifference, totalFixedActual);
    });

    document.getElementById("add-variable-btn").addEventListener("click", function() {
        addItem("variable", variableList, totalVariable, totalVariableDifference, totalVariableActual);
    });

    function addItem(type, list, totalElement, differenceElement, actualElement) {
        const item = document.getElementById(`${type}-item`).value;
        const budget = parseFloat(document.getElementById(`${type}-amount`).value);
        const actual = parseFloat(document.getElementById(`${type}-actual`).value);
    
        if (item.trim() === "" || isNaN(budget) || isNaN(actual) || budget < 0 || actual < 0) {
            alert("Please enter a valid item, planned budget, and actual amount.");
            return;
        }
    
        const difference = actual - budget;
    
        // Save item to local storage
        saveItemToStorage(type, { item, budget, actual });
    
        const listItem = document.createElement("li");
    
        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            list.removeChild(listItem);
            updateTotal(type, -actual, totalElement, differenceElement, actualElement);
            removeItemFromStorage(type, item);
        });
    
        listItem.innerHTML = `${item}: Budget: $${budget.toFixed(2)} | Actual: $${actual.toFixed(2)} | Difference: $${difference.toFixed(2)}`;
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    
        updateTotal(type, actual, totalElement, differenceElement, actualElement);
    
        document.getElementById(`${type}-item`).value = "";
        document.getElementById(`${type}-amount`).value = "";
        document.getElementById(`${type}-actual`).value = "";
    
        // Reload the page
        location.reload();
    }    

    function updateTotal(type, amount, totalElement, differenceElement, actualElement) {
        if (type === "income") {
            incomeTotal += amount;
            incomeTotal = Math.max(incomeTotal, 0); // Ensure total is not negative
            totalElement.textContent = `$${incomeTotal.toFixed(2)}`;
            differenceElement.textContent = `$${(incomeTotal - parseFloat(document.getElementById("income-amount").value)).toFixed(2)}`;
            actualElement.textContent = `$${incomeTotal.toFixed(2)}`;
        } else if (type === "fixed") {
            fixedTotal += amount;
            fixedTotal = Math.max(fixedTotal, 0); // Ensure total is not negative
            totalElement.textContent = `$${fixedTotal.toFixed(2)}`;
            differenceElement.textContent = `$${(fixedTotal - parseFloat(document.getElementById("fixed-amount").value)).toFixed(2)}`;
            actualElement.textContent = `$${fixedTotal.toFixed(2)}`;
        } else if (type === "variable") {
            variableTotal += amount;
            variableTotal = Math.max(variableTotal, 0); // Ensure total is not negative
            totalElement.textContent = `$${variableTotal.toFixed(2)}`;
            differenceElement.textContent = `$${(variableTotal - parseFloat(document.getElementById("variable-amount").value)).toFixed(2)}`;
            actualElement.textContent = `$${variableTotal.toFixed(2)}`;
        }
    }

    function saveItemToStorage(type, itemData) {
        let items = JSON.parse(localStorage.getItem(type)) || [];
        items.push(itemData);
        localStorage.setItem(type, JSON.stringify(items));
    }

    function loadItemsFromStorage(type, list) {
        let items = JSON.parse(localStorage.getItem(type)) || [];
        items.forEach(itemData => {
            const { item, budget, actual } = itemData;
            const listItem = document.createElement("li");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function() {
                list.removeChild(listItem);
                updateTotal(type, -actual, totalIncome, totalIncomeDifference, totalIncomeActual);
                removeItemFromStorage(type, item);
            });
            listItem.innerHTML = `${item}: Budget: $${budget.toFixed(2)} | Actual: $${actual.toFixed(2)} | Difference: $${(actual - budget).toFixed(2)}`;
            listItem.appendChild(deleteButton);
            list.appendChild(listItem);
        });
    }

    function removeItemFromStorage(type, item) {
        let items = JSON.parse(localStorage.getItem(type)) || [];
        items = items.filter(itemData => itemData.item !== item);
        localStorage.setItem(type, JSON.stringify(items));
        location.reload(); // Reload the page
    }    

    function calculateTotal(type, list, totalElement, differenceElement, actualElement) {
        let total = 0;
        let difference = 0;
        let actualTotal = 0;
    
        list.querySelectorAll("li").forEach(item => {
            const actual = parseFloat(item.textContent.match(/Actual: \$([0-9.]+)/)[1]);
            const budget = parseFloat(item.textContent.match(/Budget: \$([0-9.]+)/)[1]);
            total += budget; // Add to the total budget
            actualTotal += actual; // Add to the total actual
            difference += actual - budget; // Calculate the difference
        });
    
        total = Math.max(total, 0); // Ensure total budget is not negative
        actualTotal = Math.max(actualTotal, 0); // Ensure total actual is not negative
        difference = actualTotal - total; // Calculate total difference
    
        totalElement.textContent = `$${total.toFixed(2)}`;
        differenceElement.textContent = `$${difference.toFixed(2)}`;
        actualElement.textContent = `$${actualTotal.toFixed(2)}`;
    }    
});
