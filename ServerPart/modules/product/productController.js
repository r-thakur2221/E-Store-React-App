const productQuery = require('./productQueries.js');
const fs = require('fs');
const path = require('path');
const mapProduct = require('./productQueries')

function get(req, res, next) {
    let condition = {}
    if(req.user.role !== 1){
        condition.vendor=req.user._id;
    }
    productQuery
        .find(condition)
        .then(function (product) {
            if (!product) {
                next({
                    msg: "Product Not Found!",
                    status:400,
                })
            } else
            {
                res.json(product);
                }
        })
        .catch(err => {
            next(err);
        });
}

function getById(req, res, next) {
        const condition = {_id:req.params.id}
    productQuery.find(condition)
        .then(function (product) {
            // if (!product) {
            //     next({
            //         msg: "Product Not Found!",
            //         status:400,
            //     })
            // } else
            // {
                res.json(product);
                // }
        })
        .catch(err => {
            next(err);
        });
}


function insert(req, res, next) {
    const data = req.body
    console.log("req.files>>",req.files);
    if (req.fileError) {
        return next({
            msg: req.fileError,
            status:400,
        })
    }
    if (req.file) {
        data.images = req.file.filename;
    }

    if(req.files){
        data.images=req.files.map((file) => file.filename);
    }

    req.body.vendor = req.user._id;
    productQuery
        .save(data)
        .then(function (product) {
            res.json(product);
        })
        .catch(err => {
            next(err);
        })
}

function update(req, res, next) {
    const data = req.body
    data.user = req.user._id;
    console.log("req.body is>>",data);
    console.log("data.user>>>",data.user);
//file filter
    if (req.fileError) {
        return next({
            msg: req.fileError,
            status:400
        })
    }
    if (req.file) {
        data.images = req.file.filename;
    }
    if(req.files){
        data.images=req.files.map((file) => file.filename);
    }
    productQuery
        .update(req.params.id, data)
        .then(function (product) {
            if (!product) {
            return next({
                msg: "Product Not Found!!",
                status:400,
            })
            }
            if (req.file) {
                fs.unlink(path.join(process.cwd(), 'uploads/images/' + product.oldImage), function (err, done) {
                    if (!err) {
                        console.log("file removed successfully >>>");
                    }
                })
            }
            res.status(200).json(product);
        })
        .catch(function (err) {
            return next(err);
        })
}

function remove(req, res, next) {
    productQuery
        .remove(req.params.id)
        .then(product => {
        if (!product) {
            return next({
                msg: "Product Not Found!!",
                status:400
            })
            }
            fs.unlink(path.join(process.cwd(), "uploads/images/" + product.oldImage), (err, done) => {
                if (!err) {
                console.log("File removed sucess!")
            }
        })
        res.json(product);
        })
        .catch(err => {
            next(err)
        })

}

function search(req, res, next) {
    const searchCondition = {};
    mapProduct.mapProductReq(searchCondition,req.body);

    if(req.body.minPrice){
        searchCondition.price={
            $gte:req.body.minPrice
        }
    }
    if(req.body.maxPrice){
        searchCondition.price={
            $lte:req.body.maxPrice
        }
    }
    if(req.body.minPrice && req.body.maxPrice){
        searchCondition.price={
            $gte:req.body.minPrice,
            $lte:req.body.maxPrice
        }
    }
        productQuery.find(searchCondition)
        .then(function (product) {
            // if (!product) {
            //     next({
            //         msg: "Product Not Found!",
            //         status:400,
            //     })
            // } else
            // {
                res.json(product);
                // }
        })
        .catch(err => {
            next(err);
        });
}

module.exports = {
    get,
    getById,
    insert,
    update,
    remove,
    search
}