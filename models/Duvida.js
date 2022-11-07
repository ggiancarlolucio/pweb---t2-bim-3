const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Duvida = new Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mensagem: {
    type: String,
    required: true,
  },
});

mongoose.model("duvidas", Duvida);
