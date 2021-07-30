const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/auth");
const saccoCtrl = require("../controllers/saccoControllers");
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

// allsaccos route 
router.get("/",authenticateUser, saccoCtrl.allsaccos);
// get addsacco route 
router.get("/addsacco", authenticateUser, saccoCtrl.addsaccoRoute);
// add sacco 
router.post("/addsacco",authenticateUser, upload, saccoCtrl.addsacco);
// get details route 
router.get("/details/:id",authenticateUser, saccoCtrl.saccodetails);
// get edit route 
router.get("/details/:id/edit",authenticateUser, saccoCtrl.editroute);
// edit details 
router.patch("/details/:id",authenticateUser, upload, saccoCtrl.editdetails);
// delete sacco 
router.delete("/details/:id",authenticateUser, saccoCtrl.deletesacco);
// notfound route 
router.get("*", saccoCtrl.notfound);

module.exports = router;