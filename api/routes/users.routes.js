const users = require('../controllers/users.controllers');
module.exports = app => {
    app.get('/api/v1/users', users.getAllUsers);
    app.post('/api/v1/users/distance', users.getDistance);
    app.get('/api/v1/users/:id', users.findOneUser);
    app.get('/api/v1/me', users.me);
    app.post('/api/v1/login', users.login);
    app.post('/api/v1/register', users.insertUser);
    app.put('/api/v1/users/:id', users.updateUser);
    app.delete('/api/v1/users/:id', users.deleteUser);
};