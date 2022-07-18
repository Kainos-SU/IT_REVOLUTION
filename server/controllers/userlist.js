const User = require("../models/User");
const bcrypt = require("bcryptjs");

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

module.exports.getByUserId = async function (req, res) {
  try {
    console.log("Сервер getByUserListId");
    const candidateUser = await User.findById(req.params.id);
    console.log(candidateUser);
    let user = {
      _id: candidateUser._id,
      email: candidateUser.email,
      name: candidateUser.name,
      admin: candidateUser.admin,
      __v: candidateUser.__v,
    };

    res.status(200).json({ user });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Сталася помилка. Спробуйте пізніше." });
  }
};

module.exports.userDelete = async function (req, res) {
  try {
    console.log("Сервер delete");
    console.log(req.params.id);
    console.log(req.body);

    const adminUser = await User.findById(req.body._id); // Користувач який хоче видалити іншого користувача.

    const passwordResult = bcrypt.compareSync(
      req.body.password,
      adminUser.password
    ); // Чи правильний пароль у адміна

    console.log(passwordResult);
    console.log(adminUser);

    if (passwordResult === true && adminUser.admin === true) {
      await User.remove({ _id: req.params.id }); // Delete user in DB // Користувач якого буде видалено.
      res.status(200).json({ message: "Користувача успішно видалено" });
    } else {
      res.status(423).json({
        message:
          "Користувача не видалено. Введено не вірно пароль, або недостатньо прав для цього.",
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Сталася помилка. Спробуйте пізніше." });
  }
};
