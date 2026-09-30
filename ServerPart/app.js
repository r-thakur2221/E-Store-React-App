const express = require('express')
const path=require('path')
const app = express()
const cors = require('cors')
const { urlencoded, json } = require('express')
const morgan=require('morgan')

const configs=require("./configs/index");

//Api router
const ApiRouter=require('./routes/api.route')

//just running database connection file
require('./db');
require("./socket")(app,configs);



//third party middlewares
app.use(morgan("dev"));
app.use(cors());


// template engine setup
// const pug = require('pug');
// app.set('view engine');
// app.set('views', path.join(__dirname, 'views'))

//parse incoming data for x-www-formurlencoded
// app.use(require("body-parser").urlencoded({ extended: true }));
//for content type -> application/json
// app.use(require("body-parser").json())


app.use(express.urlencoded({ extended: true }));
// for json
app.use(express.json());



//Router level middleware
app.use('/api', ApiRouter);

// for finding directory path 
// console.log("__dirname", __dirname);//check the current directory/folder of this file
// console.log("root directory ko path from any location>>", process.cwd());


//inbuilt middleware for serving static files
app.use(express.static('uploads'))
app.use('/file', express.static(path.join(__dirname,'uploads')))



//404 handling app middleware
app.use(function (req, res, next) {
    next({
        msg: "Not Found !",
        status:404
    })
})

//middleware with four arguments is error handling middleware
//error handling middleware doesnot come inbetwn the request and response cycle
app.use(function (err,req, res, next) {
    console.log("I am error handling middlewares", err);
    res.status(400);
// calling next with argument from another locations trigger error handling middlewares
    res.json({
        msg: err.msg || err,
        status:err.status || 400
    })
})

app.listen(configs.port, function (err, done) {
    if (err) {
        console.log("Error in listen to server at port " + configs.port);
    } else {
        console.log("Server Conected to port  >>"+configs.port);
    }
})


//middlewares
// app.use(function (req, res, next) {
//     res.send("I am middleware")
// })

// types od middleware function
//     1. application middleware
//     2. routing level middleware
//     3. third party middleware
//     4. inbuilt middleware
//     5. error handling middleware

// app.use('hi')>>>> throw error as app.use requires a middleware function//

//Another way to use middleware
// function a(req,res,next) {
//     console.log("i am at a !!")
//     next()
// }
// function b(req,res,next) {
//     console.log("I am at B")
//     next()
// }
// function c(req,res,next) {
//     console.log("I am at C");
//     next();
// }

//calling middleware in order
// app.use(a, b, c);

//uses of middlewares

// app.use(function (req, res, next) {  ///this application level middleware
//     console.log("I am 1st middleware");
//     req.rahul="Rahul Thakur"
//     next();
// })

// app.use(function (req, res, next) {
//     //delete req.rahul ///this delete the objects key and value
//     res.json({
//         msg: "I am bloacked at 2nd middleware",
//         params:req.rahul,
//     })
// })
// app.post('/', function (req, res) {
//     res.json({
//     "Msg":"Welcome to ExpressJS"
// })
// })

// app.get('/write/:fileName', function (req, res) {
//     fs.write("./files/"+req.params.fileName, "Hello MFs!!!", function (err, data) {
//         if (err) {
//         res.send(err)
//         }
//         else {
//             res.send(data)
//         }
// })
// })

// // app.get('/write/:name', function (req, res) {
// //     res.json({
// //         "msg": "Dynamic end point",
// //         "Params": req.params,
// //         "query":req.query
// // })
// // })


// app.get('/read/:filepath', function (req, res) {
//     fs.read("./files/"+req.params.filepath, function (err, data) {
//         if (err) {
//         res.send(err)
//         }
//         else {
//             res.send(data)
//         }
// })
// })

// app.get('/rename/:oldpath/:newpath', function (req, res) {
//     fs.rename("./files/"+req.params.oldpath, "./files/"+req.params.newpath, (err, data)=> {
//         if (err) {
//         res.send(err)
//         }
//         else {
//             res.send(data)
//         }
// })    
// })


// app.get('/remove/:filepath', function (req, res) {
//     fs.remove("./files/"+req.params.filepath, (err, data) => {
//         if (err) {
//         res.send(err)
//         } else {
//             res.send(data)
//     }
// })    
// })