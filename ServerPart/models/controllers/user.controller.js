const router = require('express').Router();
const UserModel = require('./../models/userModel');
const dataEntry=require('./../helpers/dataEntry')

// //database connection starts here
// const dbConfigs = require('./../configs/dbconfigs');

// function connect(cb) {
//     dbConfigs.MongoClient
//         .connect(dbConfigs.connectionURL, { useUnifiedTopology: true, useNewUrlParser: true }, function (err, client) {
//             if (err) {
//                 cb(err)
//             }
//             else {
//                 var db = client.db(dbConfigs.dbName);
//                 cb(null,db)
//             }
//         })
// }



router.route('/')
    .get(function (req, res, next) {
        //fetch all users using mongodb
        // connect(function (err, db) {
        //     if (err) {
        //         return next(err)
        //     }
        //     db.collection(dbConfigs.colName)
        //         .find({})
        //         .toArray(function (err, data) {
        //             if (err) {
        //                 return next(err)
        //             }
        //             res.json(data)
        //         })
        // })

        UserModel
            .find({})
            .sort({ _id:-1 })
            .then(function (user) {
                if (user) {
                res.json(user);
            }
            if (!user) {
                return next({
                    msg: "User Not Found!",
                    status:404
                })
            }
            })
            .catch(function (err) {
                next(err);
            });
    });

router.route('/profile')
    .get(function (req, res, next) {
        res.send("Hi, from profile")
    })
    .post(function (req, res, next) {

    })
    .put(function (req, res, next) {

    })
    .delete(function (req, res, next) {

    });

router.route('/:id')
    .get(function(req,res,next){
    //     //fetch by ID
    //     connect(function (err, db) {
    //         if (err) {
    //             return next(err)
    //         }
    //         db.collection(dbConfigs.colName)
    //             .find({
    //             _id:new dbConfigs.oid(req.params.id)
    //             })
    //             .toArray(function (err, data) {
    //                 if (err) {
    //                     return next(err)
    //                 }
    //                 res.json(data);
    //             })
    // })
        
        UserModel.findById(req.params.id, function (err, user) {
            if (err) {
                return next(err)
            }
            if (!user) {
                return next({
                    msg: "User Not Found!",
                    status:404
                })
            }
            res.json(user);
        })
    })
    .put(function (req, res, next) {
        //update data in mongodb here
        // connect(function (err, db) {
        //     db
        //         .collection(dbConfigs.colName)
        //         .update({ _id: new dbConfigs.oid(req.params.id) }, { $set: req.body }, function (err, data) {
        //             if (err) {
        //                 return next(err)
        //             }
        //             res.json(data);
        //         })
        // })
        UserModel.findById(req.params.id, function (err, user) {
            if (err) {
                return next(err)
            }
            if (!user) {
                return next({
                    msg: "User Not Found!",
                    status:404
                })
            }
        dataEntry(user,req.body)
        user.save(function (err, user) {
            if (err) {
                return next(err)
            }
            res.json(user);
        })
        })
        
    })
    .delete(function(req,res,next){
        // connect(function (err, db) {
        //     if (err) {
        //         return next(err)
        //     }
        //     db
        //         .collection(dbConfigs.colName)
        //         .remove({
        //             _id:new dbConfigs.oid(req.params.id)
        //         }, function (err, data) {
        //             if (err) {
        //                 return next(err)
        //             }
        //             res.json(data)
        //         })
        // })
        if (req.user.role !== 1) {
            return next({
                msg: "You dont have permission to delete any User",
                status:400
            })
        }
        UserModel.findById(req.params.id, function (err, user) {
            if (err) {
                return next(err)
                    }
            if (!user) {
                return next({
                    msg: "User Not Found!",
                    status:404
                })
            }
            user
                .delete(function (err, user) {
                    if (err) {
                        return next(err)
                    }
                    if (!user) {
                        return next({
                            msg: "User Not Found!",
                            status:404
                        })
                    }
                    res.json(user);
                })
        })
    })


module.exports = router;
