const express = require("express");
const multer = require('multer');
const router = express.Router();

const uploadFile = require("../service/Provider");
const SongModel = require("../models/song.model");

const upload = multer({storage:multer.memoryStorage()});

router.post("/songs", upload.single("audio"), async (req, res) => {
    console.log("Body:", req.body);
    const fileData = await uploadFile(req.file);  // uploads to ImageKit
    // console.log("FileData:", fileData);
     
    const song = await SongModel.create(
      {
       title : req.body.title,
       artist : req.body.artist,
       url :  fileData.url,
       mood : req.body.mood
      }
    )

    res.json({
      message: "Data uploaded successfully",
      song : song
    });
});

router.get("/songs",async(req,res)=>{
  const {mood} = req.query;

  const songInfo = await SongModel.find({
    mood : mood
  });  

  res.status(200).json(
    {
      message : "Got the data successfully",
      songInfo,
    }
  )
});

module.exports = router;