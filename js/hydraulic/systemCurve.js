// systemCurve.js
// Hydraulic system curve generator
// SI units only

import { CONSTANTS } from "../core/constants.js";

function calculateArea(diameter) {
    return CONSTANTS.PI * Math.pow(diameter, 2) / 4;
}

function calculateVelocity(flow, area) {
    return flow / area;
}

function calculateReynolds(density, velocity, diameter, viscosity) {
    return (density * velocity * diameter) / viscosity;
}

function frictionFactorLaminar(Re) {
    return 64 / Re;
}

function frictionFactorTurbulent(Re, roughness, diameter) {

    let f = 0.02;

    for (let i = 0; i < 50; i++) {

        const rhs = -2 * Math.log10(
            (roughness / diameter) / 3.7 +
            2.51 / (Re * Math.sqrt(f))
        );

        const f_new = 1 / Math.pow(rhs, 2);

        if (Math.abs(f_new - f) < 1e-6)
            return f_new;

        f = f_new;
    }

    return f;
}

function calculateHeadLoss(f, length, diameter, velocity, density) {

    const deltaP = f * (length / diameter) *
        (density * Math.pow(velocity, 2) / 2);

    return deltaP / (density * CONSTANTS.GRAVITY);
}


export function generateSystemCurve(input) {

    /*
    Required input (ALL SI):
    {
        density,
        viscosity,
        diameter,
        length,
        roughness,
        staticHead,
        flowMin,
        flowMax,
        points
    }
    */

    const {
        density,
        viscosity,
        diameter,
        length,
        roughness = 0,
        staticHead = 0,
        flowMin,
        flowMax,
        points = 20
    } = input;

    if (!density || !viscosity || !diameter || !length)
        throw new Error("Missing required system curve inputs.");

    const area = calculateArea(diameter);
    const curve = [];

    const step = (flowMax - flowMin) / (points - 1);

    for (let i = 0; i < points; i++) {

        const flow = flowMin + i * step;

        if (flow <= 0) continue;

        const velocity = calculateVelocity(flow, area);
        const Re = calculateReynolds(density, velocity, diameter, viscosity);

        let f;

        if (Re < 2300)
            f = frictionFactorLaminar(Re);
        else
            f = frictionFactorTurbulent(Re, roughness, diameter);

        const headLoss = calculateHeadLoss(
            f,
            length,
            diameter,
            velocity,
            density
        );

        const totalHead = staticHead + headLoss;

        curve.push({
            flow,
            velocity,
            Reynolds: Re,
            frictionFactor: f,
            headLoss,
            totalHead
        });
    }

    return curve;
}
