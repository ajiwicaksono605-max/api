import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data.json');

  // Jika file belum ada, buat dengan nilai awal
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ views: 0 }));
  }

  // Baca data file
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Jika request GET → kirim jumlah views
  if (req.method === 'GET') {
    return res.status(200).json({ views: data.views });
  }

  // Jika request POST → tambah 1 dan simpan
  if (req.method === 'POST') {
    data.views += 1;
    fs.writeFileSync(filePath, JSON.stringify(data));
    return res.status(200).json({ views: data.views });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
