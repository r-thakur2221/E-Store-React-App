const express = require('express')
const router = express.Router();
const UserModel = require('./../models/userModel');
const dataEntry = require('./../helpers/dataEntry');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const jwtSecretKey=require('./../configs/index')


function createToken(data) {
    let token = jwt.sign({ id: data._id}, jwtSecretKey.jwtSecretKey)
    return token;
}
//Database connection for learning
// const dbConfigs = require('./../configs/dbconfigs');
// const MongoClient = dbConfigs.MongoClient;       /*  these
// const connectionURL = dbConfigs.connectionURL            are  
// const dbName = dbConfigs.dbName                            oldways
// const colName=dbConfigs.colName                                     */

// function connect(cb) {
//     dbConfigs.MongoClient.connect(dbConfigs.connectionURL, { useUnifiedtopology: true, useNewUrlParser: true }, function (err, client) {
//         if (err) {
//             cb(err)
//         }
//         else {
//             var db = client.db(dbConfigs.dbName);
//             cb(null, db);
//         }
//     })
// }
//Database connection ends here


// router.get('/', function (req, res, next) {
//     res.json({
//         msg:"Welcome to empty auths  section"
//     })
// })

router.post('/login', function (req, res, next) {
    // res.json({
    //     msg:"Welcome to auths login section"
    // })

    // res.render('login.pug', {
    //     title: "Login Page",
    //     msg:"login session"
    // })

    // MongoClient.connect(connectionURL, { useUnifiedtopology: true }, function (err, client) {
    //     if (err) {
    //         return next(err);
    //     }
    //     var db = client.db(dbName);
    //     db
    //         .collection(colName)
    //         .find({name: req.body.name})
    //         .toArray(function (err, data) {
    //         if (err)
    //         {
    //             return next(err);
    //         }
    //         res.json(data);
    //     })
    // })

    // connect(function (err, db) {
    //     if (err) {
    //        return next(err)
    //     }
    //     db
    //         .collection(dbConfigs.colName)
    //         .find({ name: req.body.name })
    //         .toArray(function (err, data) {
    //             if (err) {
    //                 return next(err)
    //             }
    //             res.json(data)
    //         })
    // })
    // console.log("req.body", req.body);
    UserModel
        .find({ username: req.body.username }, function (err, user) {
            // console.log("user is>>",user)
            if (err) {
                return next(err)
            }
            if (!user.length) {
                return next({
                    msg: "Invalid username!",
                    status: 404
                })
            }
            if (user[0]) {
                const userData=user[0]
                // console.log("userData is",userData)
                var isMatched = passwordHash.verify(req.body.password, userData.password);
                if (isMatched) {
                var token=createToken(userData)
                    res.json({
                        userData,
                        token
                });
            }
            else {
                return next({
                    msg: "Invalid Password",
                    status:400
                })
            }
            }
        })
})

router.route('/register')
    // .get(function (req, res, next) {
    // res.json({
    //     msg:"Welcome to auths register section"
    // })
    // })
    .post(function (req, res, next) {
        // console.log("req.body in post req of register is >>", req.body);
        // MongoClient.connect(connectionURL,{useNewUrlParser:true,useUnifiedtopology:true}, function (err, client) {
        //     if (err) {
        //        return next(err);
        //     }
        //     console.log("database connection successful");
        //     var db = client.db(dbName);
        //     db.collection(colName).insertOne(req.body, function (err, data) {
        //         console.log("inside the data inserting process")
        //         if (err) {
        //             return next(err);
        //         }
        //         console.log("data inserted is >.", data)
        //         res.json(data);
        //     })
        //     // console.log("MongoClient is>>", client);
        //     // res.json({
        //     //     msg:"Db connection success"
        //     // })
        // })

    //         connect(function (err, db) {
    //     if (err) {
    //        return next(err)
    //     }
    //     db
    //         .collection(dbConfigs.colName)
    //         .insertOne(req.body,function (err, data) {
    //             if (err) {
    //                 return next(err)
    //             }
    //             res.json(data)
    //         })
    // })
        
        //here the user modeling starts actually
        const newUser = new UserModel({})
        //newUser is mongoose object
        //data mapping for user here
        dataEntry(newUser, req.body);

        newUser.password=passwordHash.generate(req.body.password)
        newUser.save(function (err, user) {
            if (err) {
                return next(err)
            }
            res.json(user);
        })
})

module.exports = router;