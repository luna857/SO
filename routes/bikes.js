
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, (req, res) => {
  res.json([
    { id: 1, name: "Bici MTB" },
    { id: 2, name: "Bici Ruta" }
  ]);
});

module.exports = router;
