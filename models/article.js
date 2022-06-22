const mongoose = require('mongoose');
const marked = require('marked')
const slugify = require('slugify')


const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    detail:{
        type:String
    },

    createdAt:{
        type:Date,
        default: Date.now
    },
    
})



module.exports = mongoose.model('Article', articleSchema)