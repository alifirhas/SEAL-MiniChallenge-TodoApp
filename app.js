const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const { userRouter } = require("./routes/UserRouter");
const { taskRouter } = require("./routes/TaskRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);
app.use("/task", taskRouter);
app.use("/", (req, res) => {
  res.status(200).send({
    message: "Selamat data di API todo apps",
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
