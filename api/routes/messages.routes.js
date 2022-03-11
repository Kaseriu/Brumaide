const messages = require('../controllers/messages.controllers');


module.exports = app => {
    app.get('/api/v1/messages', messages.findAll);
    app.get('/api/v1/messages/:senderId/:receiverId', messages.findConversationByReceiverAndSender);
    app.post('/api/v1/messages', messages.insertOneMessage);
    app.put('/api/v1/messages/:id', messages.updateMessage);
    app.put('/api/v1/messages/:senderId/:receiverId', messages.deleteAllMessagesByReceiverAndSender);
    app.delete('/api/v1/messages/:senderId/:receiverId', messages.deleteAllMessagesByReceiverAndSender);
};