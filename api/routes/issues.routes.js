const issues = require('../controllers/issues.controllers');

module.exports = app => {
    app.get('/api/v1/issues', issues.getAllIssues);
    app.post('/api/v1/issues', issues.insertIssue);
    app.get('/api/v1/issues/:id', issues.getOneIssue);
    app.put('/api/v1/issues/:id', issues.updateIssue);
    app.delete('/api/v1/issues/:id', issues.deleteIssue);
};