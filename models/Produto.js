const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Produto = new Schema({
  nome: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  imagemLink: {
    type: String,
  },
});

mongoose.model("produtos", Produto);
