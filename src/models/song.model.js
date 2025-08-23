const mongoose = require("mongoose");

const SongsSchema = new mongoose.Schema({
    title : String,
    artist : String,
    url : String,
    mood : String
});

const SongModel = mongoose.model("Songs" , SongsSchema);

module.exports = SongModel;