//database is a container to perform data related task ie CRUD(cread,read,update and delete)

//the way of working with database is database management sysytem(DBMS)
//there are two types of DBMS
// 1. relational database MS
// 2. distributed databse  MS


//commands in database Mongodb
// show dbs ----> shows all the databases
// use <db_name>---->create db or use the existing database if it is present
// db--->show which db is open
// show collections---> show the collectons inside the database

//CRUD work>>>> create,read,update and delete data in database
//inserting data
// db.<collection_name>.insert({"name":"Rahul","address":"NewYork"})--->inserting data in  collection of that database

//Reading data from database
// db.<collection_name>.find({})---->show all the data inside collection
// db.<collection_name>.find({}).pretty()---> show data in prettier way .more readable way
// db.<collection_name>.find({}).other helper query (eg ->sort(),limit(),skip(),etc).

//Update 
//db.<collection_name>.update({},{},{})
//1st object is query builder.-> like {"key":"value"} to find which to update.
// 2nd obj must have $set of key and value is object(data) that needs to be updated.
// eg -> {$set:{"Key":"value"}}
// 3rd object holds options and is optional.eg -> {multi:true,upsert:true}


//deleting 
//db.<coolection_name>.remove({query builder}) ---> Note ! ! ! -->query builder must not be empty otherwise it will remove all the data inside the collections.
//db.<collection_name>.drop()---> delete the collection
//db.dropDatabase()--> delete the database


//############################BackUp and Restore##########################
// In two 2 Formate
/*
    Machine Readable
            Human Readble
BSON Format And (JSON and CSV)---> BSON -machine readable whereas JSON and CSV are human readable
1. BSON
command for BSON
mongodump-->It will backup entire database on default dump folder

            */

