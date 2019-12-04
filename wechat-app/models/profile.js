const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
        user:{
            type: Schema.Types.ObjectId,
            ref:'users'
        },
        img:{
            type: String,
            required: true
        },
        imgs:{
            type: [String]
        },
        name:{
            type: String,
            rquired:true
        },
        text:{
            type: String
        },
        date:{
            type: Date,
            default: Date.now
        }
})

module.exports = Profile = mongoose.model("profiles", profileSchema);