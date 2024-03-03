document.getElementById("calculate-rate-button").addEventListener("click", function() {
    var totalCost = parseFloat(document.getElementById("total-cost").value);
    var productNumber = parseInt(document.getElementById("product-number").value);

    var perProductCost = totalCost / productNumber;
    document.getElementById("per-product-cost").innerHTML = "Rate per Product: $" + perProductCost.toFixed(2);
});

document.getElementById("calculate-percentage-button").addEventListener("click", function() {
    var startingAmount = parseFloat(document.getElementById("starting-amount").value);
    var percentageChanges = document.getElementById("percentage-change").value.split(",").map(function(item) {
        return parseFloat(item.trim());
    });

    var finalAmount = startingAmount;
    var output = "";

    for (var i = 0; i < percentageChanges.length; i++) {
        var percentageChange = percentageChanges[i];
        finalAmount *= (1 + percentageChange / 100);

        output += "<div style='margin-bottom: 20px;'>";
        output += "Percentage Change: " + percentageChange + "%<br>";
        output += "Final amount after change " + (i + 1) + ": $" + finalAmount.toFixed(2) + "<br>";
        output += "</div>";
    }

    document.getElementById("output").innerHTML = output;
});
