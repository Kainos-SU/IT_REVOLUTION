const UserList = require("../models/UserList");
const User = require("../models/User");
// const errorHandler = require("../utils/errorHandler");

module.exports.getByUserList = async function (req, res) {
  try {
    console.log("Сервер getByUserList");

    const userList = await User.find();

    const newUserList = userList.map((element) => {
      return {
        name: element.name,
        email: element.email,
        _id: element._id,
        admin: element.admin,
        __v: element.__v,
      };
    });

    res.status(200).json({ newUserList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Сталася помилка. Спробуйте пізніше." });
  }
};

module.exports.getByUserListId = async function (req, res) {
  try {
    console.log("Сервер getByUserListId");
    // console.log(req.params);

    // const user = await User.findById(req.params.id);

    // console.log(user);
    // res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Сталася помилка. Спробуйте пізніше." });
  }
};

module.exports.delete = async function (req, res) {
  try {
    console.log("Сервер delete");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Сталася помилка. Спробуйте пізніше." });
  }
};
