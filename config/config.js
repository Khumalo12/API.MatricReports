module.exports = {

    mysqlconnection : {
        host: 'kurama:3306',
        user: 'dbuser',
        password: 'dbadmin',
        database: 'department_of_education'
    },

    port : process.env.WEB_PORT || 3000,
};