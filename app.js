
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth");
const bikeRoutes = require("./routes/bikes");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

app.use("/auth", authRoutes);
app.use("/bikes", bikeRoutes);

app.listen(process.env.PORT, () => {
  console.log("Servidor en puerto 3000");
});
