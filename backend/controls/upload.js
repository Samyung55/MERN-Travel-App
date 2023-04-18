const UploadRouter = require("express").Router();

const multer = require("multer")
const { verifyToken } = require("../middleware/verifyToken");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.filename);
    },
});

const upload = multer({
    storage: storage,
});

UploadRouter.post("/", verifyToken, upload.single("image"), async (req, res) => {
    try {
        return res.status(200).json("Upload successful!")
    }
    catch (error) {
        console.error(error);
    }
});

module.exports = UploadRouter;