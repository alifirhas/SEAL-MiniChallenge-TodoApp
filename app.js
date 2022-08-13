const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const { userRouter } = require("./routes/UserRouter");
const { taskRouter } = require("./routes/TaskRouter");
const { subTaskRouter } = require("./routes/SubTaskRouter");
const { verifyToken } = require("./middlewares/auth");
const cors = require('cors')


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);
app.use("/task", verifyToken, taskRouter);
app.use("/subtask", verifyToken, subTaskRouter);
app.use("/", (req, res) => {
  res.status(200).send({
    message: "Selamat data di API todo apps",
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
