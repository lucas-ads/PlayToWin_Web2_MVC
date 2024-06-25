require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");

const conn = require("./db/conn");
const Usuario = require("./models/Usuario");

const rotasUsuarios = require("./routes/usuariosRotas");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Rotas

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/usuarios", rotasUsuarios);

conn
  .sync()
  .then(() => {
    app.listen(process.env.SERVER_PORT);
  })
  .catch((err) => {
    console.log(err);
  });
