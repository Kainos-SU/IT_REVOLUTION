const express = require("express");
const mongoose = require("mongoose");
const pasport = require("passport");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
// Router START
const userlistRoutes = require("./routes/userlist");
// Router END
// Swagger START
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
// Swagger END
// const keys = require("./config/keys");
const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UserList API",
      version: "1.0.0",
      descriprion: "Express Swagger",
    },
    servers: [
      {
        url: "http://localhost:5000/",
      },
    ],
  },
  apis: ["./swagger/swagger.yml"],
}; // options Swagger
const specs = swaggerJsDoc(options);

mongoose
  .connect(
    "mongodb+srv://Marcus:AdminPassword@cluster0.cwn2npc.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected MongoDB");
  })
  .catch((errors) => {
    console.error(errors);
  });

app.use(pasport.initialize());
require("./middleware/passport")(pasport);

app.use(require("morgan")("dev"));

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("cors")());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs)); // Swagger

app.use("/api/auth", authRoutes);
app.use("/api/userlist", userlistRoutes);

module.exports = app;
