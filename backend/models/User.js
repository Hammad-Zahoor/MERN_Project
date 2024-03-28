const mongoose = require("mongoose")
const {Schema} = mongoose;  //destructuring

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    major:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    education:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("user",userSchema) // user schema is created in mongoDb