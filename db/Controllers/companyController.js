const Company = require('../Models/Company_information');
const jwt = require('jsonwebtoken');
const Companycontroller = {
  async company(req, res) {
    const { userId, niche, budget, companysize, companyfounded, bio } = req.body;
    console.log(niche, budget, companysize, companyfounded, bio)
    if (!niche || !budget || !companysize || !companyfounded || !bio) {
      return res.status(400).json({ Error: true, msg: "Please enter all fields" });
    }

    try {
      const user = await Company.find({ niche, budget, companysize, companyfounded, bio });
      if (user.length === 0) {

        const newUser = new Company({
          niche,
          budget,
          companysize,
          companyfounded,
          bio,
          userId
        });

        await newUser.save().then((result) => {
          console.log('newUser', newUser)
          const token = jwt.sign(
            { niche: newUser.niche, id: newUser._id },
            "your_secretc_key"
          );
          return res.status(201).json({
            newUser,
            token,
            msg: "Company Info Created Successfully",
          });
        });
      } else {
        return res.status(400).json({
          status: false,
          Error: true,
          msg: "Company info already exists",
        });
      }
    } catch (error) {
      return res.status(500).json({ Error: true, msg: "Internal Server Error" });
    }
  },
  async getCompany(req, res) {
    try {
      const company = await Company.find();
      return res.status(200).json({ company });
    } catch (error) {
      return res.status(500).json({ Error: true, msg: "Internal Server Error" });
    }
  },
  async getCompanyById(req, res) {
    const id = req.params.id;
    try {
      const company = await Company.findOne({ userId: id });
      return res.status(200).json({ company });
    } catch (error) {
      return res.status(500).json({ Error: true, msg: "Internal Server Error" });
    }
  },
  async updateCompany(req, res) {
    const id = req.params.id;
    const { niche, budget, companysize, companyfounded, bio } = req.body;
    try {
      const company = await Company.findByIdAndUpdate(id, {
        niche,
        budget,
        companysize,
        companyfounded,
        bio,
      });
      return res.status(200).json({ company });
    } catch (error) {
      return res.status(500).json({ Error: true, msg: "Internal Server Error" });
    }
  },
  async deleteCompany(req, res) {
    const id = req.params.id;
    try {
      const company = await Company.findByIdAndDelete(id);
      return res.status(200).json({ company });
    } catch (error) {
      return res.status(500).json({ Error: true, msg: "Internal Server Error" });
    }
  },

};

module.exports = Companycontroller;