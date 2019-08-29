import fakerApi from '../../helpers/faker.api.helper';

export default fakerApi
  .get('/playermatchstats/after', {
    params: { timestamp: undefined },
  })
  .then((res) => res.data)
  .catch((err) => {
    // handle error
    // eslint-disable-next-line no-console
    console.log(err);
  });
