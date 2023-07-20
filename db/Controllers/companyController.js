const Company = require('../Models/Company_information');
const jwt = require('jsonwebtoken');
const Companycontroller = {
    async company(req, res) {
      const { niche,budget, companysize, companyfounded,bio } = req.body;
       console.log(niche,budget,companysize,companyfounded,bio)
      if (!niche || !budget || !companysize || !companyfounded || !bio) {
        return res.status(400).json({ Error: true, msg: "Please enter all fields" });
      }
  
      try {
        const user = await Company.find({ niche,budget, companysize, companyfounded,bio });
        if (user.length === 0) {
         
          const newUser = new Company({
            niche,
            budget,
            companysize,
            companyfounded,
            bio,
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
    
  };
  
  module.exports = Companycontroller;