/*
** This program 
*/
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var handlebars = require("express-handlebars").create({defaultLayout: "main"});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 4095);

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

/*
** this function send a GET request to the server
*/
app.get('/', function(req, response) {
    
    var qParams = [];
    var context = {};
    for (var p in req.query) {
        qParams.push({'name': p, 'value': req.query[p]});
    }
    context.dataList = qParams;

    response.render('get-data', context);
});

/*
** this function sends a POST request to the server
*/
app.post('/', function(req, response) {
    
    var qParams = [];
    for (var p in req.body) {
        qParams.push({'name': p, 'value': req.body[p]});
    }
    
    /*var bodyList = [];
    for (var p in req.body) {
        bodyList.push({'name': p, 'value': req.body[p]});
    }*/

    var context = {};
    context.dataList = qParams;
    //context.bodyList = bodyList;

    response.render('post-data', context);
});

app.use(function(req, response) {
    response.type('text/plain');
    response.status(404);
    response.send('404 - Page Not Found');
});

app.use(function(err, req, response, next) {
    console.error(err.stack);
    response.type('text/plain');
    response.status(500);
    response.send('500 - Server Error');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port'));
});

