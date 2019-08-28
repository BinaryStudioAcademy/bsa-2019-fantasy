import sequelize from '../data/db/connection';

// Custom bulk update function cause sequelize`s bulkCreate
// does not escapes field value with uuid

export default (tableName, data) => {
  const escapeRow = (items, char) =>
    `(${items.map((item) => `${char}${item}${char}`).join(',')})`;
  const keysString = escapeRow(Object.keys(data[0]), `"`);
  const valuesString = data.map((item) => escapeRow(Object.values(item), `'`)).join(',');
  const onConflictString = Object.keys(data[0])
    .map((key) => `"${key}"=EXCLUDED."${key}"`)
    .join(',');
  const queryString = `INSERT INTO "${tableName}" ${keysString} VALUES ${valuesString} ON CONFLICT ("id") DO UPDATE SET ${onConflictString}`;
  return sequelize.query(queryString, { type: sequelize.QueryTypes.INSERT });
};
