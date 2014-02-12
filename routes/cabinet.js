
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
			var names =[];
			for (var i = 0; i < docs.length; i++) {
				names.push(docs[i].ingredient)
			}
			res.render('cabinet', {
				docs: docs,
				data: JSON.stringify(names)});
		}
	});
	// var $ = res.window.jQuery;
	// var availableTags = [
	// 				      "ActionScript",
	// 				      "AppleScript",
	// 				      "Asp",
	// 				      "BASIC",
	// 				      "C",
	// 				      "C++",
	// 				      "Clojure",
	// 				      "COBOL",
	// 				      "ColdFusion",
	// 				      "Erlang",
	// 				      "Fortran",
	// 				      "Groovy",
	// 				      "Haskell",
	// 				      "Java",
	// 				      "JavaScript",
	// 				      "Lisp",
	// 				      "Perl",
	// 				      "PHP",
	// 				      "Python",
	// 				      "Ruby",
	// 				      "Scala",
	// 				      "Scheme"
	// 				    ];
 //    $( "#add_ingredient" ).autocomplete({
 //      source: availableTags
 //    });
};
