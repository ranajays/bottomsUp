

module.exports.init = function (callback) {
  	var mongodb = require('mongodb');
	var databaseUrl = "mongodb://ranajays:ranajays@troup.mongohq.com:10078/app21902449"; // "username:password@example.com/mydb"
	var collections = ["drinks", "ingredients", "recipes"];
	var db = require("mongojs").connect(databaseUrl, collections);

	var sys = require('sys')
	var exec = require('child_process').exec;
	function puts(error, stdout, stderr) { sys.puts(stdout) }
};