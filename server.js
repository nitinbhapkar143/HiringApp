var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var port = process.env.PORT || 4000;

var applicant = require('./app/routes/applicant')();

// Just some options for the db connection
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } }; 

mongoose.connect('mongodb://localhost/Darwinbox', options);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

// Log with Morgan
app.use(morgan('dev'));

// parse application/json and look for raw text                                   
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

// Static files
app.use(express.static(__dirname + '/public')); 
app.route('/')
	.get(function(req, res){
		res.sendFile(path.resolve(__dirname + 'public/index.html'));
	});
app.route('/applicant')
    .post(applicant.post)
    .get(applicant.getAll);
app.route('/applicant/:id')
    .get(applicant.getOne);
app.route('/nextapplicant/:id')
    .get(applicant.getNext);
app.route('/prevapplicant/:id')
    .get(applicant.getPrev);
app.route('/updateStatus/:id')
    .put(applicant.updateStatus);


app.listen(port, function(){
	console.log('listening on http://localhost:' + port);
});

