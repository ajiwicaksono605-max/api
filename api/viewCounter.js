import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data.json");

export default async function handler(req, res) {
  // Cek apakah file data.json ada, kalau tidak buat baru
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ views: 0 }, null, 2));
  }

  // Baca data
  const fileData = fs.readFileSync(filePath, "utf-8");
  let data = JSON.parse(fileData);

  if (req.method === "POST") {
    // Tambah 1 view baru
    data.views += 1;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return res.status(200).json({ message: "View count updated", views: data.views });
  }

  if (req.method === "GET") {
    // Kirim jumlah views
    return res.status(200).json({ views: data.views });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
