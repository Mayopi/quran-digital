import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    const { name, number } = req.query;

    if (!name || number)
      return res.status(400).json({
        message: "Failed",
        status: 400,
        error: "name or number, either query is required.",
      });

    const filePath = path.join(process.cwd(), "src/data/list.json");
    let data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const currentSurah = data.find((item) => item.name == name);

    const currentIndex = data.indexOf(currentSurah);
    const previousSurah = data[currentIndex - 1] || null;
    const nextSurah = data[currentIndex + 1] || null;

    const response = {
      previous: previousSurah,
      current: currentSurah,
      next: nextSurah,
    };

    res.status(200).json({
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed",
      code: 500,
      error: error.message,
    });
  }
}
