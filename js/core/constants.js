// constants.js
// Engineering constants — SI units only
// Immutable design

export const CONSTANTS = Object.freeze({

    // Mathematics
    PI: Math.PI,

    // Gravity
    GRAVITY: 9.80665, // m/s²

    // Atmospheric pressure
    ATM_PRESSURE: 101325, // Pa

    // Universal gas constant
    R_UNIVERSAL: 8.314462618, // J/mol·K

    // API erosional velocity constant (default hydrocarbon service)
    API_EROSIONAL_CONSTANT: 100, // typical default (ft/s basis converted later if needed)

    // Default design margins
    DEFAULT_DESIGN_MARGIN: 0.10, // 10%
    DEFAULT_FOULING_MARGIN: 0.15 // 15%

});
