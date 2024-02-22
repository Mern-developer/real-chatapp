const User = require("../model/authUserModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utilis");

module.exports = {
  login: async (req, res) => {
    try {
      const { fullName, password } = req.body;
      const existFullName = await User.findOne({ fullName: fullName });
      const loginSuccess = await bcrypt.compare(
        password,
        existFullName.password || ""
      );

      if (loginSuccess) {
        generateToken(existFullName._id, res);
        res.status(200).json({
          Message: "Login Successfully!",
          data: {
            _id: existFullName?._id,
            fullName: existFullName?.fullName,
            userName: existFullName?.userName,
            // password: existFullName.password,
            gender: existFullName?.gender,
            profilePic: existFullName?.profilePic,
          },
        });
      } else {
        res.status(400).json({ Message: "Invalid Password!" });
      }
    } catch (err) {
      res.status(201).json({ error: `something went wrong ${err.message}` });
    }
  },

  signUp: async (req, res) => {
    console.log(req.body, "---");
    
    try {
      const deletes = await User.findOne({ fullName: req.body?.fullName });
      console.log(deletes, "delete");
      if (req.body?.password !== req.body?.confirmedPassword) {
        return res
          .status(400)
          .send({ status: 400, message: "Password don't match!" });
      }
      if (req.body?.fullName === deletes?.fullName) {
        return res
          .status(400)
          .send({
            status: 400,
            message: `${deletes?.fullName} is already exsits!`,
          });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(req.body?.password, salt);

      const formData = new User({
        fullName: req.body?.fullName,
        userName: req.body?.userName,
        password: hashPass,
        gender: req.body?.gender,
        profilePic:
          req.body?.gender === "male"
            ? "https://avatar.iran.liara.run/public/boy"
            : "https://avatar.iran.liara.run/public/girl",
      });

      if (formData) {
        const resp = await formData.save();
        console.log(resp);
        res.send({
          Message: "User Created! ",
          data: {
            _id: resp._id,
            fullName: resp.fullName,
            userName: resp.userName,
            // password: resp.password,
            gender: resp.gender,
            profilePic: resp.profilePic,
            token: generateToken(resp._id, res),
          },
        });
      }
    } catch (err) {
      res.status(500).send("somethig went wrong!");
    }
  },
  logout: async (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(201).send("Logout succesfully!");
  },
};
