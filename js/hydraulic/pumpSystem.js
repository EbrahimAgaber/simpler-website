// pumpSystem.js
// Integrated pump-system simulation engine
// SI units only

import { generateSystemCurve } from "./systemCurve.js";
import {
    PumpCurve,
    fitPumpCurve,
    hydraulicPower,
    brakePower,
    calculateNPSHa,
    findOperatingPoint
} from "./pump.js";

import { CONSTANTS } from "../core/constants.js";


export function simulatePumpSystem(input) {

    /*
    Required structure (SI units only):

    {
        fluid: {
            density,
            viscosity
        },

        pipe: {
            diameter,
            length,
            roughness,
            staticHead
        },

        flowRange: {
            min,
            max,
            points
        },

        pump: {
            type: "single" | "series" | "parallel",
            numberOfPumps,
            curve: {
                Q1, H1,
                Q2, H2
            },
            efficiency,
            NPSHr
        },

        suction: {
            suctionPressure,
            vaporPressure,
            suctionHead,
            suctionFrictionLoss
        }
    }
    */

    const {
        fluid,
        pipe,
        flowRange,
        pump,
        suction
    } = input;

    /* ================================
       1️⃣ Generate System Curve
    ================================= */

    const systemCurve = generateSystemCurve({
        density: fluid.density,
        viscosity: fluid.viscosity,
        diameter: pipe.diameter,
        length: pipe.length,
        roughness: pipe.roughness,
        staticHead: pipe.staticHead,
        flowMin: flowRange.min,
        flowMax: flowRange.max,
        points: flowRange.points
    });


    /* ================================
       2️⃣ Fit Pump Curve
    ================================= */

    const basePumpCurve = fitPumpCurve(
        pump.curve.Q1,
        pump.curve.H1,
        pump.curve.Q2,
        pump.curve.H2
    );


    /* ================================
       3️⃣ Adjust for Configuration
    ================================= */

    const number = pump.numberOfPumps || 1;

    let effectivePumpCurve;

    if (pump.type === "series") {

        effectivePumpCurve = {
            head: (flow) =>
                number * basePumpCurve.head(flow)
        };

    } else if (pump.type === "parallel") {

        effectivePumpCurve = {
            head: (flow) =>
                basePumpCurve.head(flow / number)
        };

    } else {

        effectivePumpCurve = basePumpCurve;
    }


    /* ================================
       4️⃣ Find Operating Point
    ================================= */

    const operatingPoint = findOperatingPoint({
        pumpCurve: effectivePumpCurve,
        systemCurveData: systemCurve
    });

    if (!operatingPoint)
        throw new Error("No operating point found.");


    /* ================================
       5️⃣ Power Calculation
    ================================= */

    const hydraulicP = hydraulicPower(
        fluid.density,
        operatingPoint.flow,
        operatingPoint.head
    );

    const brakeP = brakePower(
        fluid.density,
        operatingPoint.flow,
        operatingPoint.head,
        pump.efficiency
    );


    /* ================================
       6️⃣ NPSH Evaluation
    ================================= */

    const NPSHa = calculateNPSHa({
        density: fluid.density,
        suctionPressure: suction.suctionPressure,
        vaporPressure: suction.vaporPressure,
        suctionHead: suction.suctionHead,
        frictionLoss: suction.suctionFrictionLoss
    });

    const NPSHr = pump.NPSHr;

    const NPSHmargin = NPSHa - NPSHr;

    const cavitationWarning = NPSHmargin <= 0;


    /* ================================
       7️⃣ Structured Report Object
    ================================= */

    return {

        operatingPoint: {
            flow: operatingPoint.flow,
            head: operatingPoint.head,
            hydraulicPower: hydraulicP,
            brakePower: brakeP
        },

        NPSH: {
            available: NPSHa,
            required: NPSHr,
            margin: NPSHmargin,
            cavitationWarning
        },

        configuration: {
            type: pump.type,
            pumps: number
        },

        pumpCurveParameters: {
            a: basePumpCurve.a,
            b: basePumpCurve.b
        },

        systemCurve
    };
}
