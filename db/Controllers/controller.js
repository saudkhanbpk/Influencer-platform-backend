const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

const sendVerifyMail = async (name, email, userId) => {
  console.log('mail verify :', name, email, userId);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });
  console.log("welcome tran", transporter)
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Email verification",
    html:
      "<p><h2> " +
      email +
      ' Thanks For Registering On Our Site</h2> <h4>Please Verify Your Email To Continue....</h4> Click here to <a href="https://influencer-platform-mbvv.vercel.app/great?id=' +
      userId +
      '"> Verify </a> your mail.</p>',
  };
  console.log("options ", mailOptions)
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    } else {
      console.log('Email has been sent:-', info.response)
    }
  });

 

  transporter.verify((error, success) => {
    if (error) {
      return console.log(error);
    } else {
    }
  });
};


const controller = {
  async register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ Error: true, msg: "Please enter all fields" });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        let hashedpassword = await bcrypt.hash(password, 12);
        const emailToken = uuidv4(); // Generate a unique token for email verification

        const newUser = new User({
          name,
          email,
          password: hashedpassword,
          verify: false, // Correct the field name to "is_verified"
          emailToken,
        });

        await newUser.save().then((result) => {
          const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            "your_secretc_key"
          );

          sendVerifyMail(newUser.name, newUser.email, newUser._id);

          return res.status(201).json({
            newUser,
            token,
            msg: "User Created Successfully",
          });
        });
      } else {
        return res.status(400).json({
          status: false,
          Error: true,
          msg: "User Already Exist",
        });
      }
    } catch (error) {
      return res.status(500).json({ Error: true, msg: "Internal Server Error" });
    }
  },


  async verificationAfterEmail(req, res) {
    const { _id } = req.body;

    if (!_id ) {
      return res.status(400).json({ Error: true, msg: "Please enter id" });
    }

    try {
      const user = await User.findById(_id);
      if (user) {

        let userVerified=await User.findByIdAndUpdate(_id,{verify:true})
        return res.status(200).json({
          userVerified,
          msg: "verified user successfully",
        });
       
      } else {
        return res.status(400).json({
          status: false,
          Error: true,
          msg: "User not found",
        });
      }
    } catch (error) {
      return res.status(500).json({ Error: true, msg: "Internal Server Error" });
    }
  },
  
};

module.exports = controller;
