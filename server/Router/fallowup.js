const express = require("express");
const router = express.Router();

const {
  AddFallowup,
  getFallowup,
  updateFallowup,
  TrashFallowup,
} = require("../Controller/fallowup");
router.post("/addfallowup", AddFallowup);
router.get("/getfallowup", getFallowup);
router.put("/update/:id", updateFallowup);
router.post("/trash/:id", TrashFallowup);

module.exports = router;
