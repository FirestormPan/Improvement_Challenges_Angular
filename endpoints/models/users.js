const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id:{
        type: String,
        required:true
    },
    name:{
        type: String,
        required: true
    },
    pfp:{
        type: String,
        required: false
    },
    contracts:{
        type: [],
        required: false
    }
}, { timestamps: true })

const User = mongoose.model('User',userSchema);
module.exports = User;
