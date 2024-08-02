const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    OrderId: { type: Number},
    customer: { type: String, default: "" },
    email: { type: String, default: "" },
    amount: { type: String, default: "" },
    phone: { type: Number, default: "" },
    fromDate: { type: String, default: "" },
    toDate: { type: String, default: "" },
    pickupLocation: { type: String, default: "" },
    dropLocation: { type: String, default: "" },
    category: { type: String, default: "" },
    locationType: { type: String, default: "" },
    vendor: { type: Array, default: [] },
    Excutive: { type: String, default: "" },
    Services: { type: Object, default: {} },
    referenceCode: { type: String, default: "" },
    bookingAmount: { type: Number, default: "" },
    slot: { type: Object, default: {} },
  },
  { timestamps: true }
);

const OrderModule = mongoose.model("order", OrderSchema);
module.exports = OrderModule;
