const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const colors = require("colors");
const port = process.env.PORT || 8080;
const morgan = require("morgan");
const userRoute = require("./routes/userRoute");
const todoRoute = require("./routes/todoRoute");

const errorHandler = require("./middlewares/errorMiddleware");
const connect = require("./config/connection");

const app = express();

//middlewares
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(morgan("dev"));
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/todo", todoRoute);

app.use(errorHandler);

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running in port: ${port}`);
    });
  })
  .catch((err) => console.log(err));
