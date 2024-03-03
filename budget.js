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

    let incomeTotal = 0;
    let fixedTotal = 0;
    let variableTotal = 0;

    document.getElementById("add-income-btn").addEventListener("click", function() {
        addItem("income", incomeList);
    });

    document.getElementById("add-fixed-btn").addEventListener("click", function() {
        addItem("fixed", fixedList);
    });

    document.getElementById("add-variable-btn").addEventListener("click", function() {
        addItem("variable", variableList);
    });

    function addItem(type, list) {
        const item = document.getElementById(`${type}-item`).value;
        const budget = parseFloat(document.getElementById(`${type}-amount`).value);
        const actual = parseFloat(document.getElementById(`${type}-actual`).value);

        if (item.trim() === "" || isNaN(budget) || isNaN(actual) || budget < 0 || actual < 0) {
            alert("Please enter a valid item, planned budget, and actual amount.");
            return;
        }

        const difference = actual - budget;

        const listItem = document.createElement("li");
        listItem.innerHTML = `${item}: Budget: $${budget.toFixed(2)} | Actual: $${actual.toFixed(2)} | Difference: $${difference.toFixed(2)}`;
        list.appendChild(listItem);

        if (type === "income") {
            incomeTotal += actual;
            totalIncome.textContent = `$${incomeTotal.toFixed(2)}`;
            totalIncomeDifference.textContent = `$${(incomeTotal - budget).toFixed(2)}`;
        } else if (type === "fixed") {
            fixedTotal += actual;
            totalFixed.textContent = `$${fixedTotal.toFixed(2)}`;
            totalFixedDifference.textContent = `$${(fixedTotal - budget).toFixed(2)}`;
        } else if (type === "variable") {
            variableTotal += actual;
            totalVariable.textContent = `$${variableTotal.toFixed(2)}`;
            totalVariableDifference.textContent = `$${(variableTotal - budget).toFixed(2)}`;
        }

        document.getElementById(`${type}-item`).value = "";
        document.getElementById(`${type}-amount`).value = "";
        document.getElementById(`${type}-actual`).value = "";
    }
});

