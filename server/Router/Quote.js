const express = require("express");
const router = express.Router();

const {
  AddQuote,
  getQuote,
  updateQuote,
  TrashQuote,
} = require("../Controller/quote");
router.post("/addquote", AddQuote);
router.get("/getquote", getQuote);
router.put("/update/:id", updateQuote);
router.post("/trash/:id", TrashQuote);

module.exports = router;
