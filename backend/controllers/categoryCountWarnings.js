import fs from 'fs';
import readline from 'readline';

const filePath = '../vegini_logovi.txt';

export const getCounts = async (req, res) => {
  const ime = req.params.ime?.toUpperCase();

  if (!ime || !["ERROR", "INFO", "WARNING", "DEBUG"].includes(ime)) {
    return res.status(400).json({ error: "Greska!" });
  }

  let count = 0;

  try {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      if (line.includes(ime)) count++;
    }

    return res.status(200).json({ [ime]: count });
  } catch (error) {
    console.error(`Greška prilikom čitanja fajla: ${error.message}`);
    return res.status(500).json({ error: "Došlo je do greške pri čitanju fajla." });
  }
};
