const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
let userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  
  avatar:{
      type:String,
      required:true
  }
}, {
    collection: 'imageupload'
  })

module.exports = mongoose.model('USer', userSchema)
