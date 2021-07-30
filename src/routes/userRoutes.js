const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/usercontrollers")
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/uploads/images")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    }
}).single("image");

router.get("/register", userCtrl.register);

router.post("/signup", upload, userCtrl.signup);

router.post("/login", userCtrl.login);

router.post("/logout", userCtrl.logout);

module.exports = router;