export default class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async getFilteredPlayers(filter) {
        let { name, position, club } = filter;

        if(!name & !position & !club) {
            return this.model.findAll();
        }

        const where = {};
        if (name) {
            let [first_name, second_name] = name.split('_');
            first_name = first_name.split('-').join(' ');
            second_name = second_name.split('-').join(' ');
            Object.assign(where, { first_name, second_name });
        }
        if (position) {
            Object.assign(where, { position });
        }
        if (club) {
            Object.assign(where, { club_id: club });
        }

        return this.model.findAll({ where, raw: true });
    }

    getById(id) {
        return this.model.findByPk(id);
    }

    create(data) {
        return this.model.create(data);
    }

    async updateById(id, data) {
        const result = await this.model.update(data, {
            where: { id },
            returning: true,
            plain: true
        });

        return result[0];
    }

    deleteById(id) {
        console.log(id);
        return this.model.destroy({
            where: { id }
        });
    }
}
