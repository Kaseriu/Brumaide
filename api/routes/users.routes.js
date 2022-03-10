const users = require('../controllers/users.controllers');
module.exports = app => {
    app.get('/api/v1/users', users.getAllUsers);
    app.get('/api/v1/users/:userId/:radius', users.getAllUsersByRadius);
    app.post('/api/v1/users', users.insertUser);
    app.get('/api/v1/users/:id', users.findOneUser);
    app.put('/api/v1/users/:id', users.updateUser);
    app.delete('/api/v1/users/:id', users.deleteUser);
};