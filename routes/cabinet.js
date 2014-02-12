
/*
 * GET home page.
 */

exports.view = function(req, res){
	var mongodb = require('mongodb');
	var databaseUrl = "ranajays:ranajays@troup.mongohq.com:10078/app21902449"; // "username:password@example.com/mydb"
	var collections = ["drinks", "ingredients", "recipes"];
	var db = require("mongojs").connect(databaseUrl, collections);
	db.ingredients.find({}, {}, function(err,docs) {
		if (err) {
			console.log("error:" + err);
		}
		else {
			res.render('cabinet', docs);
		}
	});
};
