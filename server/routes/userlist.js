const express = require("express");
const pasport = require("passport");
const controller = require("../controllers/userlist");
const router = express.Router();

router.get(
  "/",
  pasport.authenticate("jwt", { session: false }),
  controller.getByUserList
);

router.get(
  "/:id",
  pasport.authenticate("jwt", { session: false }),
  controller.getByUserListId
);

router.delete(
  "/",
  pasport.authenticate("jwt", { session: false }),
  controller.delete
);

module.exports = router;
