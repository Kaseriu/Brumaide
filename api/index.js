const express = require('express');
const cors = require('cors');
const swagger = require('swagger-ui-express');
const swagger_json = require('./swagger/swagger.json');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/swagger", swagger.serve, swagger.setup(swagger_json));

const port = process.env.API_PORT || 8080;

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});