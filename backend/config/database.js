const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((data) => {
        console.log(`MongoDB Connected with the server: ${data.connection.host}`);
    }).catch((err) => {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exit process with failure
    });
}

module.exports = connectDatabase;
