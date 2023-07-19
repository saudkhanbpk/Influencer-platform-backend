const General = require('../Models/general_Information');
const jwt = require('jsonwebtoken');
const Generalcontroller = {
    async general(req, res) {
      const { fname,lname, phone, companyname,companywebsite,companyaddress } = req.body;
  
      if (!fname || !lname || !phone || !companyname || !companywebsite || !companyaddress) {
        return res.status(400).json({ Error: true, msg: "Please enter all fields" });
      }
  
      try {
        const user = await General.find({ fname,lname, phone, companyname,companywebsite,companyaddress });
        if (user.length === 0) {
         
          const newUser = new General({
            fname,
            lname,
            phone,
            companyname,
            companywebsite,
            companyaddress
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
    
  };
  
  module.exports = Generalcontroller;