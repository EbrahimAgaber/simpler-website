import { simulatePumpSystem } from "../hydraulic/pumpSystem.js";
import { renderPumpChart } from "./chartEngine.js";
document.getElementById("runSimulation")
    .addEventListener("click", runSimulation);

function runSimulation() {

    try {

        const input = {
            fluid: {
                density: parseFloat(density.value),
                viscosity: parseFloat(viscosity.value)
            },
            pipe: {
                diameter: parseFloat(diameter.value),
                length: parseFloat(length.value),
                roughness: parseFloat(roughness.value),
                staticHead: parseFloat(staticHead.value)
            },
            flowRange: {
                min: parseFloat(flowMin.value),
                max: parseFloat(flowMax.value),
                points: parseInt(points.value)
            },
            pump: {
                type: pumpType.value,
                numberOfPumps: parseInt(numberOfPumps.value),
                curve: {
                    Q1: parseFloat(Q1.value),
                    H1: parseFloat(H1.value),
                    Q2: parseFloat(Q2.value),
                    H2: parseFloat(H2.value)
                },
                efficiency: parseFloat(efficiency.value),
                NPSHr: parseFloat(NPSHr.value)
            },
            suction: {
                suctionPressure: parseFloat(suctionPressure.value),
                vaporPressure: parseFloat(vaporPressure.value),
                suctionHead: parseFloat(suctionHead.value),
                suctionFrictionLoss: parseFloat(suctionFrictionLoss.value)
            }
        };

        const result = simulatePumpSystem(input);

        displayResults(result);

    } catch (err) {
        alert("Simulation error: " + err.message);
    }
}

function displayResults(result) {

    const r = result.operatingPoint;
    const n = result.NPSH;

    results.innerHTML = `
        <p><strong>Operating Flow:</strong> ${r.flow.toFixed(5)} m³/s</p>
        <p><strong>Operating Head:</strong> ${r.head.toFixed(2)} m</p>
        <p><strong>Hydraulic Power:</strong> ${r.hydraulicPower.toFixed(2)} W</p>
        <p><strong>Brake Power:</strong> ${r.brakePower.toFixed(2)} W</p>

        <hr>

        <p><strong>NPSHa:</strong> ${n.available.toFixed(2)} m</p>
        <p><strong>NPSHr:</strong> ${n.required.toFixed(2)} m</p>
        <p><strong>NPSH Margin:</strong> ${n.margin.toFixed(2)} m</p>
        <p><strong>Cavitation Warning:</strong> ${n.cavitationWarning ? "YES" : "NO"}</p>
    `;
}
