const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema(
  {
    enquiryId: { type: String, default: "" },
    enquiryDate: { type: String, default: "" },
    excutive: { type: String, default: "" },
    customer: { type: String, default: "" },
    email: { type: String, default: "" },
    contact1: { type: String, default: "" },
    contact2: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    category: { type: String, default: "" },
    reference: { type: String, default: "" },
    service: { type: String, default: "" },
    Response: { type: String, default: "" },
  },
  { timestamps: true }
);

const EnquiryModule = mongoose.model("enquiry", EnquirySchema);
module.exports = EnquiryModule;
