// pipe.js
// Hydraulic pipe sizing computation engine
// SI units ONLY

import { CONSTANTS } from "../core/constants.js";


function calculateArea(diameter) {
    return CONSTANTS.PI * Math.pow(diameter, 2) / 4;
}


function calculateVelocity(volumetricFlow, diameter) {
    const area = calculateArea(diameter);
    return volumetricFlow / area;
}


function calculateReynolds(density, velocity, diameter, viscosity) {
    return (density * velocity * diameter) / viscosity;
}


function frictionFactorLaminar(Re) {
    return 64 / Re;
}


// Colebrook iterative solver
function frictionFactorTurbulent(Re, roughness, diameter) {

    let f = 0.02; // initial guess
    const epsilon = roughness;
    const D = diameter;

    for (let i = 0; i < 50; i++) {

        const lhs = 1 / Math.sqrt(f);

        const rhs = -2 * Math.log10(
            (epsilon / D) / 3.7 +
            2.51 / (Re * Math.sqrt(f))
        );

        const f_new = 1 / Math.pow(rhs, 2);

        if (Math.abs(f_new - f) < 1e-6) {
            return f_new;
        }

        f = f_new;
    }

    return f; // return last iteration if no full convergence
}


function calculatePressureDrop(f, length, diameter, density, velocity) {
    return f * (length / diameter) * (density * Math.pow(velocity, 2) / 2);
}


function calculateErosionalVelocity(density, C = 100) {
    // API form in SI (assuming C already converted if needed)
    return C / Math.sqrt(density);
}


export function pipeSizing(input) {

    /*
    Required input (ALL SI):
    {
        volumetricFlow: m3/s
        density: kg/m3
        viscosity: Pa.s
        diameter: m
        length: m
        roughness: m
        erosionalConstant: optional (default 100)
    }
    */

    const {
        volumetricFlow,
        density,
        viscosity,
        diameter,
        length,
        roughness,
        erosionalConstant = 100
    } = input;

    if (!volumetricFlow || !density || !viscosity || !diameter || !length)
        throw new Error("Missing required pipe sizing inputs.");

    const area = calculateArea(diameter);
    const velocity = calculateVelocity(volumetricFlow, diameter);
    const Re = calculateReynolds(density, velocity, diameter, viscosity);

    let regime;
    let frictionFactor;

    if (Re < 2300) {
        regime = "Laminar";
        frictionFactor = frictionFactorLaminar(Re);
    } else {
        regime = "Turbulent";
        frictionFactor = frictionFactorTurbulent(Re, roughness || 0, diameter);
    }

    const pressureDrop = calculatePressureDrop(
        frictionFactor,
        length,
        diameter,
        density,
        velocity
    );

    const erosionalVelocity = calculateErosionalVelocity(
        density,
        erosionalConstant
    );

    const erosionalWarning = velocity > erosionalVelocity;

    return {

        inputs: input,

        results: {
            area,
            velocity,
            Reynolds: Re,
            regime,
            frictionFactor,
            pressureDrop,
            erosionalVelocity,
            erosionalWarning
        }

    };
}
