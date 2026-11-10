// server.js

const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(`Request received: ${req.method} ${req.url}`);

    res.setHeader("Content-Type", "text/plain");

    if (req.url === "/" && req.method === "GET") {
        res.statusCode = 200;
        res.end("Welcome to Node Server");
    } 
    
    else if (req.url === "/about" && req.method === "GET") {
        res.statusCode = 200;
        res.end("About Page");
    } 
    
    else if (req.url === "/contact" && req.method === "GET") {
        res.statusCode = 200;
        res.end("Contact Page");
    } 
    
    else {
        res.statusCode = 404;
        res.end("404 Error: Page Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}/`);
});