const CategoryModule = require("../Module/category");

class Category {
  async AddCategory(req, res) {
    let { category } = req.body;
    try {
      let data = new CategoryModule({
        category,
      });
      let savedata = await data.save();
      if (savedata) {
        return res
          .status(200)
          .json({ data: savedata, message: "Category added succesfully" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal error" });
    }
  }

  async getCategory(req, res) {
    try {
      let data = await CategoryModule.find({});
      if (data) {
        return res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateCategory(req, res) {
    const categoryid = req.params.id;
    let { category } = req.body;
    try {
      const findlcategory = await CategoryModule.findOne({
        _id: categoryid,
      });

      if (!findlcategory) {
        return res.status(404).json({ error: "No such record found" });
      }

      findlcategory.category = category || findlcategory.category;
      const updatecategory = await CategoryModule.findOneAndUpdate(
        { _id: categoryid },
        findlcategory,
        { new: true }
      );
      return res.status(200).json({
        message: "Updated successfully",
        data: updatecategory,
      });
    } catch (err) {
      return res.status(500).json({ error: "server error" });
    }
  }

  async Trashcategory(req, res) {
    let id = req.params.id;
    try {
      let findCategory = await CategoryModule.findOneAndDelete({ _id: id });
      if (findCategory) {
        return res
          .status(200)
          .json({ data: findCategory, message: "Category Deleted Succesfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const CategoryController = new Category();
module.exports = CategoryController;
