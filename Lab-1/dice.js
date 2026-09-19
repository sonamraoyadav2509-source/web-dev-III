// dice.js

const crypto = require("crypto");

function rollDice() {
    return crypto.randomInt(1, 7);
}

const numberOfRolls = Number(process.argv[2]) || 1;

if (numberOfRolls < 1 || !Number.isInteger(numberOfRolls)) {
    console.log("Please enter a valid positive number.");
    console.log("Example: node dice.js 5");
    process.exit();
}

console.log(`Rolling dice ${numberOfRolls} time(s)...`);

for (let i = 1; i <= numberOfRolls; i++) {
    const diceValue = rollDice();
    console.log(`Dice Roll ${i}: ${diceValue}`);
}