const Social = require('../Models/Social_information');
const jwt = require('jsonwebtoken');
const Socialcontroller = {
    async social(req, res) {
        const { instagram, tiktok, youtube, facebook, twitter, pinterest, linkedin, blog } = req.body;
        console.log(instagram, tiktok, youtube, facebook, twitter, pinterest, linkedin, blog)
        if ( !instagram || !tiktok || !youtube || !facebook || !twitter || !pinterest || !linkedin || !blog) {
            return res.status(400).json({ Error: true, msg: "Please enter all fields" });
        }

        try {
            const user = await Social.find({ instagram, tiktok, youtube, facebook, twitter, pinterest, linkedin, blog });
            if (user.length === 0) {

                const newUser = new Social({
                    instagram,
                    tiktok,
                    youtube,
                    facebook,
                    twitter,
                    pinterest,
                    linkedin,
                    blog
                });

                await newUser.save().then((result) => {
                    console.log('newUser', newUser)
                    const token = jwt.sign(
                        { instagram: newUser.instagram, id: newUser._id },
                        "your_secretc_key"
                    );
                    return res.status(201).json({
                        newUser,
                        token,
                        msg: "Social handle Created Successfully",
                    });
                });
            } else {
                return res.status(400).json({
                    status: false,
                    Error: true,
                    msg: "Social handle already exists",
                });
            }
        } catch (error) {
            return res.status(500).json({ Error: true, msg: "Internal Server Error" });
        }
    },

};

module.exports = Socialcontroller;