const sqlconnection = require("./../services/dbConnection");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

function RegistrationModel(userData = {}) {
  return new Promise((resolve, reject) => {
    sqlconnection.query(
      `SELECT COUNT(email) as email FROM user WHERE email = ?`,
      [userData.email],
      (error, result) => {
        if (error) {
          reject(new ServerError(400, error.message, error));
        } else {
          if (result.every((data) => data.email === 0)) {
            bcrypt.hash(userData.password, saltRounds, function (err, hash) {
              if (err) {
                reject(new ServerError(400, error.message, error));
              }

              sqlconnection.query(
                `INSERT INTO user (name, email, password ) VALUES(?,?,?)`,
                [userData.userName, userData.email, hash],
                (error, result) => {
                  if (error) {
                    reject(new ServerError(400, error.message, error));
                  } else {
                    resolve({ message: "user has Registered Successfully" });
                  }
                }
              );
            });
          } else {
            reject(new ServerError(400, "User MailId already Existing", []));
          }
        }
      }
    );
  });
}

function loginAuthenticationModel(userData = {}) {
  return new Promise((resolve, reject) => {
    sqlconnection.query(
      `SELECT id, password FROM user WHERE email = ?`,
      [userData.email],
      (error, result) => {
        if (error) {
          reject(new ServerError(400, error.message, error));
        } else {
          if (result.length) {
            let { password: passwordHash, id } = result[0];

            bcrypt.compare(userData.password, passwordHash, function (err, result) {
              if (err || !result) {
                reject(new ServerError(400, "Provided Wrong Credentials", []));
              } else {
                resolve({ email: userData.email, userId: id });
              }
            });
          } else {
            reject(new ServerError(400, "Provided Wrong Credentials", []));
          }
        }
      }
    );
  });
}

function getUserDetailModel(userData = {}) {
  return new Promise((resolve, reject) => {
    sqlconnection.query(
      `SELECT name as userName , email FROM user WHERE email = ?`,
      [userData.email],
      (error, result) => {
        if (error) {
          reject(new ServerError(401, error, []));
        } else {
          resolve(result);
        }
      }
    );
  });
}

function addUserAddress(userAddress = {}) {
  const { user_id, name, phone, address, street, taluk, city, landMark } = userAddress;
  return new Promise((resolve, reject) => {
    sqlconnection.query(
      `INSERT INTO userAddress (user_id,name , phone, address, street, taluk , city ,landMark)
         VALUES (?, ? , ? , ?, ?, ?, ? , ?);`,
      [user_id, name, phone, address, street, taluk, city, landMark],
      (error, result) => {
        if (error) {
          reject(new ServerError(400, error, []));
        } else {
          resolve({ message: "new Address added successfully" });
        }
      }
    );
  });
}

const getUserAddressModel = (userData = {}) => {
  let { user_id } = userData;
  return new Promise((resolve, reject) => {
    sqlconnection.query(
      `SELECT id as addressId, HEX(isSelected) as isSelected , taluk ,street ,phone, name , landMark, city, address  FROM userAddress WHERE user_id = ?`,
      [user_id],
      (error, result) => {
        if (error) {
          reject(new ServerError(400, error, []));
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  RegistrationModel,
  loginAuthenticationModel,
  getUserDetailModel,
  addUserAddress,
  getUserAddressModel,
};
