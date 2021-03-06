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

function buildJasenHakemusString(data) {
    var email = "Uusi j&auml;senhakemus tullut:\n";
    email += "\nEtunimi: " + data.firstname;
    email += "\nSukunimi: " + data.lastname;
    email += "\nOsoite: " + data.address;
    email += "\nSyntym&auml;aika: " + data.birthday;
    email += "\nEmail: " + data.email;
    email += "\nPuh: " + data.phone;
    email += "\nVanhemman puh: " + data.parentphone;
    email += "\nMuuta: " + data.details;
    return email;
}

//NEW MEMBERSHIP - POST REQUEST
app.post('/jasenhakemus', function (req, res) {
    var mailOptions = {
        from: 'miller',
        to: 'voittamisenkulttuuriry@outlook.com',
        subject: 'Uusi J&auml;senhakemus',
        text: buildJasenHakemusString(req.body)
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Kiitos! Hakemuksesi on vastaanotettu.');
});

function buildYhteydenottoString(data) {
    var email = "";
    email += "Suora yhteydenotto kotisivuilta."
    email += "\nLähettäjä: " + data.name;
    email += "\nLähettäjän email: " + data.email;
    email += "\nAsia:\n" + data.details;
    return email;
}

app.post('/yhteydenotto', function (req, res) {
    var mailOptions = {
        from: 'miller',
        to: 'voittamisenkulttuuriry@outlook.com',
        subject: 'Yhteydenotto',
        text: buildYhteydenottoString(req.body)
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.writeHead(200, {'Content-Type': 'text/html', });
    res.end('Kiitos viestist&auml;si, olemme vastaanottaneet sen.' +
        '<br>K&auml;sittelemme viestit kerran viikossa, jos asia on kiireellinen niin laitathan tekstiviestin tai soitat.' +
        '<br>' +
        '<br>' +
        'Hallituksen puheenjohtaja: Ilkka Lehtinen 0400 355 201<br>' +
        'Sihteeri: Hannu Aro 050 3289319<br>' +
        'Rahastonhoitaja: Mari Lehtonen 050 5678 719');
});

function buildLoscabaIlmoString(data) {
    var email = "Uusi Splitlon ilmoittautuminen tullut:\n";
    email += "\nEtunimi: " + data.firstname;
    email += "\nSukunimi: " + data.lastname;
    email += "\nOsoite: " + data.address;
    email += "\nSyntym&auml;aika: " + data.birthday;
    email += "\nEmail: " + data.email;
    email += "\nPuh: " + data.phone;
    email += "\nLuokka: " + data.category;
    email += "\nMuuta: " + data.other;
    return email;
}

//TEMPORARY SIGNUP - POST REQUEST
app.post('/loscabaIlmo', function (req, res) {
    var mailOptions = {
        from: 'miller',
        to: 'voittamisenkulttuuriry@outlook.com',
        subject: 'Spring loscaba ilmo',
        text: buildLoscabaIlmoString(req.body)
    };


    transporter.sendMail(mailOptions, function (error, info) {
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


