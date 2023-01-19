const app = require("./app.jsx");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");

////////////////////////Setting up a config file////////////////////

const connectDB = require("./config/db");
require("dotenv").config();
const port = process.env.PORT || 5000;
const mode = process.env.NODE_ENV || "development";
dotenv.config({ path: "backend/config/config.env" });
connectDB();
app.use(cors());

app.listen(port, console.log(`Server started at port ${port} in ${mode} mode`));
