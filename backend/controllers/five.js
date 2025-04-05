import fs from 'fs';
import readline from 'readline';

export const zadatak2 = async (req, res) => {
    const filePath = '../vegini_logovi.txt'; 
    const cleanLines = [];
  
    try {
      
      const scores = {
        'ERROR': 200,
        'WARNING': 10
      };
      
      function calculatePriority(line) {
        let score = 0;
        const match = line.match(/\] (\w+)/);
        if (match) {
          const msg = match[1].toUpperCase();
          score += scores[msg] || 0;
        }
        return score;
      }
      
      function extractLogLevel(line) {
        const match = line.match(/\] (\w+)/);
        return match ? match[1].toUpperCase() : 'UNKNOWN';
      }
      
      function extractFileName(line) {
        const fileMatch = line.match(/([A-Za-z0-9_.-]+\.cs):/);
        return fileMatch ? fileMatch[1] : 'Unknown';
      }
      
      const topN = 5;
      const fileScores = {};
      
      const rl = readline.createInterface({
        input: fs.createReadStream('../vegini_logovi.txt', { encoding: 'utf8' }),
        crlfDelay: Infinity
      });
      
      rl.on('line', (line) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return;
      
        const score = calculatePriority(trimmedLine);
        const fileName = extractFileName(trimmedLine);
        const level = extractLogLevel(trimmedLine);
      
        if (!fileScores[fileName]) {
          fileScores[fileName] = {
            totalScore: 0,
            count: 0,
            levels: {
              ERROR: 0,
              WARNING: 0,
              INFO: 0,
              DEBUG: 0
            }
          };
        }
      
        fileScores[fileName].totalScore += score;
        fileScores[fileName].count += 1;
      
        if (fileScores[fileName].levels[level] !== undefined) {
          fileScores[fileName].levels[level]++;
        }
      });
      
      rl.on('close', () => {
        const fileScoresArray = Object.keys(fileScores).map(fileName => ({
          fileName,
          totalScore: fileScores[fileName].totalScore,
          count: fileScores[fileName].count,
          levels: fileScores[fileName].levels
        }));
      
        fileScoresArray.sort((a, b) => b.totalScore - a.totalScore);
      
        let final_list = []
        fileScoresArray.slice(0, topN).forEach((entry, index) => {
          let d = {
            "file_name":entry.fileName,
            "score":entry.totalScore,
            "no_line":entry.count,
            "error":entry.levels.ERROR,
            "warning":entry.levels.WARNING,
            "info":entry.levels.INFO,
            "debug":entry.levels.DEBUG
          }
          final_list.push(d)
        })
      
        return res.status(200).json({ final_list})
      
      })
    }
      
  
  
  
    catch (err) {
      console.error('Failed to read file:', err);
      res.status(500).json({ error: 'Failed to read file' });
    }
  };