const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()) // Necessário apra as requisições body

app.use(routes); //Necesário para usar as rotas

app.listen(3333);
