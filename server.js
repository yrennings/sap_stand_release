const five = require("johnny-five");
const { Stepper } = require("johnny-five");
const express = require("express");

const app = express();
const board = new five.Board({ port: 'COM7' });

app.set('view engine', 'ejs')
app.use(express.static('static'));
app.use(express.urlencoded({ extended: false }))

var led13 = null;
var led9 = null;
var led6 = null;

app.get("/", (req,res) => {
  res.render("index");
});

app.get("/procurement", (req,res) => {
  res.render("procurement");
});

app.get("/studiengaenge", (req,res) => {
  res.render("studiengaenge");
});

app.get("/on", (req, res) => {
    // Code zum Einschalten der LED
    led13.on();
    res.send("LED eingeschaltet");
  });
  
app.get("/off", (req, res) => {
  // Code zum Ausschalten der LED
  led13.off();
  res.send("LED ausgeschaltet");
});

app.get("/loop", (req, res) => {
  // Code zum Ausschalten der LED
  led13.blink(250);
  led9.blink(250)
  led6.blink(250)
  res.send("LED blinkt");
});

app.get("/loopoff", (req, res) => {
  // Code zum Ausschalten der LED
  led13.stop().off();
  led9.stop().off();
  led6.stop().off();
  res.send("LED blinkt nicht mehr");
});

app.get("/engine", (req, res) => {
    // Code zum Einschalten der LED
    var led = new five.Led(2);
    led.on();
    led.off();
    console.log("Engine")
    res.status(200).send("Motor dreht sich jetzt");  
});

board.on('error', (err) => {
  console.error('Fehler beim Verbinden zum Board:', err);
});

board.on('ready', () => {
      console.log('Das Board ist bereit.');
      led13 = new five.Led(13);
      led9 = new five.Led(9);
      led6 = new five.Led(6);
      led13.on();
      led13.off();
      led9.on();
      led9.off();
      led6.on();
      led6.off();
      // Starte den Server
    app.listen(3000, () => {
    console.log("Der Arduino Server ist gestartet auf Port 3000");
    });
});

app.listen(3000, () => {
  console.log("Der Arduino Server ist gestartet auf Port 3000");
  });
