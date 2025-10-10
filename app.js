const express = require('express');
const { sequelize } = require('./database/db');
const db = require('./database/db'); 
const User = require('./model/user');
const Movie = require('./model/movie');
const { user, movie } = require('./model/userMovie');


const app = express();
app.use(express.json());



app.post('/create_user', async (req, res) => {
    try {
        const { username, email, password, active } = req.body;
        await User.create({ username, email, password, active });
        res.status(201).send("Usuário cadastrado com sucesso");
    } catch (error) {
        res.status(400).send("Erro ao cadastrar usuário: " + error.message);
    }
});

app.get('/getUser/:id', async (req, res) => {
    try {
        const users = await User.findAll({ where: { id_user: req.params.id } });
        res.json(users);
    } catch (error) {
        res.status(500).send("Erro ao buscar usuários: " + err.message);
    }
});

app.delete('/deleteUser/:id', async (req, res) => {
    try {
        const result = await User.destroy({ where: { id_user: req.params.id } });
        if (result) return res.send("Usuário deletado com sucesso");
        res.status(404).send("Usuário não encontrado");
    } catch (error) {
        res.status(500).send("Erro ao deletar usuário: " + err.message);
    }
});

app.put('/updateUser/:id', async (req, res) => {
    try {
        const [updated] = await User.update(req.body, { where: { id_user: req.params.id } });
        updated ? res.send("Usuário atualizado") : res.status(404).send("Usuário não encontrado");
    } catch (error) {
        res.status(500).send("Erro: " + err.message);
    }
});


app.post('/create_movie', async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).send("Filme cadastrado com sucesso");
    } catch (error) {
        res.status(400).send("Erro ao cadastrar filme: " + error.message);
    }
});

app.get('/getMovie/:id', async (req, res) => {
    try {
        const movies = await Movie.findAll({ include: User },{ where: { id_user: req.params.id } });
        res.json(movies);
    } catch (error) {
        res.status(500).send("Erro ao buscar filmes: " + error.message);
    }
});

app.delete('/deleteMovie/:id', async (req, res) => {
    try {
        const result = await Movie.destroy({ where: { id_movie: req.params.id } });
        if (result) return res.send("Filme deletado com sucesso");
        res.status(404).send("Filme não encontrado");
    } catch (error) {
        res.status(500).send("Erro ao deletar filme: " + err.message);
    }
});

app.put('/updateMovie/:id', async (req, res) => {
    try {
        const [updated] = await Movie.update(req.body, { where: { id_movie: req.params.id } });
        updated ? res.send("Filme atualizado") : res.status(404).send("Filme não encontrado");
    } catch (error) {
        res.status(500).send("Erro ao atualizar filme: " + err.message);
    }
});


(async () => {
    try {
      await db.sequelize.sync({ alter: true }); 
      console.log("Tabelas sincronizadas com sucesso.");
      
      app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000");
      });
    } catch (error) {
      console.error("Erro ao sincronizar tabelas:", err);
    }
  })();
  
