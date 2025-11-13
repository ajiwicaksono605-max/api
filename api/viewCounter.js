import fs from "fs";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const filePath = "./views.json";

  let views = 0;
  try {
    const data = fs.readFileSync(filePath, "utf8");
    views = JSON.parse(data).views;
  } catch (error) {
    views = 0;
  }

  // Jika method POST, tambahkan view
  if (req.method === "POST") {
    views += 1;
    fs.writeFileSync(filePath, JSON.stringify({ views }));
  }

  res.status(200).json({ views });
}
