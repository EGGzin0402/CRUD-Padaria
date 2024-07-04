const express = require("express");
const app = express();
const handlebars = require("express-handlebars").engine;
const helpers = require("handlebars-helpers")();
const bodyParser = require("body-parser");

const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");

const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require("./AccountService.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

app.engine("handlebars", handlebars({ defaultLayout: "main", helpers: helpers }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static files
app.use('/public', express.static("public"));

// Routes

app.get("/", function (req, res) {
  res.render("pedidos");
});

app.get("/consulta", async function (req, res) {
    const dataSnapshot = await db.collection('pedidos').get();
    const data = [];
    dataSnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          nome: doc.get("nome"),
          telefone: doc.get("telefone"),
          endereco: doc.get("endereco"),
          itens: doc.get("itens"),
          observacao: doc.get("observacao"),
        });
    });
    res.render("consulta", { data });
});

app.get("/editar/:id", async function (req, res) {
    const dataSnapshot = await db.collection('pedidos').doc(req.params.id).get();
    const data = {
      id: dataSnapshot.id,
      nome: dataSnapshot.get('nome'),
      telefone: dataSnapshot.get('telefone'),
      endereco: dataSnapshot.get('endereco'),
      itens: dataSnapshot.get('itens'),
      observacao: dataSnapshot.get('observacao'),
    };

    res.render("editar", { data });
});

app.get("/excluir/:id", function (req, res) {
    db.collection('pedidos').doc(req.params.id).delete().then(function () {
        console.log('Deleted document');
        res.redirect('/consulta');
    });
});

app.post("/cadastrar", function (req, res) {
  var result = db
    .collection("pedidos")
    .add({
      nome: req.body.nome,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      itens: JSON.parse(req.body.itens),
      observacao: req.body.observacao,

    })
    .then(function () {
      console.log("Added document");
      res.redirect("/");
    });
});

app.post("/atualizar", function (req, res) {
    var result = db
      .collection("pedidos")
      .doc(req.body.id)
      .update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        endereco: req.body.endereco,
        itens: JSON.parse(req.body.itens),
        observacao: req.body.observacao,
      })
      .then(function () {
        console.log("Updated document");
        res.redirect("/consulta");
      });
});

app.listen(8081, function () {
  console.log("Servidor ativo!");
});
