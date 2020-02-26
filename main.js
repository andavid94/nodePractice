/*
** This program submits get/post requests to a local Node server
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
    context.type = 'GET';

    response.render('get-data', context);
});

/*
** this function sends a POST request to the server
*/
app.post('/', function(req, response) {
    
    var bParams = [];
    for (var p in req.body) {
        bParams.push({'name': p, 'value': req.body[p]});
    }

    var context = {};
    context.bodyList = bParams;
    context.type = 'POST';

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

