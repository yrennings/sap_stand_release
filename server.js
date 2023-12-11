const express = require("express");
const rpio = require("rpio");

const app = express();

app.set('view engine', 'ejs')
app.use(express.static('static'));
app.use(express.urlencoded({ extended: false }))

const led13 = 13;
rpio.open(led13, rpio.OUTPUT);

const led9 = 9;
rpio.open(led9, rpio.OUTPUT);

const led6 = 6;
rpio.open(led6, rpio.OUTPUT);

app.get("/", (_req, res) => {
	res.render("index");
});

app.get("/procurement", (_req, res) => {
	res.render("procurement");
});

app.get("/studiengaenge", (_req, res) => {
	res.render("studiengaenge");
});

app.get("/on", (_req, res) => {
	// Code zum Einschalten der LED
	rpio.write(led13, rpio.HIGH);
	res.send("LED eingeschaltet");
});

app.get("/off", (_req, res) => {
	// Code zum Ausschalten der LED
	rpio.write(led13, rpio.LOW);
	res.send("LED ausgeschaltet");
});


app.get("/engine", (_req, res) => {
	// Code zum Einschalten der LED
	console.log("Engine")
	res.status(200).send("Motor dreht sich jetzt");  
});

app.listen(3000, () => {
	console.log("Der Arduino Server ist gestartet auf Port 3000");
});
