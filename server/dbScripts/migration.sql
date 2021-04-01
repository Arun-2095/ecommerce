CREATE DATABASE  IF NOT EXISTS shop;

USE shop;

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS user;
SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE user (id int PRIMARY KEY NOT NULL AUTO_INCREMENT, 
                   name VARCHAR(30), 
                   email VARCHAR(30), 
                   password VARCHAR(70), 
                   address VARCHAR(250));

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS catagory;
SET FOREIGN_KEY_CHECKS=1;


CREATE TABLE catagory (id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                       catagory_name VARCHAR(15));

DROP TABLE IF EXISTS product;

CREATE TABLE product (id int NOT NULL PRIMARY KEY,
                      product_name VARCHAR(30) ,
                      product_quantity DECIMAL(3,1),
                      product_price VARCHAR(30), 
                      catagory INT NOT NULL,  
                      FOREIGN KEY(catagory) REFERENCES catagory(id));


SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS deliveryStatus;
SET FOREIGN_KEY_CHECKS=1;


CREATE TABLE deliveryStatus (id int NOT NULL PRIMARY KEY,
                             status VARCHAR(15));

DROP TABLE IF EXISTS orders;

CREATE TABLE orders (id int NOT NULL PRIMARY KEY, 
                    user_id INT, 
                    price DECIMAL(5,1),
                    order_status INT, 
                    product_price VARCHAR(30), 
                    ordered_time DATETIME DEFAULT CURRENT_TIMESTAMP, 
                    delivered_time DATETIME, 
                    FOREIGN KEY(user_id) REFERENCES user(id),
                    FOREIGN KEY(order_status) REFERENCES deliveryStatus(id));

