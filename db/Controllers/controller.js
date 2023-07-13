const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const sendVerifyMail = async ( name, email , userId) => {
  console.log('mail verify :',name, email,userId);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });
  console.log("welcome tran",transporter)
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Email verification",
    html:
      "<p><h2> " +
      email +
      ' Thanks For Registering On Our Site</h2> <h4>Please Verify Your Email To Continue....</h4> Click here to <a href="https://roadmap-backend.herokuapp.com/api/verify?id=' +
      userId +
      '"> Verify </a> your mail.</p>',
  };
  console.log("options ",mailOptions)
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
    console.log("djdkdk", email)
    if (!name || !email || !password) {
      return res
        .status(201)
        .json({ Error: true, msg: "Please enter all fields" });
    }
    try {
      const user = await User.findOne({ email });
      if (!user) {
        let hashedpassword = await bcrypt.hash(password, 12);

        const newUser = new User({
          name,
          email,
          password: hashedpassword,
          verified: false,
        });
        console.log("new user",newUser)
        await newUser.save().then((result) => {
          // const token = jwt.sign(
          //   { email: newUser.email, id: newUser._id },
          // );
          return res.status(201).json({
            newUser,
            // token,
            msg: "User Created Successfully",
          });
        });
        if (newUser) {
          console.log("newUser2",newUser)
          sendVerifyMail(newUser.name, newUser.email, newUser._id);
          return res.status("registration", {
            message:
              "your registration has been successfully, please verify your email",
          });
        }
        } else {
          res.status(201).json({
            status: false,
            Error: true,
            msg: "User Already Exist",
          });
          return res.status(201).json({ msg: "User Already Exist" });
      }
    } catch (error) {
      return console.log(error);
    }
  },
}
module.exports = controller;
