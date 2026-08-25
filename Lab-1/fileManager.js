// fileManager.js

const fs = require("fs");

const fileName = "test.txt";

// CREATE FILE
console.log("Creating file...");

fs.writeFile(fileName, "Hello Node.js", (err) => {
    if (err) {
        console.log("Error creating file:", err.message);
        return;
    }

    console.log("File Created");

    // READ FILE
    console.log("Reading file...");

    fs.readFile(fileName, "utf8", (err, data) => {
        if (err) {
            console.log("Error reading file:", err.message);
            return;
        }

        console.log("File Content:", data);

        // UPDATE FILE
        console.log("Updating file...");

        fs.appendFile(fileName, "\nLearning FS Module", (err) => {
            if (err) {
                console.log("Error updating file:", err.message);
                return;
            }

            console.log("File Updated");

            // READ UPDATED FILE
            fs.readFile(fileName, "utf8", (err, updatedData) => {
                if (err) {
                    console.log("Error reading updated file:", err.message);
                    return;
                }

                console.log("Updated Content:", updatedData);

                // DELETE FILE
                console.log("Deleting file...");

                fs.unlink(fileName, (err) => {
                    if (err) {
                        console.log("Error deleting file:", err.message);
                        return;
                    }

                    console.log("File Deleted");
                });
            });
        });
    });
});