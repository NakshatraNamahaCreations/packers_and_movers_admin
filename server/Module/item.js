const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  { 
    category: { type: String, default: "" },
    subcategory: { type: String, default: "" },
    itemname: { type: String, default: "" },
    offerPrice: { type: Number, default: "" },
    realPrice: { type: Number, default: "" },
    // serviceImg: { type: String, default: "" },
  },
  { timestamps: true }
);

const SubCategoryModule = mongoose.model("item", SubCategorySchema);
module.exports = SubCategoryModule;
