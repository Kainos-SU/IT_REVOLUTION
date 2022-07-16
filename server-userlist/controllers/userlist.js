const UserList = require("../models/UserList");
// const errorHandler = require("../utils/errorHandler");

module.exports.getByUserList = async function (req, res) {
  try {
    console.log("Сервер getByUserList");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Сталася помилка. Спробуйте пізніше." });
  }
};

module.exports.getByUserListId = async function (req, res) {
  try {
    console.log("Сервер getByUserListId");
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
