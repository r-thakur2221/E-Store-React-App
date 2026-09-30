// const noteModel = require("./noteModel");
const noteQuery = require("./notesQuery");


function get(req, res, next) {
    let condition = {};
    noteQuery.find(condition)
             .then(note => {
                if (!note) {
                    next({
                        msg: "note Not Found!",
                        status:400,
                    })
                }

                res.status(200).json(note);
             })
             .catch(err => {
                 next(err);
             })
}


// function getById(req, res, next) {
//         const condition = {_id:req.params.id}
//     noteQuery.find(condition)
//         .then(function (note) {
//             // if (!note) {
//             //     next({
//             //         msg: "note Not Found!",
//             //         status:400,
//             //     })
//             // } else
//             // {
//                 res.json(note);
//                 // }
//         })
//         .catch(err => {
//             next(err);
//         });
// }




function insert(req, res, next) {
    const data = req.body

    req.body.user = req.user._id;
    noteQuery
        .save(data)
        .then(function (note) {
            res.json(note);
        })
        .catch(err => {
            next(err);
        })
}

function update(req, res, next) {
    const data = req.body
    data.user = req.user._id;

    noteQuery
        .update(req.params.id, data)
        .then(function (note) {
            if (!note) {
            return next({
                msg: "note Not Found!!",
                status:400,
            })
            }
            res.status(200).json(note);
        })
        .catch(function (err) {
            return next(err);
        })
}

function remove(req, res, next) {
    noteQuery
        .remove(req.params.id)
        .then(note => {
        if (!note) {
            return next({
                msg: "note Not Found!!",
                status:400
            })
            }
        res.json(note);
        })
        .catch(err => {
            next(err)
        })
}



function search(req, res, next) {
    const searchCondition = {};
    // mapProduct.mapProductReq(searchCondition, req.body);
    noteQuery.find(searchCondition)
        .then(function (note) {
            res.json(note);
        })
        .catch(err => {
            next(err);
        });
}

module.exports = {
    get,
    insert,
    update,
    remove,
    search
}
