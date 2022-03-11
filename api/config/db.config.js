module.exports = {
    HOST: process.env.PG_CONTAINER,
    PORT: process.env.PG_PORT,
    USER: process.env.POSTGRES_PASSWORD,
    PASSWD: process.env.POSTGRES_USER,
    DB: process.env.POSTGRES_DB,
};