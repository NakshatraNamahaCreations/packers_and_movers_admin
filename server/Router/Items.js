const express = require("express");
const router = express.Router();

const {
  AddItems,
  getItems,
  updateItems,
  TrashItems,
} = require("../Controller/item");
router.post("/additem", AddItems);
router.get("/getitem", getItems);
router.put("/update/:id", updateItems);
router.post("/trash/:id", TrashItems);
module.exports = router;
