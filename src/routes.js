const routes = require('express').Router();
const SessionController = require('./app/controllers/SessionController');
const authMiddleware = require('./app/middleware/auth')


// Definição rotas

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);   // The middleware will work to routes above this declaration

routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
});

module.exports = routes;
