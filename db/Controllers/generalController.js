const General = require('../Models/general_Information');
const jwt = require('jsonwebtoken');
const Generalcontroller = {
  async general(req, res) {
    const { userId, fname, lname, phone, companyname, companywebsite, companyaddress } = req.body;
    console.log(fname, lname, phone, companyname, companywebsite, companyaddress)
    if (!fname || !lname || !phone || !companyname || !companywebsite || !companyaddress) {
      return res.status(400).json({ Error: true, msg: "Please enter all fields" });
    }

    try {
      const user = await General.find({ fname, lname, phone, companyname, companywebsite, companyaddress });
      if (user.length === 0) {

        const newUser = new General({
          fname,
          lname,
          phone,
          companyname,
          companywebsite,
          companyaddress,
          userId
        });

        await newUser.save().then((result) => {
          console.log('newUser', newUser)
          const token = jwt.sign(
            { fname: newUser.fname, id: newUser._id },
            "your_secretc_key"
          );
          return res.status(201).json({
            newUser,
            token,
            msg: "General Info Created Successfully",
          });
        });
      } else {
        return res.status(400).json({
          status: false,
          Error: true,
          msg: "General info already exists",
        });
      }
    } catch (error) {
      return res.status(500).json({ Error: true, msg: "Internal Server Error" });
    }
  },
  async getGeneral(req, res) {
    try {
      const general = await General.find();
      return res.status(200).json({ general });
    } catch (error) {
      return res.status(500).json({ Error: true, msg: "Internal Server Error" });
    }
  },
  async getGeneralById(req, res) {
    try {
      const general = await General.findOne({ userId: req.params.id });
      if (!general) {
        return res.status(404).json({ Error: true, msg: "General Info not found" });
      }
      return res.status(200).json({ general });
    } catch (error) {
      return res.status(500).json({ Error: true, msg: "Internal Server Error" });
    }
  },
  async deleteGeneral(req, res) {
    try {
      const general = await General.findByIdAndDelete(req.params.id);
      if (!general) {
        return res.status(404).json({ Error: true, msg: "General Info not found" });
      }
      return res.status(200).json({ msg: "General Info deleted successfully" });
    } catch (error) {
      return res.status(500).json({ Error: true, msg: "Internal Server Error" });
    }
  },
  async updateGeneral(req, res) {
    const { fname, lname, phone, companyname, companywebsite, companyaddress } = req.body;
    if (!fname || !lname || !phone || !companyname || !companywebsite || !companyaddress) {
      return res.status(400).json({ Error: true, msg: "Please enter all fields" });
    }
    try {
      const general = await General.findByIdAndUpdate(
        req.params.id,
        { fname, lname, phone, companyname, companywebsite, companyaddress },
        { new: true }
      );
      if (!general) {
        return res.status(404).json({ Error: true, msg: "General Info not found" });
      }
      return res.status(200).json({ general });
    } catch (error) {
      return res.status(500).json({ Error: true, msg: "Internal Server Error" });
    }
  }

};

module.exports = Generalcontroller;