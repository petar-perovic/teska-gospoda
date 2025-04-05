import fs from 'fs';
import readline from 'readline';

export const treciZad = async (req, res) => {
    const filePath = '../vegini_logovi.txt';
    const cleanLines = [];
  
    try {
      const fileStream = fs.createReadStream(filePath);
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });
  
      for await (const line of rl) {
        const parts = line.split(' ');
        if (parts[2]=='ERROR') {
          cleanLines.push(line);
        }
      }
      const data = cleanLines.join('\n');
      fs.writeFile('output.txt', data, (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('Data has been written to the file!');
          res.status(200).json({ uspjesno: 'Bravo' });
        }
      });
    } catch (err) {
      console.error('Failed to read file:', err);
      res.status(500).json({ error: 'Failed to read file' });
    }
};