const express = require('express');
const cors = require('cors');
const swagger = require('swagger-ui-express');
const swagger_json = require('./swagger/swagger.json');
const db = require('./models/sequelize.models');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/swagger", swagger.serve, swagger.setup(swagger_json));

const port = process.env.API_PORT || 8080;

db.sequelize.sync({ force: true });



require('./routes/users.routes')(app);
require('./routes/roles.routes')(app);
require('./routes/issues.routes')(app);
require('./routes/messages.routes')(app);
require('./routes/status.routes')(app);

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});