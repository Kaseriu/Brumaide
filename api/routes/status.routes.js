const status = require('../controllers/status.controllers');

module.exports = app => {
    app.get('/api/v1/status', status.getAllStatus);
    app.post('/api/v1/status', status.insertStatus);
    app.get('/api/v1/status/:id', status.getOneStatus);
    app.put('/api/v1/status/:id', status.updateStatus);
    app.delete('/api/v1/status/:id', status.deleteStatus);
}