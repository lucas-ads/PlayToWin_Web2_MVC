const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");

router.get("/login", AuthController.login);

router.get("/cadastro", AuthController.signup);

router.post("/cadastro", AuthController.signupPost);

module.exports = router;
