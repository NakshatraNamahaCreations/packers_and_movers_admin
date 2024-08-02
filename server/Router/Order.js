const express = require("express");
const router = express.Router();

const {
  AddOrder,
  getOrder,
  updateOrder,
  TrashOrder,updateVendor
} = require("../Controller/Order");
router.post("/addorder", AddOrder);
router.get("/getorder", getOrder);
router.put("/update/:id", updateOrder);
router.put("/updatevendor/:id", updateVendor);

router.post("/trash/:id", TrashOrder);

module.exports = router;
