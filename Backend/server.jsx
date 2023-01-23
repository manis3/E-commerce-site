const app = require("./app.jsx");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");

////////////////////////Setting up a config file////////////////////

const connectDB = require("./config/db");
require("dotenv").config();

///////////////////////Handle uncaught exceptions////////////////////
////////////////it must be at the top level ////////////////

process.on("uncaughtException", err => {
  console.log(`Error:${err.message}`);
  console.log(`shutting  down the server due to uncaught exception:`);
  process.exit(1);
})


const port = process.env.PORT || 5000;
const mode = process.env.NODE_ENV || "development";
dotenv.config({ path: "backend/config/config.env" });
connectDB();
app.use(cors());

const server = app.listen(
  port,
  console.log(`Server started at port ${port} in ${mode} mode`)
);

////////////////handled unhandled promise rejections//////////

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejections`);
  server.close(() => {
    process.exit(1);
  });
});
