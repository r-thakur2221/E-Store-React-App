const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    //db modeling here
    name: String,
    age: Number,
    gender: {
        type: String,
        enum:['male','female','other'],
    },
    address: {
        tempAddress: [String],
        permAddress:String,
    },
    dob: Date,
    phoneNumber: Number,
    role: {
        type: Number,
        default:2,//1 for admin, 2 for enduser
    },
    status: {
        type: String,
        enum:['inactive','active'],
        default:'active',
    },
    username: {
        type: String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        // minlength: 4,
        // maxlength:16,
    },
    email: {
        type: String,
        unique: true,
        sparse:true,
    },

})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;