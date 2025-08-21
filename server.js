require("dotenv").config();
const app = require("./src/app");
const connectedToDb = require("./src/db/dbconnection");

connectedToDb();

app.listen(3000,()=>{
    console.log("Server Started Running on port http://localhost:3000/");
});