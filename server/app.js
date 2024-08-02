const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
dotenv.config();

const app = express();
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.error("Database Connection Error:", err.message);
  });
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("Public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const category = require("./Router/category");
const subcategory = require("./Router/subcategory");
const service = require("./Router/Service");
const Slots = require("./Router/slots");
const ITems = require("./Router/Items");
const Order = require("./Router/Order");

const Enquiry = require("./Router/enquiry");
const FallowUp = require("./Router/fallowup");
app.use("/api/cate", category);
app.use("/api/subcate", subcategory);
app.use("/api/service", service);
app.use("/api/slot", Slots);
app.use("/api/item", ITems);
app.use("/api/order", Order);
app.use("/api/enquiry", Enquiry);
app.use("/api/fallowup", FallowUp);
const PORT = process.env.PORT || 8200;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
