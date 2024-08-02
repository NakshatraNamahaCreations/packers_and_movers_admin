const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema(
  { 
    category: { type: String, default: "" },
    lastFDate: { type: String, default: "" },
    NextFDate: { type: String, default: "" },
    quoteDate: { type: String, default: "" },
    quoteId: { type: String, default: "" },
    customer: { type: String, default: "" },
    email: { type: String, default: "" },
    contact1: { type: String, default: "" },
    contact2: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    service: { type: String, default: "" },
    amount: { type: String, default: "" },
    Executive: { type: String, default: "" },
    desc: { type: String, default: "" },
  },
  { timestamps: true }
);

const EnquiryModule = mongoose.model("enquiry", EnquirySchema);
module.exports = EnquiryModule;
