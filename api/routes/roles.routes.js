const roles = require('../controllers/roles.controllers');

module.exports = app => {
    app.get('/api/v1/roles', roles.getAllRoles);
    app.post('/api/v1/roles', roles.insertRole);
    app.get('/api/v1/roles/:id', roles.getOneRole);
    app.put('/api/v1/roles/:id', roles.updateRole);
    app.delete('/api/v1/roles/:id', roles.deleteOneRole);
};