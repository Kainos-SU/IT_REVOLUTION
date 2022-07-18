const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Token");
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
        const tokenDB = await new Token({
          _id_user: candidate._id,
        });
        console.log(tokenDB);
        const token = jwt.sign(
          {
            email: candidate.email,
            userId: candidate._id,
            tokenId: tokenDB._id,
          },
          keys.jwt,
          { expiresIn: "168h" }
        );
        console.log(token);
        await tokenDB.save();
        res.status(200).json({
          token: `Bearer ${token}`,
          _id: candidate._id,
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

module.exports.logout = async function (req, res) {
  try {
    console.log("Сервер logout");
    // console.log(req.body);
    const candidateDelToken = req.body.token;
    const token = await Token.find({ _id_user: req.body._id }); // Списко токенів користувача який хоче вийти з кабінету.
    // console.log(token);

    // Декодіровка JWT
    let base64Url = candidateDelToken.split(".")[1];
    let base64 = decodeURIComponent(
      atob(base64Url)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    //

    const tokenDelete = JSON.parse(base64);
    const tokenDeleteID = tokenDelete.tokenId; // ID токена сесії користувача який хоче вийти

    await Token.findByIdAndRemove({ _id: tokenDeleteID });
    res.status(200).json({ message: "Успішно" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Сталася помилка на серверові. Спробуйте пізніше." });
  }
};
