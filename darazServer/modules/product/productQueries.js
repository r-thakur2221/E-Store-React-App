const ProductModel = require('./productModel');

function mapProductReq(product, productDetails) {
    if (productDetails.name)
        product.name = productDetails.name;
    if (productDetails.description)
        product.description = productDetails.description;
    if (productDetails.brand)
        product.brand = productDetails.brand;
    if (productDetails.color)
        product.color = productDetails.color;
    if (productDetails.price)
        product.price = productDetails.price;
    if (productDetails.category)
        product.category = productDetails.category;
    if (productDetails.modelNo)
        product.modelNo = productDetails.modelNo;
    if (productDetails.vendor)
        product.vendor = productDetails.vendor;
    if (productDetails.condition)
        product.condition = productDetails.condition;
    if (productDetails.size)
        product.size = productDetails.size;
    if (productDetails.status)
        product.status = productDetails.status;
    if (productDetails.warrentyStatus)
        product.warrentyStatus = productDetails.warrentyStatus;
    if (productDetails.warrentyPeriod)
        product.warrentyPeriod = productDetails.warrentyPeriod;
    if (productDetails.tags)
        product.tags = typeof(productDetails.tags) === 'string' ? productDetails.tags.split(',') : productDetails.tags
    if (productDetails.offers)
        product.offers = typeof(productDetails.offers) === 'string' ? productDetails.offers.split(',') : productDetails.offers
    if (productDetails.images)
        product.images = typeof(productDetails.images) === 'string' ? productDetails.images.split(',') : productDetails.images
    if (productDetails.discountedItem || productDetails.discountType || productDetails.discountValue)
        {
        if (!productDetails.discount)
            product.discount = {};
        if (productDetails.isDiscountedItem)
            product.discount.isDiscountedItem = productDetails.isDiscountedItem;
        if (productDetails.discountType)
            product.discount.discountType = productDetails.discountType;
        if (productDetails.discountValue)
            product.discount.discountValue = productDetails.discountValue;
        }
    
    if (productDetails.reviewPoint && productDetails.reviewMessage) {
        let review = {
            point: productDetails.reviewPoint,
            message: productDetails.reviewMessage,
            user: productDetails.user
        }
        product.reviews.push(review)
    }
}

function save(data) {
    var newProduct = new ProductModel({});
    // map data in newProduct
    mapProductReq(newProduct, data);
    return newProduct.save();
}

function find(condition) {
    return ProductModel
        .find(condition)
        .populate('vendor')
        .sort({_id:-1})
        .exec()

}

function update(id, data) {
    return new Promise(function (resolve, reject) {
        ProductModel.findById(id, function (err, product) {
            if (err) {
                return reject(err);
            }
            if (!product) {
                return reject({
                    msg: "Product Not Found",
                    status: 404
                })
            }
            var oldImage = product.images[0];
            mapProductReq(product, data);
            product.save(function (err, updated) {
                if (err) {
                    return reject(err);
                }
                updated.oldImage = oldImage
                resolve(updated)
            })
        })
    })

}

function remove(id) {
    return new Promise(function (resolve, reject) {
        ProductModel.findById(id, function (err, product) {
            if (err) {
                return reject(err);
            }
            if (!product) {
                return reject({
                    msg: "Product Not Found",
                    status: 404
                })
            }
            product.remove(function (err, removed) {
                if (err) {
                    return reject(err);
                }
                resolve(removed);
            })
        })
    })
}
module.exports = {

    save,
    find,
    update,
    remove,
    mapProductReq
}
