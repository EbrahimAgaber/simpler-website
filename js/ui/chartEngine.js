let chartInstance = null;

export function renderPumpChart(canvasId, curves, operatingPoint) {

    const ctx = document.getElementById(canvasId).getContext("2d");

    const pumpData = curves.pumpCurve.map(p => ({
        x: p.flow,
        y: p.head
    }));

    const systemData = curves.systemCurve.map(p => ({
        x: p.flow,
        y: p.head
    }));

    const operatingData = [{
        x: operatingPoint.flow,
        y: operatingPoint.head
    }];

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: "scatter",
        data: {
            datasets: [
                {
                    label: "Pump Curve",
                    data: pumpData,
                    showLine: true,
                    borderWidth: 2
                },
                {
                    label: "System Curve",
                    data: systemData,
                    showLine: true,
                    borderWidth: 2
                },
                {
                    label: "Operating Point",
                    data: operatingData,
                    pointRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            animation: false,
            scales: {
                x: {
                    type: "linear",
                    title: {
                        display: true,
                        text: "Flow (m³/s)"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Head (m)"
                    }
                }
            }
        }
    });
}
