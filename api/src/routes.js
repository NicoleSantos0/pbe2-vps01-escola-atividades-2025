const express = require('express');
const routes = express.Router();

const Aluno = require('./controllers/aluno');
const Atividade = require('./controllers/atividade');
const Telefone = require('./controllers/telefone');

routes.get('/', (req, res) => {
    return res.json({ titulo: 'Escola ACME' });
});

routes.post('/aluno', Aluno.create);
routes.get('/aluno', Aluno.read);
routes.get('/aluno/:ra', Aluno.readOne);
routes.patch('/aluno/:ra', Aluno.update);
routes.delete('/aluno/:ra', Aluno.remove);

routes.post('/atividade', Atividade.create);
routes.get('/atividade', Atividade.read);
routes.get('/atividade/:id', Atividade.readOne);
routes.patch('/atividade/:id', Atividade.update);
routes.delete('/atividade/:id', Atividade.remove);

routes.get('/telefone', Telefone.read);
routes.get('/telefone/:id', Telefone.readOne);
routes.post('/telefone', Telefone.create);
routes.put('/telefone/:id', Telefone.update);
routes.delete('/telefone/:id', Telefone.remove);

module.exports = routes;