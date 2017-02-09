const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8081;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, resp, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log' , log + "\n", (err) => {
        if(err){
            console.log("Problemer med å skrive til logg");
        }
    });
        next();
    
});

// app.use((req, res, next) => {
//      res.render('maintenance.hbs', {
//      pageTitle: "maintenance",
//      maintenanceMessage: "This site is under maintenance"
//      });
//  });

app.get('/', (req, res) => {
    
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});
    res.render('welcome.hbs',{
        pageTitle: "Velkommen",
        velkomsttekst: "Velkommen"
    });
});

app.get("/about", (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
    
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "Noe gikk galt"
    });
});


 

app.listen(port, () => {
    console.log(`Serveren startet på port ${port}`);
}); 