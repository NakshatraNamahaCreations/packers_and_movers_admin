const express = require("express");
const router = express.Router();

const {
  AddEnquiry,
  getEnquiry,
  updateEnquiry,
  TrashEnquiry,
  updateResponse,
} = require("../Controller/enquiry");
router.post("/addenquiry", AddEnquiry);
router.get("/getenquiry", getEnquiry);
router.put("/update/:id", updateEnquiry);
router.post("/trash/:id", TrashEnquiry);
router.put("/updateres/:id", updateResponse);

module.exports = router;
