const express = require("express");
const multer = require('multer');
const router = express.Router();

const uploadFile = require("../service/Provider");

const upload = multer({storage:multer.memoryStorage()});

router.post("/songs", upload.single("audio"), async (req, res) => {
    console.log("Body:", req.body);
    const fileData = await uploadFile(req.file);  // uploads to ImageKit
    console.log("FileData:", fileData);

    res.json({
      message: "Data uploaded successfully",
    });
});


module.exports = router;