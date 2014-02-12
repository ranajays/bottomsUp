

module.exports.init = function (callback) {
  	var mongodb = require('mongodb');
	var databaseUrl = "mydb"; // "username:password@example.com/mydb"
	var collections = ["drinks", "ingredients", "recipes"];
	var db = require("mongojs").connect(databaseUrl, collections);

	var sys = require('sys')
	var exec = require('child_process').exec;
	function puts(error, stdout, stderr) { sys.puts(stdout) }

	db.drinks.drop(function () {
		exec("mongoimport -d mydb -c drinks --type csv --file databases/drinks.csv --headerline", puts);
	});
	db.ingredients.drop(function () {
		exec("mongoimport -d mydb -c ingredients --type csv --file databases/ingredients.csv --headerline", puts);
	});
	db.recipes.drop(function () {
		exec("mongoimport -d mydb -c recipes --type csv --file databases/recipes.csv --headerline", puts);
	});
};