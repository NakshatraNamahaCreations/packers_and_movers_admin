const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  {
    category: { type: String, default: "" },
    subcategory: { type: String, default: "" },
    subcateimg: { type: String, default: "" },
  },
  { timestamps: true }
);

const SubCategoryModule = mongoose.model("subcate", SubCategorySchema);
module.exports = SubCategoryModule;
