const Usuario = require("../models/Usuario");

module.exports = class UsuarioController {
  static async index(req, res) {
    const usuarios = await Usuario.findAll({ raw: true });

    res.render("usuarios", { usuarios });
  }

  static getFormCadastro(req, res) {
    res.render("formUsuario");
  }

  static async cadastrar(req, res) {
    const dadosUsuario = {
      nickname: req.body.nickname,
      nome: req.body.nome,
    };

    const usuario = await Usuario.create(dadosUsuario);

    res.send(`Usuário criado com o ID ${usuario.id}!`);
  }

  static async getFormAtualizacao(req, res) {
    const id = parseInt(req.params.id);

    const usuario = await Usuario.findByPk(id, { raw: true });

    if (usuario != null) {
      res.render("formUsuario", { usuario });
    } else {
      res.redirect("/usuarios");
    }
  }

  static async atualizar(req, res) {
    const id = parseInt(req.params.id);

    const dadosUsuario = {
      nome: req.body.nome,
      nickname: req.body.nickname,
    };

    Usuario.update(dadosUsuario, { where: { id: id } });

    res.redirect("/usuarios");
  }

  static deletar(req, res) {
    const id = parseInt(req.params.id);

    Usuario.destroy({ where: { id: id } });

    res.redirect("/usuarios");
  }
};
