var mysql      = require('mysql2');
const FileSystem = require('fs');

var connection = mysql.createPool({
  host     : process.env.DB_HOSTNAME,
  user     : process.env.DB_USERNAME,
  database : process.env.DB_NAME,
  password : process.env.DB_PASSWORD,
  multipleStatements:true,
  connectionLimit:1
});
 

connection.getConnection(function(err,connect) {
  if (err) {
    console.error('error connecting: ' + JSON.stringify(err), err.sqlMessage);
    return;
  }
  connect.release()
  console.log('db connected successfully');
});



if(process.env.DB_MIGRATION === 'TRUE') {

  let createTableQueries = FileSystem.readFileSync('./dbScripts/migration.sql').toString();

  connection.query(createTableQueries, (error, result)=>{
 
    if(error){
       throw error; 
    }

    console.log( 'database  Tables are migrated' )

  })

} 


module.exports = connection