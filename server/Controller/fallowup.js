const FallowUpModule = require("../Module/fallowup");

class FallowUp {
  async AddFallowUp(req, res) {
    let {
      enquiryId,
      enquiryDate,
      excutive,
      desc,
      amount,
      nextfallow,
      response,
    } = req.body;

    try {
      let subdata = new FallowUpModule({
        enquiryId,
        enquiryDate,
        excutive,
        desc,
        amount,
        nextfallow,
        response,
      });

      let FallowUpData = await subdata.save();

      if (FallowUpData) {
        return res.status(200).json({
          data: FallowUpData,
          message: "FallowUp added successfully",
        });
      }
    } catch (error) {
      console.error("Error adding FallowUp:", error);
      return res.status(500).json({ error: "Internal error" });
    }
  }

  async getFallowUp(req, res) {
    try {
      let data = await FallowUpModule.find({});
      if (data) {
        return res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateFallowUp(req, res) {
    let {
      enquiryId,
      enquiryDate,
      excutive,
      desc,
      amount,
      nextfallow,
      response,
    } = req.body;
    try {
      let idd = req.params.id;

      const findlFallowUp = await FallowUpModule.findOne({
        _id: idd,
      });
      if (!findlFallowUp) {
        return res.json({ error: "No such record found" });
      }

      findlFallowUp.enquiryId = enquiryId || findlFallowUp.enquiryId;
      findlFallowUp.enquiryDate = enquiryDate || findlFallowUp.enquiryDate;
      findlFallowUp.excutive = excutive || findlFallowUp.excutive;
      findlFallowUp.desc = desc || findlFallowUp.desc;
      findlFallowUp.amount = amount || findlFallowUp.amount;
      findlFallowUp.nextfallow = nextfallow || findlFallowUp.nextfallow;
      findlFallowUp.response = response || findlFallowUp.response;

      const updateFallowUp = await FallowUpModule.findOneAndUpdate(
        { _id: idd },
        findlFallowUp,
        { new: true }
      );

      return res.status(200).json({
        message: "Updated successfully",
        data: updateFallowUp,
      });
    } catch (error) {
      return res.status(500).json({ error: "Unable to update the FallowUp" });
    }
  }


  async TrashFallowUp(req, res) {
    let id = req.params.id;
    try {
      let finddata = await FallowUpModule.findOneAndDelete({ _id: id });
      if (finddata) {
        return res.status(200).json({
          data: finddata,
          message: "FallowUp Deleted Succesfully",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const FallowUpController = new FallowUp();
module.exports = FallowUpController;
