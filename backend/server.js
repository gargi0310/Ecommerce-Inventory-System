const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require("./config/database");

//Handle Uncaugth Exception
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);

    process.exit(1);
});

//Config
dotenv.config({path:"backend/config/config.env"});

//Database connectting
connectDatabase();

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
});

//Unhandled Promise Rejection
process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server du to Unhandled Promise Rejection");

    server.close(()=>{
        process.exit(1);
    })
})