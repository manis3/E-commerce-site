
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB = () => {
    mongoose
        .connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

            //   useCreateIndex: true,
        })
        .then((con) => {
            console.log(
                `MongoDB database connected with HOST: ${con.connection.host}`.cyan.underline.bold
            );
        })
        .catch((err) => console.log(`Error occurs with: ${err}`))
};
module.exports = connectDB;