const mongoose = require("mongoose")
const UserSchema =require("./../../models/userModel")
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength:25,
    },
    text: {
        type: String,
        
    },
    user:{
        type:Schema.Types.ObjectId,
        refs:'user'
    },
}, {
    timestamps:true,
})

const noteModel = mongoose.model('note', NoteSchema);

module.exports = noteModel;