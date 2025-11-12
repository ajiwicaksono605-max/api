import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data.json');

  // Buat file kalau belum ada
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ views: 0 }));
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (req.method === 'GET') {
    return res.status(200).json({ views: data.views });
  }

  if (req.method === 'POST') {
    data.views += 1;
    fs.writeFileSync(filePath, JSON.stringify(data));
    return res.status(200).json({ views: data.views });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
