const mongoose = require('mongoose')

const  ApplicantSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
         match: [/\S+@\S+\.\S+/, "Invalid email"]
    },
    phone:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Applicant',ApplicantSchema)