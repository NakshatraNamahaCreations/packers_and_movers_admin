const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  {
    servicename: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    offerPrice: { type: Number, default: "" },
    locationType: { type: String, default: "" },
    desc: { type: String, default: "" },
    exludes: { type: Array, default: [] },
    includes: { type: Array, default: [] },
    realPrice: { type: Number, default: "" },
    Serviceimg: { type: String, default: "" },
    Slot: { type: Array, default: [] },
    Plan: { type: Array, default: [] },
  },
  { timestamps: true }
);

const SubCategoryModule = mongoose.model("service", SubCategorySchema);
module.exports = SubCategoryModule;
