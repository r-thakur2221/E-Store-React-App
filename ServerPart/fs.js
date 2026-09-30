const fs = require("fs");

// function write(filename, content) {
//     return new Promise(function(resolve, reject){
//         fs.writeFile("./files/" + filename, content, function (err, done) {
//             console.log("done is ",done)
//     if (err) {
//         console.log("write err is >", err)
//         reject(err)
//     }
//     else {
//         console.log("write Success is >>", done);
//         resolve(done)
//     }
// })
//     })
    
// }

function write(filepath,content, cb) {
    fs.writeFile(filepath, content, function (err, done) {
        cb(err, done);
            console.log("Writen data  is ",done)
})
}

function read(filepath, cb) {
    fs.readFile(filepath, "utf-8", function (err, done) {
        // console.log("reading error is>>", err)
        cb(err, done);
        console.log("Reading Data is >>", done);
        
        })
}

function rename(oldpath, newpath, cb) {
    fs.rename(oldpath, newpath, function (err, done) {
        console.log("DAta renamed is",done)
        cb(err, done);
    })
}

function remove(filepath, cb) {
    fs.unlink(filepath, function (err, done) {
        console.log("DAta removed >>> is",done)
        cb(err, done);
    })
}
// write("new.js", "welcome to web dev")
//     .then(function (data) {
//     console.log("Then Data is ",data)
//     })
//     .catch(function (err) {
//     console.log("catch eror is ",err)
// })

// function read(filepath,function(err,done) {
//     fs.readFile(filepath, "utf-8", function (err, done) {
//             if (err) {
//                 console.log("Err is >>", err)
//             }
//             else {
//                 console.log("sucess reading", done);
//             }
//         })
// })
        


// read("./files/new.js");

module.exports = {
    write,
    read,
    rename,
    remove
}
