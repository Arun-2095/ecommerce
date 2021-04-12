const Environment = require('dotenv').config({path:`${__dirname}/.env.${process.env.NODE_ENV}`})
const Express  = require('express');
const App = Express();
const Cors = require('cors');
const { ERROR } = require('./constant/appConstant')
const UserRoute = require('./router/userRouter');
require('./model/errorModel');
require('./services/dbConnection');

//var mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API, domain: process.env.MAILGUN_DOMAIN});
 
// var data = {
//   from: 'cakeoccasion <arunagiri2195@gmail.com>',
//   to: 'arun ,arunagiri2195@gmail.com',
//   subject: 'Hello',
//   text: 'Testing some Mailgun awesomeness!'
// };
 
// mailgun.messages().send(data, function (error, body) {
//   console.log(body, error,"Test");
// });

App.use(Express.json())


App.use(Cors())

App.use('/user', UserRoute)


// handling error 
App.use(function (req, res, next) {
  next(new ServerError(404, "page Not found", []))
})



// handling error 
App.use( (err, req, res, next)  =>res.status(err.status || 500 ).json({message:err.message || 'something Broken', data: err.data || []}))

App.listen(process.env.PORT, ()=> console.log(`Server started on ${process.env.PORT}`))


process.on('SIGINT', (code ,test) => {
    console.log(`\n ****Server shutdown on ${process.env.PORT}, DB closed ****`);
    process.exit(1);
  });


