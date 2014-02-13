
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
// var fs = require('fs');

var index = require('./routes/index');
var cabinet = require('./routes/cabinet');
var makeDrinks = require('./routes/makeDrinks');
var recipe = require('./routes/recipe');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/cabinet', cabinet.view);
app.get('/makeDrinks', makeDrinks.view);
app.get('/recipe', recipe.viewRecipe);
// Example route
// app.get('/users', user.list);


// mongo = require('./initdb.js');

// mongo.init(function(error) {
// 	if (error) {
// 		throw error;
// 	}
// });

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



// var file = "databases/current.db";
// var exists = fs.existsSync(file);

// if(!exists) {
//   console.log("Creating DB file.");
//   fs.openSync(file, "w");
// }

// var sqlite = require("node-sqlite-purejs");
// var db = sqlite.open('./databases/test.db', {}, function(err,db) {
// 	if (err) {
// 		console.log(err);
// 	}
// 	else {
// 		db.exec("SELECT * from Ingredients;", function(err,results){
// 		if (err) {
// 			console.log(err);
// 		}
// 		else {
// 			console.log(results);
// 		};
// })
// 	}

// });
// console.log(db)
