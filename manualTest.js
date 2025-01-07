import { calculatePoints } from './calculatePoints.js'

// Extended Test Cases
const testCases = [
    { input: 120, expected: 90 },
    { input: 75, expected: 25 },
    { input: 50, expected: 0 },
    { input: 200, expected: 250 },
];

// Running Tests
testCases.forEach(({ input, expected }, index) => {
    const result = calculatePoints(input);
    if (result === expected) {
        console.log(`Test Case ${index + 1}: Passed`);
    } else {
        console.log(`Test Case ${index + 1}: Failed (Expected: ${expected}, Got: ${result})`);
    }
});
