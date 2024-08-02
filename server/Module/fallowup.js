const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema(
  {
    enquiryId: { type: String, default: "" },
    enquiryDate: { type: String, default: "" },
    excutive: { type: String, default: "" },
    desc: { type: String, default: "" },
    amount: { type: String, default: "" },
    nextfallow: { type: String, default: "" },
    response: { type: String, default: "" },
  },
  { timestamps: true }
);

const EnquiryModule = mongoose.model("efallowup", EnquirySchema);
module.exports = EnquiryModule;
