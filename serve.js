const fs = require("fs");
const next = require("next");
const http = require("http");
const https = require("https");
const path = require("path");

require("dotenv").config()

const sslOptions = {
    cert: fs.readFileSync(path.join(process.env.SSL_ROOT ?? "./", "fullchain.pem")),
    key: fs.readFileSync(path.join(process.env.SSL_ROOT ?? "./", "privkey.pem")),
};

const app = next({ dev: false, hostname: "localhost", port: 443 });

const handle = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = http.createServer((req, res) => {
        const host = req.headers.host;
        const redirectTo = `https://${host}${req.url}`;
        res.writeHead(301, { Location: redirectTo });
        res.end();
    });

    const httpsServer = https.createServer(sslOptions, handle);

    httpServer.listen(80, () => {
        console.log("HTTP server listening on port 80");
    });

    httpsServer.listen(443, (err) => {
        if (err) throw err;
        console.log("HTTPS server listening on port 443");
    });
});
