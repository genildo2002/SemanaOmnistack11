const connection = require('../database/connection.js');

// request.headers = dados da autenticação do user, localização, 
module.exports = {
    async index (request, response) {
        const { page = 1} = request.query;
        const [count] = await connection('incidents').count();
        response.header('X-total-count',count['count(*)']);

        const incidents = await connection('incidents')
        .join('ongs','ongs.id', "=", 'incidents.ong_id')
        .limit(5)
        .offset((page-1) * 5)
        //.select('*');   /// todos os campos das tabelas (vai substituir o id do incidents pelo da ong)
        .select(['incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsup',
        'ongs.city',
        'ongs.uf'
        ]);
        return response.json(incidents);
    },
    async create (request, response) {
        const { title, description,value} = request.body;
        const ong_id = request.headers.authorization;
        console.log(ong_id);
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        return response.json({ id })
    },
    async delete (request,response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization; // busca dos headers
        const incident = await connection('incidents')
        .where('id',id)
        .select('ong_id')
        .first();
        if (incident.ong_id != ong_id) {
            return response.status(401).json({error: 'Operação não permitida!'});
        }
        await connection('incidents').where('id',id).delete();
        return response.status(204).send(); //enviar resposta sem conteúdo

    }
}