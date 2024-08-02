const express = require("express");
const router = express.Router();
const {
  AddSlots,
  getSlots,
  updateSlots,
  TrashSlots,
} = require("../Controller/slots");
router.post("/addslots", AddSlots);
router.get("/getslots", getSlots);
router.put("/update/:id", updateSlots);
router.post("/trash/:id", TrashSlots);
module.exports = router;
