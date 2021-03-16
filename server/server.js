const Environment = require('dotenv').config({path:`${__dirname}/.env.${process.env.NODE_ENV}`})
const Express  = require('express');
const FileSystem = require('fs');
const App = Express();
const { ERROR } = require('./constant/appConstant')
const UserRoute = require('./router/userRouter');
const connection = require('./services/dbConnection')


App.use(Express.json())

App.use('/user', UserRoute)

// handling error 
App.use(function (err, req, res, next) {
    
    console.log(err, "ERROR")
    if(err.error ===ERROR.AUTH ){
        res.status(400).json({message:err.message})
    }else{
       res.status(500).json({message:'Something broke!'})
    }
  })

App.listen(process.env.PORT, ()=>{
    console.log(`Server started on ${process.env.PORT}`)
})


if(process.env.DB_MIGRATION === 'TRUE') {

  let createTableQueries = FileSystem.readFileSync('./dbScripts/migration.sql').toString();

  connection.query(createTableQueries, (error, result)=>{
 
    if(error){
       throw error; 
    }

    console.log( 'database  Tables are migrated' )

  })

} 