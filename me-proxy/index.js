import fetch from "node-fetch";

export default async function handler(req, res) {
    try {
        const tailscaleHost = "https://felissa.tail94a966.ts.net";

        if (!req.url.startsWith("/me")) {
            res.status(404).send("Not Found");
            return;
        }

        const forwardUrl = tailscaleHost + req.url;

        const response = await fetch(forwardUrl, {
            method: req.method,
            headers: req.headers,
            body: req.method === "GET" ? null : req.body
        });

        // Relay semua header kecuali content-length
        response.headers.forEach((value, name) => {
            if (name.toLowerCase() === 'content-length') return;
            res.setHeader(name, value);
        });

        // Relay body
        const buffer = await response.arrayBuffer();
        res.status(response.status).send(Buffer.from(buffer));
    } catch (err) {
        res.status(500).send("Proxy Error: " + err.message);
    }
}
