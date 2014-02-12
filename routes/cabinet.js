
/*
 * GET home page.
 */

exports.view = function(req, res){
	var mongodb = require('mongodb');
	var databaseUrl = "mydb"; // "username:password@example.com/mydb"
	var collections = ["drinks", "ingredients", "recipes"];
	var db = require("mongojs").connect(databaseUrl, collections);
	db.ingredients.find({}, {}, function(err,docs) {
		console.log("error:" + err)
		console.log(docs);
		console.log(docs.length);
		for (var i=0; i < docs.length; i++) {
			console.log(docs[i].ingredient);
		}
		res.render('cabinet', docs);
	});
};
