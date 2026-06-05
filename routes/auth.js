
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Token");
const { sendWelcome } = require("../utils/email");

// REGISTER
router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    email: req.body.email,
    password: hashed
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  await Token.create({ user: user._id, token });

  const link = `http://localhost:3000/auth/verify/${token}`;

  await sendWelcome(user.email, link);

  res.json({ message: "Usuario creado, revisa tu correo" });
});

// VERIFY
router.get("/verify/:token", async (req, res) => {
  const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
  await User.findByIdAndUpdate(decoded.id, { verificado: true });
  res.send("Cuenta verificada");
});

// LOGIN
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("Error");

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).send("Error");

  if (!user.verificado) return res.status(401).send("No verificado");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });

  res.json({ token });
});

module.exports = router;
