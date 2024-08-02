const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../Public/ServiceImage"));
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + "_" + file.originalname;
    cb(null, uniqueFileName);
  },
});
const upload = multer({ storage: storage });

const {
  AddService,
  getService,
  updateService,
  TrashService,
  updateSlots,
} = require("../Controller/Service");
router.post("/addservice", upload.single("Serviceimg"), AddService);
router.get("/getservice", getService);
router.put("/update/:id", upload.single("Serviceimg"), updateService);
router.put("/updateslot/:id", updateSlots);

router.post("/trash/:id", TrashService);
module.exports = router;
