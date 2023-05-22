require("dotenv").config();
const { urlencoded } = require("express");
const express = require("express");
const port = process.env.PORT || 5000;
const errorHandler = require("./middleware/errorMiddleware");
const colors = require("colors");
const connectDB = require("./config/db");
const path = require("path");

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoute.js"));
app.use("/api/users", require("./routes/userRoute.js"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => res.send("please set to production"));
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started at url http://localhost:${port}`);
});
