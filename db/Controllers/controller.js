const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const uploadPhoto = require('../utils/UploadImage');
const imageUpload = require('../utils/upload');
const sendVerifyMail = async (name, email, userId) => {
  console.log('mail verify :', name, email, userId);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    name: ['influencer-platform-mbvv.vercel.app'],
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });
  console.log("welcome tran", transporter)
  const mailOptions = {
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

    if (!_id) {
      return res.status(400).json({ Error: true, msg: "Please enter id" });
    }

    try {
      const user = await User.findById(_id);
      if (user) {

        let userVerified = await User.findByIdAndUpdate(_id, { verify: true })
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

  async updateGeneral(req, res) {
    const { _id } = req.params

    try {
      const updateGeneral = await User.findByIdAndUpdate(_id, req.body, { new: true });
      return res.status(200).json({
        updateGeneral,
        msg: "General Info updated successfully",
      });
    } catch (error) {
      res.status(500).json({ Error: true, msg: error });

    }
  },

  async updateBillingDetails(req, res) {
    const { _id } = req.params;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { $set: { billingDetails: req.body.billingDetails } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ msg: "User not found" });
      }

      return res.status(200).json({
        updateBilling: updatedUser,
        msg: "Billing Details updated successfully",
      });

    } catch (error) {
      res.status(500).json({ Error: true, msg: error.message });
    }
  },
  async updateUserAccountNotifications(req, res) {
    const { _id } = req.params;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { $set: { notifications: req.body.notifications } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ msg: "User not found" });
      }

      return res.status(200).json({
        updateBilling: updatedUser,
        msg: "Billing Details updated successfully",
      });

    } catch (error) {
      res.status(500).json({ Error: true, msg: error.message });
    }
  },
  async updateUserAccountMembers(req, res) {
    const { _id } = req.params;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { $set: { members: req.body.members } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ msg: "User not found" });
      }

      return res.status(200).json({
        updateBilling: updatedUser,
        msg: "Billing Details updated successfully",
      });

    } catch (error) {
      res.status(500).json({ Error: true, msg: error.message });
    }
  },


  async updateUser(req, res) {
    const { _id } = req.params;
    console.log('id', _id)
    if (!_id) {
      return res.status(400).json({ Error: true, msg: "Please enter id" });
    }
    else {
      try {
        const updateUser = await User.findByIdAndUpdate(_id, req.body, { new: true });
        return res.status(200).json({
          updateUser,
          msg: "User updated successfully",
        });

      } catch (error) {
        return res.status(500).json({ Error: true, msg: "Internal Server Error" });

      }
    }
  },


  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      return res.status(200).json({
        users,
        msg: "All users retrieved successfully",
      });
    } catch (error) {
      return res.status(500).json({ Error: true, msg: "Internal Server Error" });
    }
  },

  async userProfile(req, res) {
    console.log(req.body)
    console.log(req.file.filename)
    if (!req.file) {
      return res.status(400).json({ Error: true, msg: "Please upload a file" });
    }
    const { _id } = req.params;
    const { file } = req;
    const { path } = file;
    const image = await imageUpload(file);
    const imageName = req.file.filename;
    console.log("Image name is ....", imageName);

    try {
      const user = await User.findByIdAndUpdate(_id, { image: imageName }, { new: true });
      return res.status(200).json({
        user,
        msg: "Profile Image updated successfully",
      });
    } catch (error) {
      return res.status(500).json({ Error: true, msg: "Internal Server Error" });
    }
  },




};

module.exports = controller;
