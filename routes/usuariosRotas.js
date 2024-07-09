const express = require("express");
const router = express.Router();

const UsuarioController = require("../controllers/UsuarioController");
const AuthController = require("../controllers/AuthController");

router.use(AuthController.makeAuthMiddleware);

router.get("/", UsuarioController.index);

router.get("/novo", UsuarioController.getFormCadastro);

router.post("/novo", UsuarioController.cadastrar);

router.get("/:id/update", UsuarioController.getFormAtualizacao);

router.post("/:id/update", UsuarioController.atualizar);

router.post("/:id/delete", UsuarioController.deletar);

module.exports = router;
