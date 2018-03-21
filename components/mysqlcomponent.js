var mysql = require('mysql');
var squel = require('squel');
var config = require('../config/config.js');

module.exports = {
    createdbconnection: function () {
        var connection = mysql.createConnection({
            host: config.mysqlconnection.host,
            user: config.mysqlconnection.user,
            password: config.mysqlconnection.password,
            database: config.mysqlconnection.database
        });
        return connection;
    },

    selectAllResultsRecords: function (connection) {
        var selectstatement = squel.select()
            .from("doe_schools")
            .join("doe_results", "dr", "dr.school_id = doe_schools.id")
            .toString();

        connection.query(selectstatement, function (err, rows) {
            if (err) throw err

            return rows
        })
    },

    selectResultsByYearRecords: function (connection, year) {
        var selectstatement = squel.select()
            .from("doe_schools")
            .join("doe_results", "dr", "dr.school_id = doe_schools.id")
            .where("dr.year = ?", year)
            .toString();

        connection.query(selectstatement, function (err, rows) {
            if (err) throw err

            return rows
        })
    },

    selectResultsBySchoolRecords: function (connection, name_of_school) {
        var selectstatement = squel.select()
            .from("doe_schools")
            .join("doe_results", "dr", "dr.school_id = doe_schools.id")
            .where("doe_schools.name = ?", name_of_school)
            .toString();

        connection.query(selectstatement, function (err, rows) {
            if (err) throw err

            return rows
        })
    },

    insertMatricResultRecord: function (connection, request) {
        var schoolInserted = this.insertSchool(connection, request);
        var resultsInserted = this.insertResults(connection, request);

        if(schoolInserted && resultsInserted)
        {
            return "Record created for school:" + request.name_of_school;
        }
    },

    insertSchool: function (connection, request) {
        var insertstatement = squel.insert()
            .into("doe_schools")
            .set("name", request.name_of_school)
            .set("emis", request.emis == 0 ? 0 : request.emis)
            .set("centre_number", request.centre_number)
            .toString()

        connection.query(insertstatement, function (err, rows) {
            if (err) throw err

            return true
        })
    },

    insertResults: function (connection, request) {
        var insertstatement = squel.insert()
            .into("doe_results")
            .set("year", request.year)
            .set("no_wrote", request.wrote)
            .set("no_passed", request.passed)
            .toString()

        connection.query(insertstatement, function (err, rows) {
            if (err) throw err

            return true
        })
    }
};