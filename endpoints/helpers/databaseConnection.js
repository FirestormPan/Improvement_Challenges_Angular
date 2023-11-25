const mariadb = require('mariadb');

const pool = mariadb.createPool({
    // host: 'db',
    host: 'localhost',
    // host: 'expressapiwmariadb_docker-db-1',
    // host: '172.21.0.3',
    // host: '127.0.0.1',
    port: 3306,
    user: "root",
    // password: "example",
    password: "aveMaria69",
    database: "improvement_dares",
    multipleStatements: true,
    connectionLimit:15,
    idleTimeout: 5000
})


//connect and check for errors
pool.getConnection((err, connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('lost connection to database')
        }
        if(err.code === 'ECONNREFUSED'){
            console.log('database connection was denied')
        }
    }
    if(connection) connection.release();
})

module.exports=pool;


// FROM: https://mariadb.com/resources/blog/getting-started-with-connector-node-js/
// // Expose a method to establish connection with MariaDB SkySQL
// module.exports = Object.freeze({
//     pool: pool
//   });


