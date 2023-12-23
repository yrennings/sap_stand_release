const express = require("express");
const Gpio = require("onoff").Gpio;

const { exec } = require('child_process');

const app = express();

app.set('view engine', 'ejs')
app.use(express.static('static'));
app.use(express.urlencoded({ extended: false }))

const let4 = new Gpio(4, 'out');
const let17 = new Gpio(17, 'out');
const let27 = new Gpio(27, 'out');
const let22 = new Gpio(22, 'out');
const let23 = new Gpio(23, 'out');

const setServoArray = (arr) => {
        let17.writeSync(arr[0]);
        let27.writeSync(arr[1]);
        let22.writeSync(arr[2]);
        let23.writeSync(arr[3]);
}

const stepSequence = [
        [1,0,0,0],
        [1,1,0,0],
        [0,1,0,0],
        [0,1,1,0],
        [0,0,1,0],
        [0,0,1,1],
        [0,0,0,1],
        [1,0,0,1],
];


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
        // Code zum Einschalten der LED rpio.write(let4, rpio.HIGH);
        let4.writeSync(1);
        res.send("eingeschaltet");
});

app.get("/off", (_req, res) => {
        // Code zum Ausschalten der LED
        let4.writeSync(0);
        res.send("ausgeschaltet");
});


app.get("/enginefwd", (_req, res) => {
        stepperDir = 1;
        res.status(200).send("Motor dreht sich jetzt");
});

app.get("/enginebwd", (_req, res) => {

        stepperDir = -1;
        res.status(200).send("Motor dreht sich jetzt");
});

app.get("/enginestp", (_req, res) => {

        stepperDir = 0;
        res.status(200).send("Motor dreht sich jetzt");
});


app.get("/pull", (_req, res) => {
        var yourscript = exec('sh pull.sh',
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });

        res.status(200).send("Pulling code");
});

app.listen(3000, () => {
        console.log("Der Arduino Server ist gestartet auf Port 3000");
});

var stepCount = 0;
var stepperDir = 0;
const stepMotorForward = () => {
        stepCount = stepCount + 1
        if (stepCount > 7) {
                stepCount = 0;
        }
        setServoArray(stepSequence[stepCount]);
}

const stepMotorBackward = () => {
        stepCount = stepCount - 1
        if (stepCount < 0) {
                stepCount = 7;
        }
        setServoArray(stepSequence[stepCount]);
}

const updateStepper = () => {
        if (stepperDir == -1) stepMotorBackward();
        if (stepperDir == 1) stepMotorForward();
        if (stepperDir == 0) resetStepper();
}

const resetStepper = () => setServoArray([0,0,0,0]);

setInterval(updateStepper, 1);
