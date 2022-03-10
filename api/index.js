const express = require('express');
const cors = require('cors');
const app = express();
const swagger = require('swagger-ui-express');
const swagger_json = require('./swagger/swagger.json');


app.use(express.json());
app.use(cors());

app.use("/swagger", swagger.serve, swagger.setup(swagger_json));

const port = process.env.API_PORT || 8080;

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});