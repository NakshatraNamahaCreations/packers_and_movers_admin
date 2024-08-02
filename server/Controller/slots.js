const { message } = require("statuses");
const SlotsModule = require("../Module/slots");

class Slots {
  async AddSlots(req, res) {
    let { startTime, endTime, startUnit, endUnit } = req.body;
    try {
      let data = new SlotsModule({
        startTime,
        endTime,
        startUnit,
        endUnit,
      });
      let slotData = await data.save();
      if (slotData) {
        return res
          .status(200)
          .json({ data: slotData, message: "Slots added succesfully" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal error" });
    }
  }

  async getSlots(req, res) {
    try {
      let data = await SlotsModule.find({});
      if (data) {
        return res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateSlots(req, res) {
    const Slotsid = req.params.id;
    let { startTime, endTime, startUnit, endUnit } = req.body;
    try {
      const findlSlots = await SlotsModule.findOne({
        _id: Slotsid,
      });

      if (!findlSlots) {
        return res.status(404).json({ error: "No such record found" });
      }

      findlSlots.startTime = startTime || findlSlots.startTime;
      findlSlots.endTime = endTime || findlSlots.endTime;
      findlSlots.startUnit = startUnit || findlSlots.startUnit;
      findlSlots.endUnit = endUnit || findlSlots.endUnit;

      const updateSlots = await SlotsModule.findOneAndUpdate(
        { _id: Slotsid },
        findlSlots,
        { new: true }
      );
      return res.status(200).json({
        message: "Updated successfully",
        data: updateSlots,
      });
    } catch (err) {
      return res.status(500).json({ error: "server error" });
    }
  }

  async TrashSlots(req, res) {
    let id = req.params.id;
    try {
      let findSlots = await SlotsModule.findOneAndDelete({ _id: id });
      if (findSlots) {
        return res
          .status(200)
          .json({ data: findSlots, message: "Slots Deleted Succesfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const SlotsController = new Slots();
module.exports = SlotsController;
