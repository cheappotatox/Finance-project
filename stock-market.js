document.addEventListener("DOMContentLoaded", function() {
    const symbolInput = document.getElementById("symbol");
    const trackBtn = document.getElementById("track-btn");
    const stockData = document.getElementById("stock-data");
    const ctx = document.getElementById('stock-chart').getContext('2d');
    let chartInstance = null;

    trackBtn.addEventListener("click", function() {
        const symbol = symbolInput.value.toUpperCase();
        const apiKey = 'NAV7BHV62URNNTRV'; // Replace 'YOUR_API_KEY' with your Alpha Vantage API key
        const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const timeSeries = data['Time Series (Daily)'];
                const dates = Object.keys(timeSeries).reverse();
                const prices = dates.map(date => parseFloat(timeSeries[date]['4. close']).toFixed(2));

                stockData.innerHTML = `
                    <tr>
                        <td>${symbol}</td>
                        <td>${prices[0]}</td>
                        <td>${(prices[0] - prices[1]).toFixed(2)}</td>
                        <td>${(((prices[0] - prices[1]) / prices[1]) * 100).toFixed(2)}%</td>
                    </tr>
                `;

                if (chartInstance) {
                    chartInstance.data.labels = dates;
                    chartInstance.data.datasets[0].data = prices;
                    chartInstance.update();
                } else {
                    chartInstance = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: dates,
                            datasets: [{
                                label: 'Stock Price',
                                data: prices,
                                borderColor: 'rgb(75, 192, 192)',
                                tension: 0.1
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    display: false
                                }
                            }
                        }
                    });
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                alert("Error fetching data. Please check the stock symbol and try again. If stock symbol is correct, it looks like your 25 daily requests are up!");
            });
    });
});
