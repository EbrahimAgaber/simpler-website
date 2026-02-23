// pump.js
// Centrifugal pump computation engine
// SI units only

import { CONSTANTS } from "../core/constants.js";


/* ================================
   Pump Curve Representation
================================ */

export class PumpCurve {

    constructor(a, b) {
        this.a = a; // Shutoff head
        this.b = b; // Flow coefficient
    }

    head(flow) {
        return this.a - this.b * Math.pow(flow, 2);
    }

}


/* ================================
   3-Point Curve Fitting
   Fit H = a - bQ²
================================ */

export function fitPumpCurve(Q1, H1, Q2, H2) {

    // Solve:
    // H1 = a - bQ1²
    // H2 = a - bQ2²

    const b = (H1 - H2) / (Math.pow(Q2, 2) - Math.pow(Q1, 2));
    const a = H1 + b * Math.pow(Q1, 2);

    return new PumpCurve(a, b);
}


/* ================================
   Hydraulic Power
================================ */

export function hydraulicPower(density, flow, head) {
    return density * CONSTANTS.GRAVITY * flow * head;
}


/* ================================
   Brake Power
================================ */

export function brakePower(density, flow, head, efficiency) {
    return hydraulicPower(density, flow, head) / efficiency;
}


/* ================================
   NPSH Available
================================ */

export function calculateNPSHa({
    density,
    suctionPressure,
    vaporPressure,
    suctionHead = 0,
    frictionLoss = 0
}) {

    return (
        suctionPressure / (density * CONSTANTS.GRAVITY)
        +
        suctionHead
        -
        vaporPressure / (density * CONSTANTS.GRAVITY)
        -
        frictionLoss
    );
}


/* ================================
   Operating Point Solver
   Solve H_pump(Q) = H_system(Q)
================================ */

export function findOperatingPoint({
    pumpCurve,
    systemCurveData
}) {

    /*
    systemCurveData = [
        { flow, totalHead }
    ]
    */

    let bestMatch = null;
    let minError = Infinity;

    for (const point of systemCurveData) {

        const pumpHead = pumpCurve.head(point.flow);
        const systemHead = point.totalHead;

        const error = Math.abs(pumpHead - systemHead);

        if (error < minError) {
            minError = error;
            bestMatch = {
                flow: point.flow,
                head: pumpHead,
                systemHead: systemHead,
                error
            };
        }
    }

    return bestMatch;
}


/* ================================
   Parallel Pumps
   Flow adds, head same
================================ */

export function parallelPumpHead(pumpCurve, totalFlow, numberOfPumps) {

    const individualFlow = totalFlow / numberOfPumps;
    return pumpCurve.head(individualFlow);
}


/* ================================
   Series Pumps
   Head adds, flow same
================================ */

export function seriesPumpHead(pumpCurve, flow, numberOfPumps) {

    return numberOfPumps * pumpCurve.head(flow);
}
