import fetch from "node-fetch"; // optional di Node 18+, native fetch boleh pakai

export default async function (req, res) {
  try {
    // URL Netlify
    const netlifyUrl = "https://kwafelt.netlify.app/test";

    // Fetch content dari Netlify
    const response = await fetch(netlifyUrl);
    const html = await response.text();

    // Set header content-type HTML
    res.setHeader("Content-Type", "text/html; charset=UTF-8");

    // Optional: cache
    res.setHeader("Cache-Control", "public, max-age=60");

    // Kirim HTML ke browser
    res.send(html);
  } catch (err) {
    res.status(500).send(`<h1>Proxy Error</h1><pre>${err.message}</pre>`);
  }
}
