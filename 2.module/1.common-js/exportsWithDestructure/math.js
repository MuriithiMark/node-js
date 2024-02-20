const add = (a, b) => a + b;
const sub = (a, b) => a - b;

// Direct export
exports.divide = (a, b) => a / b;
exports.multiply = (a, b) => a * b;


// Export in object
exports.mathFunctions = { add, sub }