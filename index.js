export default async function(req, res) {
  try {
    const netlifyUrl = "https://kwafelt.netlify.app/test";

    const response = await fetch(netlifyUrl); // native fetch
    const html = await response.text();

    res.setHeader("Content-Type", "text/html; charset=UTF-8");
    res.setHeader("Cache-Control", "public, max-age=60");
    res.send(html);
  } catch (err) {
    res.status(500).send(`<h1>Proxy Error</h1><pre>${err.message}</pre>`);
  }
}
