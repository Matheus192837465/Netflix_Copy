const express = require('express');
const User = require('./model/user');
const Movie = require('./model/movie');

const app = express();
app.use(express.json());

app.post('/create_user', (req, res) => {
    const { username, email, password, active } = req.body;
    User.create({ username, email, password, active })
        .then(() => res.status(200).send("Usuário cadastrado com sucesso"))
        .catch(error => res.status(403).send("Falha ao cadastrar: " + error));
});

app.get('/User', (req, res) => {
    User.findAll()
        .then(users => res.json(users))
        .catch(err => res.status(500).send("Erro ao buscar usuário: " + err));
});

app.post('/create_movie', (req, res) => {
    const { name, category, idade, direcao, sinopse, Data_lanc, active } = req.body;
    Movie.create({ name, category, idade, direcao, sinopse, Data_lanc, active })
        .then(() => res.send("Filme cadastrado com sucesso"))
        .catch(error => res.status(400).send("Falha ao cadastrar: " + error));
});

app.get('/movies', (req, res) => {
    Movie.findAll()
        .then(movies => res.json(movies))
        .catch(err => res.status(500).send("Erro ao buscar filmes: " + err));
});

app.listen(3000);