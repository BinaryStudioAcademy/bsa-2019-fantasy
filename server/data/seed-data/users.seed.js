import cryptoHelper from '../../helpers/crypto.helper';

const now = new Date();

export default [
  {
    email: 'demo@demo.com',
    name: 'demo',
    password: '123123',
    chip_used: 'wildcard',
  },
  {
    email: 'gbottoms1@arizona.edu',
    name: 'thartwright1',
    password: '123123',
    chip_used: 'wildcard',
  },
  {
    email: 'cclears2@state.gov',
    name: 'bkopps2',
    password: '123123',
    chip_used: 'wildcard',
  },
  {
    email: 'htie3@chronoengine.com',
    name: 'kmitchinson3',
    password: '123123',
    chip_used: 'wildcard',
  },
  {
    email: 'bbirmingham4@guardian.co.uk',
    name: 'fbrabon4',
    password: '123123',
    chip_used: 'wildcard',
  },
].map((user) => ({
  ...user,
  password: cryptoHelper.encryptSync(user.password),
  createdAt: now,
  updatedAt: now,
}));
