CREATE DATABASE  IF NOT EXISTS shop;

USE shop;

SET GLOBAL sql_mode = '';
--  User Type

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS userType;
SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE userType (id TINYINT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
                   user_type VARCHAR(30));

INSERT INTO userType (user_type) VALUES ('admin'),('user');                   

--  User Table

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS user;
SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE user (id int PRIMARY KEY NOT NULL AUTO_INCREMENT, 
                   name VARCHAR(30), 
                   email VARCHAR(30), 
                   password VARCHAR(70), 
                   user_type TINYINT NOT NULL DEFAULT 2,
                   address VARCHAR(250),
                   FOREIGN KEY(user_type) REFERENCES userType(id));


-- catagory-table

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS catagory;
SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE catagory (id TINYINT(3) NOT NULL PRIMARY KEY AUTO_INCREMENT,
                       catagory_name VARCHAR(15));

INSERT INTO catagory (catagory_name) VALUES ('cake'),('cupcake'),('brownie');



-- product Table
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS product;
SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE product (id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                      product_name VARCHAR(30),
                      product_quantity DECIMAL(2,1),
                      product_price DECIMAL(6,2), 
                      catagory TINYINT(3) NOT NULL,  
                      FOREIGN KEY(catagory) REFERENCES catagory(id));

INSERT INTO product (product_name, product_quantity,product_price,catagory) VALUES ('Plain Cake', 0.5, 125, 1),('Plain Cake', 1, 200, 1),
 ('Black Forest', 0.5, 250, 1),('Black Forest', 1, 475, 1),('White Forest', 0.5, 250, 1),('White Forest', 1, 475, 1),('Choco Truffle', 0.5, 350, 1),('Choco Truffle', 1, 675, 1),
 ('Vennila Truffle', 0.5, 300, 1),('Vennila Truffle', 1, 575, 1),('Choco Vennila', 0.5, 400, 1),('Choco Vennila', 1, 775, 1),('Red Velvet', 0.5, 500, 1),
 ('Red Velvet', 1, 975, 1),('Butter Scotch', 0.5, 350, 1),('Butter Scotch', 1, 675, 1),
 ('Frosted Cupcake', 4, 100 , 2);




SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS deliveryStatus;
SET FOREIGN_KEY_CHECKS=1;

-- DeliveryStatus Table

CREATE TABLE deliveryStatus (id TINYINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                             delivery_status VARCHAR(25));

INSERT INTO deliveryStatus (delivery_status) VALUES ('waitingForConfirmation'),('accepted'),('onProgress'),('dispatched'),('declined'),('cancelled');


-- Invoice Table
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS invoice;
SET FOREIGN_KEY_CHECKS=1;


CREATE TABLE invoice (id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
                    user_id INT, 
                    order_status TINYINT NOT NULL DEFAULT 1, 
                    ordered_time DATETIME DEFAULT CURRENT_TIMESTAMP, 
                    delivered_time DATETIME, 
                    FOREIGN KEY(user_id) REFERENCES user(id),
                    FOREIGN KEY(order_status) REFERENCES deliveryStatus(id));


-- Order Table
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS userOrder;
SET FOREIGN_KEY_CHECKS=1;


CREATE TABLE userOrder (id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
                    user_id INT,
                    product_id INT,
                    invoice_id INT, 
                    selected_quantity TINYINT,
                    FOREIGN KEY(user_id) REFERENCES user(id),
                    FOREIGN KEY(product_id) REFERENCES product(id),
                    FOREIGN KEY(invoice_id) REFERENCES invoice(id));


-- Cart Table
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS cart;
SET FOREIGN_KEY_CHECKS=1;


CREATE TABLE cart (id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
                    user_id INT NOT NULL, 
                    ordered_time DATETIME DEFAULT CURRENT_TIMESTAMP, 
                    FOREIGN KEY(user_id) REFERENCES user(id));


-- cart-items
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS cartItems;
SET FOREIGN_KEY_CHECKS=1;


CREATE TABLE cartItems (id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
                    user_id INT,
                    product_id INT,  
                    cart_id INT, 
                    selected_quantity TINYINT,
                    FOREIGN KEY(user_id) REFERENCES user(id),
                    FOREIGN KEY(product_id) REFERENCES product(id),
                    FOREIGN KEY(cart_id) REFERENCES cart(id));
