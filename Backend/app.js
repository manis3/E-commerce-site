const express = require('express');
const colors = require('colors');
const app = express();
// const swaggerUi = require("swagger-ui-express");
// const YAML = require('yamljs');
// const swaggerDocument = YAML.load("./swagger.yaml");
const errorMiddleware = require("./middleware/Error");
app.use(express.json());

///////////////////////Import all the routes/////
const products = require("./routes/product");
const user = require("./routes/user");



app.use("/api/v1", user);
app.use("/api/v1", products);
app.use(errorMiddleware);
// swaggerDocs(app, port)

module.exports = app;