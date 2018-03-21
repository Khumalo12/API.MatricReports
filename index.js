var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/config.js');
var mysqlconnection = require('./components/mysqlcomponent.js');

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var connection = mysqlconnection.createdbconnection();
var validationIssues = [];

app.get('/api/matricresults', function (req, res) {
    var results = mysqlconnection.selectAllResultsRecords(connection);
    res.json(results);
})

app.get('/api/matricresults/:year', function (req, res) {
    var results = mysqlconnection.selectResultsByYearRecords(connection);
    res.json(results);
})

app.get('/api/matricresults/:school', function (req, res) {
    var results = mysqlconnection.selectResultsBySchoolRecords(connection);
    res.json(results);
})

app.post('/api/matricresults/', function (req, res) {
    if (!req.body.name_of_school) {
        validationIssues.push("Name of school required");
    }

    if (!req.body.centre_no) {
        validationIssues.push("Centre number required");
    }
    else {
        var results = mysqlconnection.insertMatricResultRecord(connection, request);
        res.json(results);
    }
})

app.listen(config.port);