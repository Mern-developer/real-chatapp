const User = require("../model/authUserModel");
const { find } = require("../model/authUserModel");

module.exports = {
  getallUser: async (req, res) => {
    try {
      console.log(req.user._id);
      const loginUser = req.user._id;
      const filterUser = await User.find({ _id: { $ne: req.user._id } });

      res.json({ message: "user got successfully!", data: filterUser });
    } catch (err) {
        console.log(`Error in getalluserRoutes ${err.message}`)
        res.status(500).json(`Internal server Error!`);
    }
  },
};
