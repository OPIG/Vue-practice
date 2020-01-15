const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'m_users'
    },
    img:{
        type: String,
        required:true
    },
    imgs:{
        type: [String]
    },
    name:{
        type:String,
        required: true
    },
    text:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = profile = mongoose.model("m_profiles",profileSchema);