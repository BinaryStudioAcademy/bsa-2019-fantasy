import bcryptjs from "bcryptjs";

const saltRounds = 10;

export default {
    encrypt: data => bcryptjs.hash(data, saltRounds),
    encryptSync: data => bcryptjs.hashSync(data, saltRounds),
    compare: (data, encrypted) => bcryptjs.compare(data, encrypted)
};
