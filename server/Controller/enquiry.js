const EnquiryModule = require("../Module/enquiry");

class Enquiry {
  async AddEnquiry(req, res) {
    let {
      enquiryId,
      enquiryDate,
      excutive,
      customer,
      email,
      contact1,
      contact2,
      address,
      city,
      category,
      reference,
      service,
      Response,
    } = req.body;

    try {
      let subdata = new EnquiryModule({
        enquiryId,
        enquiryDate,
        excutive,
        customer,
        email,
        contact1,
        contact2,
        address,
        city,
        category,
        reference,
        service,
        Response,
      });

      let EnquiryData = await subdata.save();

      if (EnquiryData) {
        return res.status(200).json({
          data: EnquiryData,
          message: "Enquiry added successfully",
        });
      }
    } catch (error) {
      console.error("Error adding Enquiry:", error);
      return res.status(500).json({ error: "Internal error" });
    }
  }

  async getEnquiry(req, res) {
    try {
      let data = await EnquiryModule.find({});
      if (data) {
        return res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateEnquiry(req, res) {
    let {
      enquiryId,
      enquiryDate,
      excutive,
      customer,
      email,
      contact1,
      contact2,
      address,
      city,
      category,
      reference,
      service,
      Response,
    } = req.body;
    try {
      let idd = req.params.id;

      const findlEnquiry = await EnquiryModule.findOne({
        _id: idd,
      });
      if (!findlEnquiry) {
        return res.json({ error: "No such record found" });
      }

      findlEnquiry.enquiryId = enquiryId || findlEnquiry.enquiryId;
      findlEnquiry.enquiryDate = enquiryDate || findlEnquiry.enquiryDate;
      findlEnquiry.excutive = excutive || findlEnquiry.excutive;
      findlEnquiry.customer = customer || findlEnquiry.customer;
      findlEnquiry.contact1 = contact1 || findlEnquiry.contact1;
      findlEnquiry.contact2 = contact2 || findlEnquiry.contact2;
      findlEnquiry.address = address || findlEnquiry.address;
      findlEnquiry.city = city || findlEnquiry.city;
      findlEnquiry.reference = reference || findlEnquiry.reference;
      findlEnquiry.service = service || findlEnquiry.service;
      findlEnquiry.email = email || findlEnquiry.email;
      findlEnquiry.category = category || findlEnquiry.category;
      findlEnquiry.Response = Response || findlEnquiry.Response;

      const updateEnquiry = await EnquiryModule.findOneAndUpdate(
        { _id: idd },
        findlEnquiry,
        { new: true }
      );

      return res.status(200).json({
        message: "Updated successfully",
        data: updateEnquiry,
      });
    } catch (error) {
      return res.status(500).json({ error: "Unable to update the Enquiry" });
    }
  }

  async updateResponse(req, res) {
    let { Response } = req.body;
    try {
      let idd = req.params.id;

      const findlEnquiry = await EnquiryModule.findOne({
        _id: idd,
      });
      if (!findlEnquiry) {
        return res.json({ error: "No such record found" });
      }

      findlEnquiry.Response = Response || findlEnquiry.Response;

      const updateEnquiry = await EnquiryModule.findOneAndUpdate(
        { _id: idd },
        findlEnquiry,
        { new: true }
      );

      return res.status(200).json({
        message: "Updated successfully",
        data: updateEnquiry,
      });
    } catch (error) {
      return res.status(500).json({ error: "Unable to update the Enquiry" });
    }
  }

  async TrashEnquiry(req, res) {
    let id = req.params.id;
    try {
      let finddata = await EnquiryModule.findOneAndDelete({ _id: id });
      if (finddata) {
        return res.status(200).json({
          data: finddata,
          message: "Enquiry Deleted Succesfully",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const EnquiryController = new Enquiry();
module.exports = EnquiryController;
