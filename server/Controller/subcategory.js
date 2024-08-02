const SubCategoryModule = require("../Module/subcategory");

class SubCategory {
  async AddSubCategory(req, res) {
    let { category, subcategory } = req.body;
    let subcatefile = req.file ? req.file.filename : null;

    try {
      let subdata = new SubCategoryModule({
        category,
        subcategory,
        subcateimg: subcatefile,
      });

      let subCatedata = await subdata.save();

      if (subCatedata) {
        return res.status(200).json({
          data: subCatedata,
          message: "Subcategory added successfully",
        });
      }
    } catch (error) {
      console.error("Error adding subcategory:", error);
      return res.status(500).json({ error: "Internal error" });
    }
  }

  async getSubCategory(req, res) {
    try {
      let data = await SubCategoryModule.find({});
      if (data) {
        return res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateSubCategory(req, res) {
    let { category, subcategory } = req.body;
    try {
      let idd = req.params.id;
      const file = req.file?.filename;
      const findlSubcategory = await SubCategoryModule.findOne({
        _id: idd,
      });
      if (!findlSubcategory) {
        return res.json({ error: "No such record found" });
      }
      findlSubcategory.category = category || findlSubcategory.category;
      findlSubcategory.subcategory =
        subcategory || findlSubcategory.subcategory;
      if (file) {
        findlSubcategory.subcateimg = file;
      }

      const updateCategory = await SubCategoryModule.findOneAndUpdate(
        { _id: idd },
        findlSubcategory,
        { new: true }
      );
      return res.status(200).json({
        message: "Updated successfully",
        date: updateCategory,
      });
    } catch (error) {
      return res.status(500).json({ error: "Unable to update the category" });
    }
  }

  async Trashsubcategory(req, res) {
    let id = req.params.id;
    try {
      let finddata = await SubCategoryModule.findOneAndDelete({ _id: id });
      if (finddata) {
        return res.status(200).json({
          data: finddata,
          message: "Subcategory Deleted Succesfully",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const SubCategoryController = new SubCategory();
module.exports = SubCategoryController;
