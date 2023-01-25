const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB = () => {
    console.log(process.env.DB_CONNECT);
    mongoose
        .connect(process.env.DB_CONNECT || "mongodb://127.0.0.1:27017/E-commerce")
        //  {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,

        //     //   useCreateIndex: true,
        // })
        .then((con) => {
            console.log(
                `MongoDB database connected with HOST: ${con.connection.host}`.cyan.underline.bold
            );
        })
        .catch((err) => console.log(`Error occurs with: ${err}`))
};
module.exports = connectDB;