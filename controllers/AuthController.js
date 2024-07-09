const bcrypt = require("bcryptjs");

const Usuario = require("../models/Usuario");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static signup(req, res) {
    res.render("auth/signup");
  }

  static async signupPost(req, res) {
    const { nickname, nome, password, confirmpassword } = req.body;

    // Verificação de senha

    if (password != confirmpassword) {
      req.flash("msg", "As senhas não podem ser diferentes!");

      AuthController.signup(req, res);

      return;
    }

    // Verificação de nickname

    const usuario = await Usuario.findOne({ where: { nickname: nickname } });

    if (usuario) {
      req.flash("msg", "Já existe um usuário com este nickname!");

      AuthController.signup(req, res);

      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const dadosUsuario = {
      nickname,
      nome,
      password: hashedPassword,
    };

    const user = await Usuario.create(dadosUsuario);

    req.flash("msg", "Cadastro realizado com sucesso!");

    req.session.userId = user.id;

    req.session.save(() => {
      res.redirect("/");
    });
  }
};
