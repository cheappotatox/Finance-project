document.getElementById("calculate-simple-button").addEventListener("click", function() {
    var principal = parseFloat(document.getElementById("simple-principal").value);
    var rate = parseFloat(document.getElementById("simple-rate").value);
    var time = parseFloat(document.getElementById("simple-time").value);

    var simpleInterest = (principal * rate * time) / 100;
    var totalSimple = principal + simpleInterest;

    document.getElementById("simple-interest").innerHTML = "Simple Interest: " + simpleInterest.toFixed(2);
    document.getElementById("total-simple").innerHTML = "Total Amount (Simple Interest): " + totalSimple.toFixed(2);
});

document.getElementById("calculate-compound-button").addEventListener("click", function() {
    var principal = parseFloat(document.getElementById("compound-principal").value);
    var rate = parseFloat(document.getElementById("compound-rate").value);
    var time = parseFloat(document.getElementById("compound-time").value);
    var interestApplied = parseInt(document.getElementById("interest-applied").value);

    var compoundInterest = principal * (Math.pow(1 + rate / (interestApplied / 12), (interestApplied / 12) * time)) - principal;
    var totalCompound = principal + compoundInterest;

    document.getElementById("compound-interest").innerHTML = "Compound Interest: " + compoundInterest.toFixed(2);
    document.getElementById("total-compound").innerHTML = "Total Amount (Compound Interest): " + totalCompound.toFixed(2);
});
