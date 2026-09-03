// units.js
// Strict SI normalization engine
// All internal calculations must use SI

const pressureUnits = {
    "Pa": 1,
    "kPa": 1e3,
    "MPa": 1e6,
    "bar": 1e5
};

const lengthUnits = {
    "m": 1,
    "mm": 1e-3,
    "ft": 0.3048
};

const massFlowUnits = {
    "kg/s": 1,
    "kg/h": 1 / 3600
};

const volumetricFlowUnits = {
    "m3/s": 1,
    "m3/h": 1 / 3600
};

const densityUnits = {
    "kg/m3": 1
};

const viscosityUnits = {
    "Pa.s": 1,
    "cP": 1e-3
};

export function toSI(value, unit) {

    if (pressureUnits[unit] !== undefined)
        return value * pressureUnits[unit];

    if (lengthUnits[unit] !== undefined)
        return value * lengthUnits[unit];

    if (massFlowUnits[unit] !== undefined)
        return value * massFlowUnits[unit];

    if (volumetricFlowUnits[unit] !== undefined)
        return value * volumetricFlowUnits[unit];

    if (densityUnits[unit] !== undefined)
        return value * densityUnits[unit];

    if (viscosityUnits[unit] !== undefined)
        return value * viscosityUnits[unit];

    throw new Error(`Unsupported unit: ${unit}`);
}


export function fromSI(value, unit) {

    if (pressureUnits[unit] !== undefined)
        return value / pressureUnits[unit];

    if (lengthUnits[unit] !== undefined)
        return value / lengthUnits[unit];

    if (massFlowUnits[unit] !== undefined)
        return value / massFlowUnits[unit];

    if (volumetricFlowUnits[unit] !== undefined)
        return value / volumetricFlowUnits[unit];

    if (densityUnits[unit] !== undefined)
        return value / densityUnits[unit];

    if (viscosityUnits[unit] !== undefined)
        return value / viscosityUnits[unit];

    throw new Error(`Unsupported unit: ${unit}`);
}
