const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    category: { type: String, default: "" },
  },
  { Timestamp: true }
);

const CategoryModule = mongoose.model("category", CategorySchema);
module.exports = CategoryModule;
