const express = require("express");

const app = express();

app.set('view engine', 'ejs')
app.use(express.static('static'));
app.use(express.urlencoded({ extended: false }))

app.get("/", (req,res) => {
  res.render("index");
});

app.get("/procurement", (req,res) => {
  res.render("procurement");
});

app.get("/studiengaenge", (req,res) => {
  res.render("studiengaenge");
});

app.listen(3000, () => {
  console.log("Der Arduino Server ist gestartet auf Port 3000");
  });
