import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

const now = new Date();
const results = [];

const promise = new Promise((resolve, reject) => {
  fs.createReadStream(path.resolve(__dirname, '../seed-data/csv/fixtures.csv'))
    .pipe(
      csv({
        mapValues: ({ header, index, value }) => {
          if (header !== 'finished' && header !== 'started' && header !== 'start') {
            return parseFloat(value);
          }
          return value;
        },
      }),
    )
    .on('data', (data) => {
      // eslint-disable-next-line no-param-reassign
      data.createdAt = now;
      // eslint-disable-next-line no-param-reassign
      data.updatedAt = now;
      results.push(data);
    })
    .on('end', () => {
      resolve(results);
    });
});

export default promise;
