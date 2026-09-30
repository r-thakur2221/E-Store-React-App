const jsonwebtoken = require('jsonwebtoken');
const jwtSecretKey = require('./../configs/index');
const userModel = require('./../models/userModel');

module.exports = function (req, res, next) {
    var token;
    if (req.headers['authorization'])
        token = req.headers['authorization']
    if (req.headers['x-access-token'])
        token = req.headers['x-access-token']
    if (req.headers['token'])
        token = req.headers['token']
    if (req.query.token)
        token = req.query.token;
    
    if (token) {
        jsonwebtoken.verify(token, jwtSecretKey.jwtSecretKey, function (err, decoded) {
            if (err) {
                return next(err)
            }
            console.log("decoded value is>>", decoded);
            userModel.findById(decoded.id, function (err, user) {
                if (err) {
                    return next(err)
                }
                if (!user) {
                    return next({
                        msg: "User Not Found!!!",
                        status:400
                    })
                }
                req.user = user;
                console.log("req.user in authen", req.user);
                next();
            })
        })
    } else {
        return next({
            msg: "Token Not Provided!",
            status:400
        })
    }
    
}