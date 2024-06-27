const express = require("express");
const router = express.Router();

const UsuarioController = require("../controllers/UsuarioController");

// Middleware para verificar sem tem permissão para gerenciar usuários
router.use((req, res, next) => {
  const role = {
    usuarios: "all",
  };

  if (role.usuarios == "all") {
    console.log("Tem permissão para gerenciar usuários!");
    next();
  } else {
    console.log("Sem permissão para usuários!");
    res.redirect("/");
  }
});

router.get("/", UsuarioController.index);

router.get("/novo", UsuarioController.getFormCadastro);

router.post("/novo", UsuarioController.cadastrar);

router.get("/:id/update", UsuarioController.getFormAtualizacao);

router.post("/:id/update", UsuarioController.atualizar);

router.post("/:id/delete", UsuarioController.deletar);

module.exports = router;
