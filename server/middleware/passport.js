const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Token = require("../models/Token");
const keys = require("../config/keys");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select(
          "email id tokeId"
        );
        if (user) {
          const token = await Token.find({ _id: payload.tokenId });
          if (token.length !== 0) {
            console.log("Токен є в БД");
            done(null, user);
          } else if (token.length === 0) {
            console.log("Токена немає в БД");
            done(null, false);
          }
        } else {
          console.log("У токена закінчився час");
          done(null, false);
        }
      } catch (e) {
        console.log(e);
      }
    })
  );
};
