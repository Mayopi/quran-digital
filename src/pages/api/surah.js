import fs from "fs";
import path from "path";
export default async function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "src/data/quran.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.status(200).json({
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
