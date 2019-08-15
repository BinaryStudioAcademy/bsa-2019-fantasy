import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

const now = new Date();
const results = [];

const positionMapping = {
  1: 'GKP',
  2: 'DEF',
  3: 'MID',
  4: 'FWD',
};

const promise = new Promise((resolve, reject) => {
  fs.createReadStream(path.resolve(__dirname, '../seed-data/csv/player_stats.csv'))
    .pipe(
      csv({
        mapValues: ({ header, value }) => {
          switch (header) {
            case 'first_name':
            case 'second_name':
              return value;
            case 'position':
              return positionMapping[value];
            default:
              return parseInt(value, 10);
          }
        },
      }),
    )
    .on('data', (data) => {
      results.push({ ...data, createdAt: now, updatedAt: now });
    })
    .on('end', () => {
      resolve(results);
    });
});

export default promise;
