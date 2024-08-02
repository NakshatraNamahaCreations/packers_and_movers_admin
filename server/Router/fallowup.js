const express = require("express");
const router = express.Router();

const {
  AddFallowUp,
  getFallowUp,
  updateFallowUp,
  TrashFallowUp,
} = require("../Controller/fallowup");
router.post("/addfallowup", AddFallowUp);
router.get("/getfallowup", getFallowUp);
router.put("/update/:id", updateFallowUp);
router.post("/trash/:id", TrashFallowUp);

module.exports = router;
