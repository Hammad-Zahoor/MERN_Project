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
    likes: {
        type: [Schema.Types.ObjectId],
        ref: 'user', 
        default: [],
        required:false,
      },
    likes_count:{
        type:Number,
        required:false,
        default:0
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