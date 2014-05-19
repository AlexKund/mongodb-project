// set up ========================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');

// configuration =================
mongoose.connect('mongodb://AlexKund:praseskitara35@novus.modulusmongo.net:27017/Nu2noguw');

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(logger('dev')); // log every request to the console
app.use(bodyParser()); // pull information from html in POST

// define model =================
var Todo = mongoose.model('Todo', {
	text: String
});

// routes ======================================================================
// api ---------------------------------------------------------------------
// get all todos
app.get('/api/todos', function(req,res){
	Todo.find(function(err,todos){
		if(err)
			res.send(err);
		res.json(todos);
	})
});

app.post('/api/todos', function(req, res) {

	// create a todo, information comes from AJAX request from Angular
	Todo.create({
		text : req.body.text,
		done : false
	}, function(err, todo) {
		if (err)
			res.send(err);

		// get and return all the todos after you create another
		Todo.find(function(err, todos) {
			if (err)
				res.send(err)
			res.json(todos);
		});
	});

});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
	Todo.remove({
		_id : req.params.todo_id
	}, function(err, todo) {
		if (err)
			res.send(err);

		// get and return all the todos after you create another
		Todo.find(function(err, todos) {
			if (err)
				res.send(err)
			res.json(todos);
		});
	});
});
// application -------------------------------------------------------------
app.get('*', function(req,res){
	res.sendfile('.public/index.html');
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log('App listening on port 8080');

