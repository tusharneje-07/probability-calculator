let chartInstance = null;
let chartInstance2 = null;

function calculateMean(data) {
    return data.reduce((sum, value) => sum + value, 0) / data.length;
}

function calculateStandardDeviation(data, mean) {
    let variance = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / data.length;
    return Math.sqrt(variance);
}

function normalDistribution(x, mean, stdDev) {
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
        Math.exp(-((x - mean) ** 2) / (2 * stdDev ** 2));
}

function displayChart1(dataArray, lowerBound, upperBound, condition) {
    if (chartInstance) {
        chartInstance.destroy();
    }

    let mean = calculateMean(dataArray);
    let stdDev = calculateStandardDeviation(dataArray, mean);

    let normalData = [];
    let highlightData = [];

    let minX = Math.min(...dataArray);
    let maxX = Math.max(...dataArray);

    for (let x = minX; x <= maxX; x += 0.5) {
        let yValue = normalDistribution(x, mean, stdDev);
        normalData.push({ x: x, y: yValue });

        let shouldHighlight = false;
        switch (condition) {
            case "P(𝑥>y)":
                shouldHighlight = x > lowerBound;
                break;
            case "P(𝑥<y)":
                shouldHighlight = x < lowerBound;
                break;
            case "P(𝑥>=y)":
                shouldHighlight = x >= lowerBound;
                break;
            case "P(𝑥<=y)":
                shouldHighlight = x <= lowerBound;
                break;
            case "P(x<𝑥<y)":
                shouldHighlight = x > lowerBound && x < upperBound;
                break;
            case "P(x<=𝑥<=y)":
                shouldHighlight = x >= lowerBound && x <= upperBound;
                break;
        }

        if (shouldHighlight) {
            highlightData.push({ x: x, y: yValue });
        }
    }

    const ctx1 = document.getElementById('chart1').getContext('2d');
    chartInstance = new Chart(ctx1, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: "Normal Distribution",
                    data: normalData,
                    borderColor: "rgba(255,120,72,255)",
                    backgroundColor: "rgba(255,120,72,0.5)",
                    fill: true,
                    pointRadius: 0,
                    borderWidth: 2
                },
                // {
                //     // label: "Highlighted Range",
                //     // data: highlightData,
                //     // borderColor: "red",
                //     // backgroundColor: "rgba(255, 99, 132, 0.5)",
                //     // fill: true,
                //     // pointRadius: 0,
                //     // borderWidth: 2
                // }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: { display: true, text: "X (Data Points)" }
                },
                y: {
                    title: { display: true, text: "Probability Density" },
                    beginAtZero: false
                }
            }
        }
    });
}

function displayChart2(dataArray, lowerBound, upperBound, condition) {
    if (chartInstance2) {
        chartInstance2.destroy();
    }

    let mean = calculateMean(dataArray);
    let stdDev = calculateStandardDeviation(dataArray, mean);

    let normalData = [];
    let highlightData = [];

    let minX = Math.min(...dataArray);
    let maxX = Math.max(...dataArray);

    for (let x = minX; x <= maxX; x += 0.5) {
        let yValue = normalDistribution(x, mean, stdDev);
        normalData.push({ x: x, y: yValue });

        let shouldHighlight = false;
        switch (condition) {
            case "P(𝑥>y)":
                shouldHighlight = x > lowerBound;
                break;
            case "P(𝑥<y)":
                shouldHighlight = x < lowerBound;
                break;
            case "P(𝑥>=y)":
                shouldHighlight = x >= lowerBound;
                break;
            case "P(𝑥<=y)":
                shouldHighlight = x <= lowerBound;
                break;
            case "P(x<𝑥<y)":
                shouldHighlight = x > lowerBound && x < upperBound;
                break;
            case "P(x<=𝑥<=y)":
                shouldHighlight = x >= lowerBound && x <= upperBound;
                break;
        }

        if (shouldHighlight) {
            highlightData.push({ x: x, y: yValue });
        }
    }

    const ctx2 = document.getElementById('chart2').getContext('2d');
    chartInstance2 = new Chart(ctx2, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: "Normal Distribution",
                    data: normalData,
                    borderColor: "rgba(255,120,72,255)",
                    backgroundColor: "rgba(255,120,72,0.5)",
                    fill: false,
                    pointRadius: 0,
                    borderWidth: 2
                },
                {
                    label: `Probability ${condition}`,
                    data: highlightData,
                    borderColor: "rgba(232, 53, 53,1)",
                    backgroundColor: "rgba(232, 53, 53,0.5)",
                    fill: true,
                    pointRadius: 0,
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: { display: true, text: "X (Data Points)" }
                },
                y: {
                    title: { display: true, text: "Probability Density" },
                    beginAtZero: false
                }
            }
        }
    });
}