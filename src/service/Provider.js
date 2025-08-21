var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : process.env.PUBLIC_KEY,
    privateKey : process.env.PRIVATE_KEY,
    urlEndpoint : process.env.URL_END_POINT
});

function uploadFile(file) {
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: file.buffer,           // file buffer
        fileName: file.originalname, // keep original name
      },
      (error, result) => {
        if (error) {
          reject("ImageKit upload failed"); // ✅ wrap error
        } else {
          resolve(result || "uploaded succefully");
        }
      }
    );
  });
}

module.exports = uploadFile;