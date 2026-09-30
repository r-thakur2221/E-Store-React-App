const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    point: Number,
    message: String,
    user: {
        type: Schema.Types.ObjectId,
        ref:'user',
    }
}, {
    timestamps:true
})

const productSchema = new Schema({
    name: String,
    description: String,
    size: String,
    category: {
        type: String,
        required:true,
    },
    price: Number,
    images: [String],
    color: String,
    brand: String,
    condition: {
        type: String,
        enum: ['brand new', 'used'],
        default:'brand new'
    },
    status: {
        type: String,
        enum: ['available', 'sold', 'booked'],
        default:'available'
    },
    modelNo: String,
    vendor: {
        type: Schema.Types.ObjectId,
        ref:'user',
    },
    tags:[String],
    warrentyStatus: Boolean,
    warrentyPeriod: String,
    discount: {
        isDiscountedItem: Boolean,
        discountType: String,
        discountValue:String,
    },
    reviews:[ReviewSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('product', productSchema);