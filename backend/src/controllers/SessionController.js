const connection = require('../database/connection.js');

module.exports = {
    async create (request,response) {
        const { id } = request.body;
        console.log(id);
        const ong = await connection('ongs')
        .where('id',id)
        .select('name')
        .first();
        console.log(ong);
        if (!ong) {
            response.status(400).json({error : "Ong não cadastrada!!"})
        }
        response.json(ong);
    }
}