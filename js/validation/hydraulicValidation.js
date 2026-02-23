// hydraulicValidation.js
// Internal validation harness for hydraulic engine

import { simulatePumpSystem } from "../hydraulic/pumpSystem.js";


function assert(condition, message) {
    if (!condition) {
        throw new Error("VALIDATION FAILED: " + message);
    }
}


export function runHydraulicValidation() {

    console.log("Running Hydraulic Validation Suite...");

    const testCase = {

        fluid: {
            density: 850,
            viscosity: 0.003
        },

        pipe: {
            diameter: 0.15,
            length: 120,
            roughness: 0.000045,
            staticHead: 12
        },

        flowRange: {
            min: 0.005,
            max: 0.06,
            points: 40
        },

        pump: {
            type: "single",
            numberOfPumps: 1,
            curve: {
                Q1: 0.01,
                H1: 48,
                Q2: 0.05,
                H2: 30
            },
            efficiency: 0.72,
            NPSHr: 3.5
        },

        suction: {
            suctionPressure: 101325,
            vaporPressure: 20000,
            suctionHead: 2,
            suctionFrictionLoss: 0.5
        }
    };


    const result = simulatePumpSystem(testCase);


    /* ================================
       Core Assertions
    ================================= */

    assert(!isNaN(result.operatingPoint.flow), "Flow is NaN");
    assert(!isNaN(result.operatingPoint.head), "Head is NaN");

    assert(
        result.operatingPoint.flow >= testCase.flowRange.min &&
        result.operatingPoint.flow <= testCase.flowRange.max,
        "Operating flow outside expected range"
    );

    assert(
        result.operatingPoint.head > testCase.pipe.staticHead,
        "Head less than static head"
    );

    assert(
        result.NPSH.margin > 0,
        "Negative NPSH margin — cavitation risk"
    );

    assert(
        result.operatingPoint.hydraulicPower > 0,
        "Hydraulic power not positive"
    );

    assert(
        result.operatingPoint.brakePower > result.operatingPoint.hydraulicPower,
        "Brake power less than hydraulic power"
    );

    console.log("Hydraulic Validation PASSED.");
    console.log("Operating Flow (m3/s):", result.operatingPoint.flow);
    console.log("Operating Head (m):", result.operatingPoint.head);
    console.log("Brake Power (W):", result.operatingPoint.brakePower);
    console.log("NPSH Margin (m):", result.NPSH.margin);

    return result;
}
