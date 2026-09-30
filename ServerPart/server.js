const http = require('http');
const fs = require("./fs");

const server = http.createServer(function (req, res) {
    console.log("Client connected to server")
    var URL = req.url;
    console.log("req.URl is >>",req.url)
    switch (URL) {
        case '/write': {
            // fs.write("New.txt", "Hello Guys!, Welcome to The port 9090.")
            //     .then(function (data) {
            //         console.log("Write Data is >>", data);
            //         res.end(data);
            //     })
            //     .catch(function (err) {
            //         console.log("Write error is >>", err);
            //     });


            fs.write("New.txt", "Everythingd will be fine One Day :)", function (err, done) {
                if (err) {
                    console.log("write err is ",err)
                }
                else {
                    console.log("write data is >>", done)
                    res.end(done)
                }
            })
            break;
        }
        case '/read': {
            fs.read("./files/New.txt", function (err, done) {
                if (err) {
                    console.log("Reading error is >>", err);
                }
                else {
                    console.log("Reading Data is >>", done);
                    res.end(done)
                }
            })
            break;
        }
            case '/rename': {
            fs.rename("New.txt","newName.txt", function (err, done) {
                if (err) {
                    console.log("Rename error is >>", err);
                }
                else {
                    console.log("Rename Data is >>", done);
                    res.end(done)
                }
            })
            break;
        }
            case '/remove': {
            fs.remove("newName.txt", function (err, done) {
                if (err) {
                    console.log("Remove error is >>", err);
                }
                else {
                    console.log("Remove Data is >>", done);
                    res.end(done)
                }
            })
            break;
        }
        default : {
            res.end("Wrong URL ENtered !!!")
            }
    }

    // res.end("Hi from Server End ");
})

server.listen(9090, (err, done) => {
    if (err) {
        console.log("Server err >>",err)
    }
    else {
        console.log("Server listening at 9090 inside");
    }
});

console.log("Server listening at 9090 outside");
