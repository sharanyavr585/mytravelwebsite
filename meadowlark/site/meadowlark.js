var express = require('express');
var fortune = require('./lib/fortune.js');

var app = express();

// set up handlebars view engine

var handlebars = require('express-handlebars')
				.create({ defaultLayout : 'main'});
		app.engine('handlebars',handlebars.engine);
		app.set('view engine','handlebars');


app.set('port', process.env.PORT||3000);

app.use(express.static(__dirname + '/public'));

//Middleware to ensure that mocha page tester runs only on production environment
app.use(function(req,res,next){
	res.locals.showTests = app.get('env') !='production' &&
	req.query.test == '1';
	next();
});

app.get('/',function(req,res){
	//res.type('text/plain');
	//res.send('Meadowlark Travel');
	res.render('home');
});

//random fortunes for about page

/*var fortunes=[
"Conquer your fears or they will conquer you",
"Rivers need springs",
"Do not fear what you dont know",
"You will have a pleasant surprise",
"Whenever possible, keep it simple"

];*/

app.get('/about',function(req,res){
	//res.type('text/plain');
	//res.send('About Meadowlark Travel');
	//var randomfortune = fortunes[Math.floor(Math.random()*fortunes.length)];
	res.render('about',{fortune:fortune.getFortune()});
});

//custom 404 page

app.use(function(req,res,next){
	//res.type('text/plain');
	res.status(404);
	//res.send('404 - Not found');
	res.render('404');
});

//custom 500 page(middleware)
app.use(function(err,req,res,next){
	console.error(err.stack);
	res.status(500);
	//res.send('500 - Server Error');
	res.render('500');
});
app.listen(app.get('port'),function(){
	console.log('Express started on http://locahost:' +
		app.get('port') + '; press ctrl-c to terminate.');
});