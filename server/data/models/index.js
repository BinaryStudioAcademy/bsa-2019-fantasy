import orm from '../db/connection';
import associate from '../db/associations';

const Test = orm.import('./test');
const User = orm.import('./user');

associate({
    Test,
    User
});

export {
    Test as TestModel,
    User as UserModel
};
