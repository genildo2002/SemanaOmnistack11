const connection = require('../database/connection.js');
const crypto = require('crypto');

// Criar todos os métodos em um controle para ser abstraído
module.exports  = {
    async index (request,response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },
    async create(request,response) {
        const { name, email, whatsup, city, uf } = request.body;      // Acessando os route params
        const id = crypto.randomBytes(4).toString('HEX');
        //console.log({name,email,whatsup,city,uf});                // http://localhost:3333/users/1
        //console.log(id);                // http://localhost:3333/users/1
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsup,
            city,
            uf
        });
        return response.json({ id });
    },
    async delete (request,response) {
        const { id } = request.params;
        console.log(id);
        const ong = await connection('ongs')
        .where('id',id)
        .select('id')
        .first();
        if (ong.id != id) {
            return response.status(401).json({error: 'Ong não cadastrada!'});
        }
        await connection('ongs').where('id',id).delete();
        return response.status(204).send(); //enviar resposta sem conteúdo

    }
};
