const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../config/keys");

module.exports.login = async function (req, res) {
  console.log("Сервер login");
  try {
    const candidate = await User.findOne({ email: req.body.email });
    if (candidate) {
      const passwordResult = bcrypt.compareSync(
        req.body.password,
        candidate.password
      );
      if (passwordResult) {
        const token = jwt.sign(
          {
            email: candidate.email,
            userId: candidate._id,
          },
          keys.jwt,
          { expiresIn: 60 * 20 }
        );
        res.status(200).json({
          token: `Bearer ${token}`,
        });
      } else {
        res.status(401).json({
          message: "Введено не вірно пароль або пошта.",
        });
      }
    } else {
      res.status(404).json({
        message: "Користувача з такою поштою не знайдено.",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Сталася помилка на серверові. Спробуйте пізніше." });
  }
};

module.exports.register = async function (req, res) {
  console.log("Сервер register");
  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    res.status(409).json({
      message: "Цей емейл уже занятий, виберіть другий.",
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
      name: req.body.name,
      admin: false,
    });
    try {
      await user.save();
      res.status(201).json({ user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Сталася помилка на серверові. Спробуйте пізніше." });
    }
  }
};
