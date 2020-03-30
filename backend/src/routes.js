const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfilerController = require('./controllers/ProfilerController')
const SessionController = require('./controllers/SessionController')


//const crypto = require('crypto');

//const connection = require('./database/connection.js');

const routes = express.Router();

// Lista de Ongs
// routes.get('/ongs', async (request,response)=> {
//     const ongs = await connection('ongs').select('*');
//     return response.json(ongs);
// })


// Criar Ong
 // Foi tudo isso para o controller
//routes.post('/ongs', async(request,response)=> {
    // Foi tudo isso para o controller
    // const { name, email, whatsup, city, uf } = request.body;      // Acessando os route params
    // const id = crypto.randomBytes(4).toString('HEX');
    // console.log(id);                // http://localhost:3333/users/1
    // await connection('ongs').insert({
    //     id,
    //     name,
    //     email,
    //     whatsup,
    //     city,
    //     uf
//     });
//     return response.json({ id });
// });

//*********************************************************
// Login
//*********************************************************
routes.post('/sessions',SessionController.create);
//*********************************************************
routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsup: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    }),
}),OngController.create);
routes.delete('/ongs/:id', OngController.delete);
//*********************************************************
routes.get('/incidents',celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    }),
}),IncidentController.index);

routes.post('/incidents',IncidentController.create);

routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),IncidentController.delete);
//*********************************************************
routes.get('/profiler',celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}),ProfilerController.index);

module.exports = routes;

/*
* Métodos HTTP
* GET: Buscar/listar informaçãodo backend
* POST: Criar uma informação  no backend
* PUT: Alterar uma informação no backend
* DELETE: Deletaruma informação no backend
*/

/*
* Typos de parâmetros:
* Query Params : Parâmetros enviados na rota apos [?], servem para filtros, paginação
* ex: http://loclahost:3333/users?[name=genildo]
* Route params : Parâmetros utilizados pra identificar recursos
* ex: app.get('/users/:id',(request,response)=> {
*     http://loclahost:3333/users/1
* Request Body: Corpo da requisição
*/

/*
* Bancos de Dados:
* SQL: MYSql, [SQLite], Db2, Postgres, Oracle, MSSQl
* NoSQL: MongoDB, MariaDB, CouchDB etc
*/

/*
* Formas de comunicação com o database:
* Driver:
* Query Builder: usando javascript: table('users').select('*').where('') // Usar KNEX
*  npx knex init // Executa o pacote, cria o arquivo de configuração de acesso ao bd
*/
