const mongoose = require("mongoose");

const SlotsSchema = new mongoose.Schema(
  { 
    startTime: { type: String, default: "" },
    endTime: { type: String, default: "" },
    startUnit: { type: String, default: "" },
    endUnit: { type: String, default: "" },

  },

  { Timestamp: true }
);

const SlotsModule = mongoose.model("slots", SlotsSchema);
module.exports = SlotsModule;
