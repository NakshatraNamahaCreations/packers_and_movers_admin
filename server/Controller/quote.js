const QuoteModule = require("../Module/quote");

class Quote {
  async AddQuote(req, res) {
    let {
      category,
      lastFDate,
      NextFDate,
      quoteDate,
      quoteId,
      customer,
      email,
      contact1,
      contact2,
      address,
      city,
      service,
      amount,
      Executive,
      desc,
    } = req.body;

    try {
      let subdata = new QuoteModule({
        category,
        lastFDate,
        NextFDate,
        quoteDate,
        quoteId,
        customer,
        email,
        contact1,
        contact2,
        address,
        city,
        service,
        amount,
        Executive,
        desc,
      });

      let QuoteData = await subdata.save();

      if (QuoteData) {
        return res.status(200).json({
          data: QuoteData,
          message: "Quote added successfully",
        });
      }
    } catch (error) {
      console.error("Error adding Quote:", error);
      return res.status(500).json({ error: "Internal error" });
    }
  }

  async getQuote(req, res) {
    try {
      let data = await QuoteModule.find({});
      if (data) {
        return res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateQuote(req, res) {
    let {
      category,
      lastFDate,
      NextFDate,
      quoteDate,
      quoteId,
      customer,
      email,
      contact1,
      contact2,
      address,
      city,
      service,
      amount,
      Executive,
      desc,
    } = req.body;
    try {
      let idd = req.params.id;

      const findlQuote = await QuoteModule.findOne({
        _id: idd,
      });
      if (!findlQuote) {
        return res.json({ error: "No such record found" });
      }

      findlQuote.category = category || findlQuote.category;
      findlQuote.lastFDate = lastFDate || findlQuote.lastFDate;
      findlQuote.NextFDate = NextFDate || findlQuote.NextFDate;
      findlQuote.quoteDate = quoteDate || findlQuote.quoteDate;
      findlQuote.quoteId = quoteId || findlQuote.quoteId;
      findlQuote.customer = customer || findlQuote.customer;
      findlQuote.email = email || findlQuote.email;
      findlQuote.contact1 = contact1 || findlQuote.contact1;
      findlQuote.contact2 = contact2 || findlQuote.contact2;
      findlQuote.address = address || findlQuote.address;
      findlQuote.city = city || findlQuote.city;
      findlQuote.service = service || findlQuote.service;
      findlQuote.amount = amount || findlQuote.amount;
      findlQuote.Executive = Executive || findlQuote.Executive;
      findlQuote.desc = desc || findlQuote.desc;

      const updateQuote = await QuoteModule.findOneAndUpdate(
        { _id: idd },
        findlQuote,
        { new: true }
      );

      return res.status(200).json({
        message: "Updated successfully",
        data: updateQuote,
      });
    } catch (error) {
      return res.status(500).json({ error: "Unable to update the Quote" });
    }
  }

  async updateResponse(req, res) {
    let { Response } = req.body;
    try {
      let idd = req.params.id;

      const findlQuote = await QuoteModule.findOne({
        _id: idd,
      });
      if (!findlQuote) {
        return res.json({ error: "No such record found" });
      }

      findlQuote.Response = Response || findlQuote.Response;

      const updateQuote = await QuoteModule.findOneAndUpdate(
        { _id: idd },
        findlQuote,
        { new: true }
      );

      return res.status(200).json({
        message: "Updated successfully",
        data: updateQuote,
      });
    } catch (error) {
      return res.status(500).json({ error: "Unable to update the Quote" });
    }
  }

  async TrashQuote(req, res) {
    let id = req.params.id;
    try {
      let finddata = await QuoteModule.findOneAndDelete({ _id: id });
      if (finddata) {
        return res.status(200).json({
          data: finddata,
          message: "Quote Deleted Succesfully",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const QuoteController = new Quote();
module.exports = QuoteController;
