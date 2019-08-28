// import csv from 'csv-parser';
// import fs from 'fs';
// import path from 'path';
import fakerApi from '../../helpers/faker.api.helper';

// const now = new Date();
// const results = [];

// const promise = new Promise((resolve, reject) => {
//   fs.createReadStream(path.resolve(__dirname, '../seed-data/csv/fixtures.csv'))
//     .pipe(
//       csv({
//         mapValues: ({ header, index, value }) => {
//           if (header !== 'finished' && header !== 'started' && header !== 'start') {
//             return parseFloat(value);
//           }
//           return value;
//         },
//       }),
//     )
//     .on('data', (data) => {
//       // eslint-disable-next-line no-param-reassign
//       data.createdAt = now;
//       // eslint-disable-next-line no-param-reassign
//       data.updatedAt = now;
//       results.push(data);
//     })
//     .on('end', () => {
//       resolve(results);
//     });
// });

// export default promise;

export default fakerApi
  .get('/games/after', {
    params: { timestamp: undefined },
  })
  .then((res) => res.data)
  .catch((err) => {
    // handle error
    // eslint-disable-next-line no-console
    console.log(err);
  });
