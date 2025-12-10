const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const { sequelize } = require('./database/db');
const db = require('./database/db'); 
const User = require('./model/user');
const Movie = require('./model/movie');
require('./model/userMovie');

const app = express();

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

app.get('/profiles', (req, res) => {
    res.render('profiles');
});

app.get('/home', async (req, res) => {
    try {
        const movies = await Movie.findAll({ raw: true }); 
        res.render('home', { movies: movies });
    } catch (error) {
        res.send("Erro ao carregar filmes: " + error.message);
    }
});

app.get('/series', async (req, res) => {
    try {
        const movies = await Movie.findAll({ where: { category: 'Série' }, raw: true });
        res.render('series', { movies: movies }); 
    } catch (error) {
        res.send("Erro: " + error.message);
    }
});

app.get('/filmes', async (req, res) => {
    try {
        const movies = await Movie.findAll({ where: { category: 'Filme' }, raw: true });
        res.render('filmes', { movies: movies }); 
    } catch (error) {
        res.send("Erro: " + error.message);
    }
});

app.post('/create_user', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        await User.create({ username, email, password });
        res.redirect('/');
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).send("Erro: Email já cadastrado ou dados inválidos.");
        }
        res.send("Erro ao cadastrar: " + error.message);
    }
});

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email, password: req.body.password } });
        if(user){
            res.redirect('/profiles');
        } else {
            res.send("Email ou senha incorretos");
        }
    } catch (error) {
        res.send("Erro: " + error.message);
    }
});

app.get('/getUser/:id', async (req, res) => {
    try {
        const users = await User.findAll({ where: { id_user: req.params.id } });
        res.json(users);
    } catch (error) {
        res.status(500).send("Erro ao buscar usuários: " + error.message);
    }
});

app.delete('/deleteUser/:id', async (req, res) => {
    try {
        const result = await User.destroy({ where: { id_user: req.params.id } });
        if (result) return res.send("Usuário deletado com sucesso");
        res.status(404).send("Usuário não encontrado");
    } catch (error) {
        res.status(500).send("Erro ao deletar usuário: " + error.message);
    }
});

app.put('/updateUser/:id', async (req, res) => {
    try {
        const [updated] = await User.update(req.body, { where: { id_user: req.params.id } });
        updated ? res.send("Usuário atualizado") : res.status(404).send("Usuário não encontrado");
    } catch (error) {
        res.status(500).send("Erro: " + error.message);
    }
});

app.post('/create_movie', async (req, res) => {
    try {
        await Movie.create(req.body);
        res.redirect('/home');
    } catch (error) {
        res.status(400).send("Erro ao cadastrar filme: " + error.message);
    }
});

app.get('/getMovie/:id', async (req, res) => {
    try {
        const movies = await Movie.findOne({ 
            where: { id_movie: req.params.id } 
        });
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
        res.status(500).send("Erro ao deletar filme: " + error.message);
    }
});

app.put('/updateMovie/:id', async (req, res) => {
    try {
        const [updated] = await Movie.update(req.body, { where: { id_movie: req.params.id } });
        updated ? res.send("Filme atualizado") : res.status(404).send("Filme não encontrado");
    } catch (error) {
        res.status(500).send("Erro ao atualizar filme: " + error.message);
    }
});

(async () => {
    try {
      await db.sequelize.sync({ alter: true }); 
      console.log("Tabelas sincronizadas.");
      app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000");
      });
    } catch (error) {
      console.error("Erro ao sincronizar tabelas:", error);
    }
})();