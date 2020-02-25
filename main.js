
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var handlebars = require("express-handlebars").create({defaultLayout: "main"});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 4095);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())

app.get('/', function(req, response) {
    var qParams = [];
    
    for (var p in req.query) {
        //qParams += "The name is: " + p + " and the value is: " + req.query[p] + ", "; 
    
        qParams.push({"The name is: ": p, " and the value is: ": req.query[p]});
    }

    //qParams = qParams.substring(0, qParams.lastIndexOf(','));
    //qParams += '.';
    var context = {};
    context.dataList = qParams;

    response.render('get', context);
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
})

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port'));
});

