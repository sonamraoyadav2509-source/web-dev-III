// app.js

const isEven = require("./modules/isEven");
const logger = require("./modules/logger");

const number = Number(process.argv[2]);

if (isNaN(number)) {
    console.log("Please provide a valid number.");
    console.log("Example: node app.js 10");
    process.exit();
}

logger("Checking whether the number is even or odd...");

if (isEven(number)) {
    console.log(`${number} is Even`);
} else {
    console.log(`${number} is Odd`);
}

logger("Program completed successfully.");