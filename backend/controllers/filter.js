import fs from 'fs';
import readline from 'readline';

const filePath = '../vegini_logovi.txt';

export const filterZadnji = async (req, res) => {
  const {
    type,
    searchText,
    from,
    to,
    sort = 'asc',
    limit = 1000, 
    offset = 0   
  } = req.query;

  const logs = [];
  let linesRead = 0;

  try {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      if (linesRead >= limit) break;
      linesRead++;

      const match = line.match(/^\[(.*?)\]\s+(DEBUG|INFO|WARNING|ERROR)\s+(.*)$/);
      if (!match) continue;

      const [, timestamp, level, message] = match;

      if (type && level !== type) continue;
      if (searchText && !message.toLowerCase().includes(searchText.toLowerCase())) continue;
      if (from && new Date(timestamp) < new Date(from)) continue;
      if (to && new Date(timestamp) > new Date(to)) continue;

      logs.push({ timestamp, level, message });
    }

    logs.sort((a, b) => {
      const t1 = new Date(a.timestamp);
      const t2 = new Date(b.timestamp);
      return sort === 'asc' ? t1 - t2 : t2 - t1;
    });


    const paginatedLogs = logs.slice(Number(offset), Number(offset) + 10);
    res.json(paginatedLogs);
  } catch (error) {
    console.error('Greška pri čitanju fajla:', error.message);
    res.status(500).send('Greška pri čitanju logova');
  }
};
