const mongoose = require("mongoose");
const { Schema } = mongoose;


mongoose.connect('mongodb://127.0.0.1:27017/mvp').then(()=>{
  console.log('connected')
})

const instanceSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    default: null
  }
})

const Instance = mongoose.model('Sample', instanceSchema);

const saveSample = (toSave) => {
  return Instance.create(toSave)
    .catch(err => console.error(err.message))
}

const db = { Instance, save: saveSample}

module.exports = db