const sqlconnection =  require('./../services/dbConnection')
const bcrypt = require('bcrypt');
const { func } = require('joi');

const saltRounds = 10;



function RegistrationModel(userData ={}) {
    


  return   new Promise((resolve, reject)=> {
        

        sqlconnection.query(`SELECT COUNT(email) as email FROM user WHERE email = '${userData.email}'`, (error, result)=>{

            if(error){
                reject(new ServerError(400, error.message ,  error))
            } else {

                if(result.every(data => data.email === 0)){
                   
                    bcrypt.hash(userData.password, saltRounds , function(err, hash){

                        if(err){
                            reject(new ServerError(400, error.message ,  error))
                        }
                        
                        sqlconnection.query(`INSERT INTO user (name, email, password ) VALUES('${userData.userName}','${userData.email}','${hash}')`, (error, result)=>{ 
                            if(error){
                                reject(new ServerError(400, error.message ,  error))
                            }else{
                                   
                                resolve({message:"user has Registered Successfully"})
    
                            }
                        })


                    } )

                }else{
                    reject( new ServerError(400, "User MailId already Existing", []))
                }
            }
          
        })
        
    })
    

}


function loginAuthenticationModel(userData ={}) {
    

    return   new Promise((resolve, reject)=> {
            
          sqlconnection.query(`SELECT name as username, password FROM user WHERE email = '${userData.email}'`, (error, result)=>{
  

              if(error){
                  reject(new ServerError(400, error.message ,  error))
              } else {
  
                if(result.length) {

                        let {  username  ,password:passwordHash} = result[0]

                    bcrypt.compare(userData.password, passwordHash, function(err, result) {
                        
                        if(err || !result){
                            reject(new ServerError(400, 'Provided Wrong Credentials' ,  []))
                         }else{    
                            resolve({ name: username })
                         } 
                    });

                }else{ 

                    reject(new ServerError(400, "Provided Wrong Credentials" , []))
                }

              }
            
          })
          
      })

  }


module.exports = {RegistrationModel,loginAuthenticationModel}