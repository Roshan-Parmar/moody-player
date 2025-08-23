const express = require("express")
const songroute = require("./routes/song.route");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use("/song" , songroute);

module.exports = app;