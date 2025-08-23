const express = require("express")
const songroute = require("./routes/song.route");
const app = express();

app.use(express.json());
app.use("/song" , songroute);

module.exports = app;