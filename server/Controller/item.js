const ItemModal = require("../Module/item");

class Items {
  async AddItems(req, res) {
    let { category, subcategory, itemname, offerPrice, realPrice } =
      req.body;
    // let subcatefile = req.file ? req.file.filename : null;

    try {
      let subdata = new ItemModal({
        category,
        subcategory,
        itemname,
        offerPrice,
        realPrice,
        // serviceImg: subcatefile,
      });

      let subCatedata = await subdata.save();

      if (subCatedata) {
        return res.status(200).json({
          data: subCatedata,
          message: "Items added successfully",
        });
      }
    } catch (error) {
      console.error("Error adding Items:", error);
      return res.status(500).json({ error: "Internal error" });
    }
  }

  async getItems(req, res) {
    try {
      let data = await ItemModal.find({});
      if (data) {
        return res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateItems(req, res) {
    let { category, subcategory, itemname, offerPrice, realPrice } =
      req.body;
    try {
      let idd = req.params.id;
      // const file = req.file?.filename;
      const findlItems = await ItemModal.findOne({
        _id: idd,
      });
      if (!findlItems) {
        return res.json({ error: "No such record found" });
      }

      findlItems.itemname = itemname || findlItems.itemname;
      findlItems.offerPrice = offerPrice || findlItems.offerPrice;
      findlItems.realPrice = realPrice || findlItems.realPrice;
      findlItems.category = category || findlItems.category;
      findlItems.subcategory = subcategory || findlItems.subcategory;

      // if (file) {
      //   findlItems.serviceImg = file;
      // }

      const updateItems = await ItemModal.findOneAndUpdate(
        { _id: idd },
        findlItems,
        { new: true }
      );
      return res.status(200).json({
        message: "Updated successfully",
        date: updateItems,
      });
    } catch (error) {
      return res.status(500).json({ error: "Unable to update the category" });
    }
  }

  async TrashItems(req, res) {
    let id = req.params.id;
    try {
      let finddata = await ItemModal.findOneAndDelete({ _id: id });
      if (finddata) {
        return res.status(200).json({
          data: finddata,
          message: "Service Deleted Succesfully",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const ItemsController = new Items();
module.exports = ItemsController;
