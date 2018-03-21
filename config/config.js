module.exports = {

    mysqlconnection : {
        host: 'kurama',
        user: 'dbuser',
        password: 'dbadmin',
        database: 'department_of_education'
    },

    port : process.env.WEB_PORT || 5000,
};