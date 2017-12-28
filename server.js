const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

//EXPRESSJS SETUP
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



//NODEMAILER TRIVIAL SETUP
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'emiller.arkko@gmail.com',
        pass: 'rogerfederer1'
    }
});



/*transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});*/
//NODEMAILER LOGIC END

app.post('/jasenhakemus', function(req, res){
    var mailOptions = {
        from: 'miller',
        to: 'emiller.arkko@gmail.com',
        subject: 'Jäsenhakemus',
        text: 'Uusi jäsenhakemus tullut:\n' + JSON.stringify(req.body)
    };

    let errorstring = "there is error";

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            errorstring = 'there is no error';
            console.log('Email sent: ' + info.response);
        }
    });

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Kiitos! Hakemuksesi on vastaanotettu.' + errorstring);
});

app.post('/splitlonIlmo', function(req, res){
    var mailOptions = {
        from: 'miller',
        to: 'emiller.arkko@gmail.com',
        subject: 'Splitlon ilmo',
        text: 'Uusi Splitlon ilmoittautuminen:\n' + JSON.stringify(req.body)
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${ PORT }`));


