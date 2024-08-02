const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../Public/SubcateImage"));
  },
  filename: (req, file, cb) => {
    const uniqueFileName = Date.now() + "_" + file.originalname;
    cb(null, uniqueFileName);
  },
});
const upload = multer({ storage: storage });

const {
  AddSubCategory,
  getSubCategory,
  updateSubCategory,Trashsubcategory
} = require("../Controller/subcategory");
router.post("/addsubcate", upload.single("subcateimg"), AddSubCategory);
router.get("/getsubcate", getSubCategory);
router.put("/update/:id", upload.single("subcateimg"), updateSubCategory);
router.post("/trash/:id", Trashsubcategory);
module.exports = router;
