const express = require("express");
const router = express.Router();
const {
  AddCategory,
  getCategory,
  updateCategory,
  Trashcategory,
} = require("../Controller/Category");
router.post("/addcategory", AddCategory);
router.get("/getcategory", getCategory);
router.put("/update/:id", updateCategory);
router.post("/trashcate/:id", Trashcategory);
module.exports = router;
