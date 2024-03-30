const mongoose = require("mongoose")
const {Schema} = mongoose;  //destructuring

const profileSchema = new Schema({
    caption:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    },
    likes:{
        type:Number,
        required:false
    },
    comments:{
        type:[String],
        required:false
    },
    userID:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("profile",profileSchema) 