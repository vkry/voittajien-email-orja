const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

//EXPRESSJS SETUP
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



//NODEMAILER TRANSPORTER OBJECT SETUP
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'evaninemailorja@gmail.com',
        pass: 'abeAG123'
    }
});

function buildJasenHakemusString(data){
    var email = "Uusi jäsenhakemus tullut:\n";
    email += "\nEtunimi: " + data.firstname;
    email += "\nSukunimi: " + data.lastname;
    email += "\nOsoite: " + data.address;
    email += "\nSyntymäaika: " + data.birthday;
    email += "\nEmail: " + data.email;
    email += "\nPuh: " + data.phone;
    email += "\nVanhemman puh " + data.parentphone;
    email += "\nMuuta: " + data.details;
    return email;
}

//NEW MEMBERSHIP - POST REQUEST
app.post('/jasenhakemus', function(req, res){
    var mailOptions = {
        from: 'miller',
        to: 'voittamisenkulttuuriry@outlook.com',
        subject: 'Uusi Jäsenhakemus',
        text: buildJasenHakemusString(req.body)
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Kiitos! Hakemuksesi on vastaanotettu.');
});

function buildSplitlonIlmoString(data) {
    var email = "Uusi Splitlon ilmoittautuminen tullut:\n";
    email += "\nEtunimi: " + data.firstname;
    email += "\nSukunimi: " + data.lastname;
    email += "\nOsoite: " + data.address;
    email += "\nSyntymäaika: " + data.birthday;
    email += "\nEmail: " + data.email;
    email += "\nPuh: " + data.phone;
    email += "\nPelin taso: " + data.levelOfPlay;
    return email;
}

//TEMPORARY SIGNUP - POST REQUEST
app.post('/splitlonIlmo', function(req, res){
    var mailOptions = {
        from: 'miller',
        to: 'voittamisenkulttuuriry@outlook.com',
        subject: 'Splitlon ilmo',
        text: buildSplitlonIlmoString(req.body)
    };


    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Kiitos! Ilmoittautumisesi on vastaanotettu.');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${ PORT }`));


