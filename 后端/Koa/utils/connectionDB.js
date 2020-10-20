const mysql = require('mysql');
const { db_config } = require('./config');
const pool = mysql.createPool({
  host: db_config.host,
  user: db_config.user,
  port: db_config.port,
  password: db_config.password,
  database: db_config.database
});


function execDB(sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(error, connection) {
            if (error) {
              reject( error )
            } 
            connection.query(sql, (error, results) => {
              if (error) {
                reject(error);
              } 
              resolve(results);
              connection.release();
            });
        });
    });
}
  

module.exports = execDB;