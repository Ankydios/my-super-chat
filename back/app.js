const express = require("express"); //import de la bibliothèque Express
const app = express(); //instanciation d'une application Express
let cnt = 0;
let allMsgs = [
  { msg: "Hello World", username: "Anky", date: "10-10-2021" },
  { msg: "Blah Blah", username: "Anky", date: "10-10-2021" },
  { msg: "I love cats", username: "Clarinouche", date: "10-11-2021" },
];
// Pour s'assurer que l'on peut faire des appels AJAX au serveur
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Ici faut faire faire quelque chose à notre app...
// On va mettre les "routes"  == les requêtes HTTP acceptéés par notre application.

// Routes de test

app.get("/", function (req, res) {
  res.send("Hello");
});

app.get("/test/*", function (req, res) {
  res.json(["Hello", "World"]);
});

// Routes pour le compteur

app.get("/cpt/inc", function (req, res) {
  const v = parseInt(req.query?.v || 1);
  if (isNaN(v)) {
    return res.json({ code: -1 });
  }
  else {
    cnt++;
  }
  res.json({ code: 0 });
});

app.get("/cpt/query", function (req, res) {
  res.json({ count: cnt });
});

// Routes pour le chat

app.get("/msg/get/:id", function (req, res) {
  const id = parseInt(req.params?.id);
  if (isNaN(id) || id >= allMsgs.length || id < 0) {
    return res.json({ code: 1 });
  }
  res.json({ code: 0, msg: allMsgs[id] });
});

app.get("/msg/nber", function (req, res) {
  res.json({ code: 0, nber: allMsgs.length });
});

app.get("/msg/getAll", function (req, res) {
  res.json({ code: 0, msgs: allMsgs });
});

app.get("/msg/post/:msg", function (req, res) {
  const username = (req.query?.username || "Anonyme");

  let msg = req.params.msg;
  allMsgs.push({msg: unescape(msg), username: username, date: new Date().toISOString().replace(/(\d{4})-(\d{2})-(\d{2})T.*/, '$3-$2-$1')});
  res.json({ code: 0, msgId: allMsgs.length - 1 });
});

app.get("/msg/delete/:id", function (req, res) {
  const id = parseInt(req.params?.id);
  if (isNaN(id) || id >= allMsgs.length || id < 0) {
    return res.json({ code: 1 });
  }
  allMsgs.splice(id, 1);
  res.json({ code: 0 });
});

app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");
