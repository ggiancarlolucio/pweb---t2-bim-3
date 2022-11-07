const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("../models/Duvida");
const Duvida = mongoose.model("duvidas");
require("../models/Produto");
const Produto = mongoose.model("produtos");

app.get("/duvidas", (req, res) => {
  Duvida.find()
    .lean()
    .then((duvidas) => {
      res.render("adminduvidas", { duvidas: duvidas });
    })
    .catch((erro) => {
      console.log("erro: " + erro);
      res.redirect("/");
    });
});

app.get("/novoproduto", (req, res) => {
  res.render("adminnovoproduto");
});

app.post("/produto", (req, res) => {
  const produto = new Produto({
    nome: req.body.nome,
    preco: req.body.preco,
    imagemLink: "tenis" + getRandomInt() + "catalo.jpeg",
  });
  produto
    .save()
    .then(() => {
      console.log("produto salvo com sucesso :)");
      res.redirect("/admin/catalogo");
    })
    .catch((erro) => {
      console.log("erro " + erro);
      res.redirect("/admin/catalogo");
    });
});

app.get("/catalogo", (req, res) => {
  Produto.find()
    .lean()
    .then((produtos) => {
      res.render("admincatalogo", { produtos });
    })
    .catch((error) => {
      console.log("erro: " + error);
      res.render("admincatalogo");
    });
});

app.post("/produto/deletar", (req, res) => {
  Produto.deleteOne({ _id: req.body.id })
    .then(() => {
      res.redirect("/admin/catalogo");
    })
    .catch((erro) => {
      res.redirect("/admin/catalogo");
    });
});

function getRandomInt() {
  min = Math.ceil(1);
  max = Math.floor(12);
  return Math.floor(Math.random() * (max - min) + min);
}

module.exports = app;
