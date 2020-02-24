var express = require("express");
var bodyParser = require("body-parser");                    //Needed for post
var app = express();
var handlebars = require("express-handlebars").create({defaultLayout: "main"});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 7122);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res)                             //The get request code
{
	var qParams = [];
	for (var p in req.query) 
    {
		qParams.push({"name": p, "value": req.query[p]});   //Pushes the value and the name into a table
	}
	var fill = {};
	fill.dataList = qParams;
	res.render("get", fill);                                //Displays the table
});

app.post("/", function(req, res)                            //Post request code
{
	var qParams = [];
	for (var p in req.query)
    {
		qParams.push({"name": p, "value": req.query[p]});   //Push all the paramters into the table (query and body)
	}
    var bParams = [];
	for (var b in req.body) 
    {
		bParams.push({"name": b, "value": req.body[b]});
	}
	var fill = {};
	fill.queryList = qParams;
    fill.bodyList = bParams;
	res.render("post", fill);                               //Display the table                   
});

app.use(function(req, res){
	res.status(404);
	res.render("404");
});

app.use(function(err, req, res, next){
	console.log(err.stack);
	res.status(500);
	res.render("500");
});

app.listen(app.get("port"), function(){
	console.log("Express started on port 7122");
});