const colors = require('colors')
const swaggerJsDocs = require
    ("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

/////////////////////////////////////////Swagger Implementation //////////////////////////////////////////
const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Ecommerce Intern Project",
            version: "1.0.0",
            description: "Ecommerce Intern Project",
        },
        servers: [
            {
                url: "http://localhost:5000/",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDocs(options);


function swaggerDocs(app, port) {
    /////Two endpoints
    // 1.//Swagger


    ///////Docs in json format
    app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get('docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`Docs available at http://localhost:${port}/docs`.cyan.underline.bold)


}
module.exports = { swaggerDocs };

////////////////////////////////////////////////////////////////////////////////