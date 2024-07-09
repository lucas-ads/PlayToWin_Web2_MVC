require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");

const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

const conn = require("./db/conn");
const Usuario = require("./models/Usuario");
const rotasUsuarios = require("./routes/usuariosRotas");
const authRotas = require("./routes/authRotas");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Definição e configuração da sessão

app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(__dirname, "sessions"),
    }),
    cookie: {
      secure: false,
      //maxAge: 3600000,
      httpOnly: true,
    },
  })
);

// Flash Messages

app.use(flash());

app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session;
  }

  next();
});

// Rotas

app.use("/", authRotas);

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
