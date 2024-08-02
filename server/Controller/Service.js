const ServiceModule = require("../Module/Service");

class Service {
  async AddService(req, res) {
    let {
      servicename,
      subtitle,
      offerPrice,
      locationType,
      desc,
      exludes,
      includes,
      realPrice,
      Slot,
      Plan,
    } = req.body;
    let itemfile = req.file ? req.file.filename : null;

    try {
      let subdata = new ServiceModule({
        servicename,
        subtitle,
        offerPrice,
        locationType,
        desc,
        exludes,
        includes,
        realPrice,
        Slot,
        Plan,
        Serviceimg: itemfile,
      });

      let ServiceData = await subdata.save();

      if (ServiceData) {
        return res.status(200).json({
          data: ServiceData,
          message: "Service added successfully",
        });
      }
    } catch (error) {
      console.error("Error adding Service:", error);
      return res.status(500).json({ error: "Internal error" });
    }
  }

  async getService(req, res) {
    try {
      let data = await ServiceModule.find({});
      if (data) {
        return res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateService(req, res) {
    let {
      servicename,
      subtitle,
      offerPrice,
      locationType,
      desc,
      exludes,
      includes,
      realPrice,
      Slot,
      Plan,
    } = req.body;
    try {
      let idd = req.params.id;
      const file = req.file?.filename;
      const findlService = await ServiceModule.findOne({
        _id: idd,
      });
      if (!findlService) {
        return res.json({ error: "No such record found" });
      }

      findlService.servicename = servicename || findlService.servicename;
      findlService.offerPrice = offerPrice || findlService.offerPrice;
      findlService.realPrice = realPrice || findlService.realPrice;
      findlService.subtitle = subtitle || findlService.subtitle;
      findlService.desc = desc || findlService.desc;
      findlService.Slot = Slot | findlService.Slot;
      findlService.Plan = Plan | findlService.Plan;
      findlService.locationType = locationType || findlService.locationType;
      findlService.includes = includes || findlService.includes;
      findlService.exludes = exludes || findlService.exludes;

      if (file) {
        findlService.Serviceimg = file;
      }

      const updateService = await ServiceModule.findOneAndUpdate(
        { _id: idd },
        findlService,
        { new: true }
      );
      return res.status(200).json({
        message: "Updated successfully",
        date: updateService,
      });
    } catch (error) {
      return res.status(500).json({ error: "Unable to update the category" });
    }
  }
  async updateSlots(req, res) {
    let { Slot } = req.body;
    try {
      let idd = req.params.id;

      const findlService = await ServiceModule.findOne({
        _id: idd,
      });
      if (!findlService) {
        return res.json({ error: "No such record found" });
      }

      findlService.Slot = Slot || findlService.Slot;
      const updateService = await ServiceModule.findOneAndUpdate(
        { _id: idd },
        findlService,
        { new: true }
      );

      return res.status(200).json({
        message: "Updated successfully",
        date: updateService,
      });
    } catch (error) {
      return res.status(500).json({ error: "Unable to update the category" });
    }
  }

  async TrashService(req, res) {
    let id = req.params.id;
    try {
      let finddata = await ServiceModule.findOneAndDelete({ _id: id });
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

const ServiceController = new Service();
module.exports = ServiceController;
