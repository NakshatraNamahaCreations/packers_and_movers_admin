const OrderModule = require("../Module/Order");

class Order {
  async AddOrder(req, res) {
    let {
      OrderId,
      customer,
      email,
      phone,
      fromDate,
      toDate,
      pickupLocation,
      dropLocation,
      vendor,
      Excutive,
      Services,
      referenceCode,
      amount,
      bookingAmount,
      slot,
      locationType,
      category,
    } = req.body;

    try {
      let subdata = new OrderModule({
        customer,
        OrderId,
        email,
        phone,
        fromDate,
        toDate,
        pickupLocation,
        dropLocation,
        vendor,
        Excutive,
        Services,
        referenceCode,
        amount,
        bookingAmount,
        slot,
        locationType,
        category,
      });

      let OrderData = await subdata.save();

      if (OrderData) {
        return res.status(200).json({
          data: OrderData,
          message: "Order added successfully",
        });
      }
    } catch (error) {
      console.error("Error adding Order:", error);
      return res.status(500).json({ error: "Internal error" });
    }
  }

  async getOrder(req, res) {
    try {
      let data = await OrderModule.find({});
      if (data) {
        return res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateOrder(req, res) {
    let {
      OrderId,
      customer,
      email,
      phone,
      fromDate,
      toDate,
      pickupLocation,
      dropLocation,
      vendor,
      Excutive,
      Services,
      referenceCode,
      amount,
      bookingAmount,
      slot,
      locationType,
      category,
    } = req.body;
    try {
      let idd = req.params.id;

      const findlOrder = await OrderModule.findOne({
        _id: idd,
      });
      if (!findlOrder) {
        return res.json({ error: "No such record found" });
      }

      findlOrder.OrderId = OrderId || findlOrder.OrderId;
      findlOrder.customer = customer || findlOrder.customer;
      findlOrder.email = email || findlOrder.email;
      findlOrder.phone = phone || findlOrder.phone;
      findlOrder.fromDate = fromDate || findlOrder.fromDate;
      findlOrder.toDate = toDate | findlOrder.toDate;
      findlOrder.pickupLocation = pickupLocation | findlOrder.pickupLocation;
      findlOrder.dropLocation = dropLocation || findlOrder.dropLocation;
      findlOrder.locationType = locationType || findlOrder.locationType;
      findlOrder.Excutive = Excutive || findlOrder.Excutive;
      findlOrder.Services = Services || findlOrder.Services;
      findlOrder.vendor = vendor || findlOrder.vendor;
      findlOrder.referenceCode = referenceCode || findlOrder.referenceCode;
      findlOrder.bookingAmount = bookingAmount || findlOrder.bookingAmount;
      findlOrder.slot = slot || findlOrder.slot;
      findlOrder.amount = amount || findlOrder.amount;
      findlOrder.category = category || findlOrder.category;

      const updateOrder = await OrderModule.findOneAndUpdate(
        { _id: idd },
        findlOrder,
        { new: true }
      );
      console.log(updateOrder, "updateOrder================");
      return res.status(200).json({
        message: "Updated successfully",
        date: updateOrder,
      });
    } catch (error) {
      return res.status(500).json({ error: "Unable to update the category" });
    }
  }
  async updateVendor(req, res) {
    let { vendor } = req.body;
    try {
      let idd = req.params.id;

      const findlOrder = await OrderModule.findOne({
        _id: idd,
      });
      if (!findlOrder) {
        return res.json({ error: "No such record found" });
      }

      findlOrder.vendor = vendor || findlOrder.vendor;

      const updateOrder = await OrderModule.findOneAndUpdate(
        { _id: idd },
        findlOrder,
        { new: true }
      );
      console.log(updateOrder, "updateOrder================");
      return res.status(200).json({
        message: "Updated successfully",
        date: updateOrder,
      });
    } catch (error) {
      return res.status(500).json({ error: "Unable to update the category" });
    }
  }
  async TrashOrder(req, res) {
    let id = req.params.id;
    try {
      let finddata = await OrderModule.findOneAndDelete({ _id: id });
      if (finddata) {
        return res.status(200).json({
          data: finddata,
          message: "Order Deleted Succesfully",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const OrderController = new Order();
module.exports = OrderController;
