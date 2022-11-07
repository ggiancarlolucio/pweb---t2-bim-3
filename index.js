const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
require("./models/Duvida");
const Duvida = mongoose.model("duvidas");
require("./models/Produto");
const Produto = mongoose.model("produtos");
const admin = require("./routes/admin");
const { engine } = require("express-handlebars");

app.use(express.json());
app.use(express.static(path.join(__dirname, "/")));
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.Promise = global.Promise;
mongoose
  .connect(
    ""
  //AQUI, O BANCO DE DADOS PARA CONEXÃO DEVE SER INSERIDO
  )
  .then(() => {
    /* pode ser o link ou o db.mongoURI */
    console.log("Conectado ao banco");
  })
  .catch((erro) => {
    console.log("erro " + erro);
  });

app.get("/", (req, res) => {
  Produto.find()
    .lean()
    .then((produtos) => {
      res.render("index", { produtos });
    })
    .catch((erro) => {
      console.log("erro: " + erro);
      res.render("index");
    });
});

app.get("/catalogo", (req, res) => {
  Produto.find()
    .lean()
    .then((produtos) => {
      res.render("catalogo", { produtos });
    })
    .catch((error) => {
      console.log("erro: " + error);
      res.render("catalogo");
    });
});

app.get("/localizacao", (req, res) => {
  res.render("localizacao");
});

app.get("/duvidas", (req, res) => {
  res.render("duvidas");
});

app.post("/duvidas", (req, res) => {
  const duvida = new Duvida({
    nome: req.body.nome,
    email: req.body.email,
    mensagem: req.body.textAreaMensagem,
  });

  duvida
    .save()
    .then(() => {
      console.log("criado");
    })
    .catch((erro) => {
      console.log("erro: " + erro);
    });

  res.redirect("/");
});

app.use("/admin", admin);

app.listen(8080, () => {
  console.log("rodando");
});
