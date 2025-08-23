const mongoose = require("mongoose");

const SongsSchema = new mongoose.Schema({
    title : String,
    artist : String,
    url : String
});

const SongModel = mongoose.model("Songs" , SongsSchema);

SongModel.create({title : "Masakali" , artist: "Roshan", url: "song..."})
.then(() => {
    console.log("🎵 Song inserted successfully!");
});

module.exports = SongModel;