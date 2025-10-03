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

app.get('/getUser', (req, res) => {
    User.findAll()
        .then(users => res.json(users))
        .catch(err => res.status(500).send("Erro ao buscar usuário: " + err));
});

app.delete('/deleteUser', (req, res) => {
    const { id } = req.params;
    User.destroy({ where: { id } })
        .then(() => res.send("Usuário deletado com sucesso"))
        .catch(err => res.status(500).send("Erro ao deletar usuário: " + err));
});

app.put('/users/:id', (req, res) => {
    User.update(req.body,
        { where: { id: req.params.id } })
        .then(([updated]) => updated ? res.send("Usuário atualizado") : res.status(404).send("Usuário não encontrado"))
        .catch(err => res.status(500).send(err));
});

app.post('/create_movie', (req, res) => {
    const { name, category, age_rating, film_direction, synopsis, launch_year, active } = req.body;
    Movie.create({ name, category, age_rating, film_direction, synopsis, launch_year, active })
        .then(() => res.send("Filme cadastrado com sucesso"))
        .catch(error => res.status(400).send("Falha ao cadastrar: " + error));
});

app.get('/getMovie', (req, res) => {
    Movie.findAll()
        .then(movies => res.json(movies))
        .catch(err => res.status(500).send("Erro ao buscar filmes: " + err));
});

app.delete('/deleteMovie', (req, res) => {
    const { id } = req.params;
    Movie.destroy({ where: { id } })
        .then(() => res.send("Usuário deletado com sucesso"))
        .catch(err => res.status(500).send("Erro ao deletar usuário: " + err));
});


app.put('/movies/:id', (req, res) => {
    Movie.update(req.body, 
        { where: { id: req.params.id } })
        .then(([updated]) => updated ? res.send("Filme atualizado") : res.status(404).send("Filme não encontrado"))
        .catch(err => res.status(500).send(err));
});

app.listen(3000);