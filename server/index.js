const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", require("./routes/user.routes"));

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ message: "Server Online" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
