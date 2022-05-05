const mongoose = require("mongoose");
const { Schema } = mongoose;


mongoose.connect('mongodb://127.0.0.1:27017/mvp').then(()=>{
  console.log('connected')
})

const instanceSchema = new Schema({

  cpu: {
    x:{type: Number},
    y:{type: Number}
  },
  player: {
    x:{type: Number},
    y:{type: Number}
  },
  distance:{type: Number}
})

const Instance = mongoose.model('Sample', instanceSchema);

const saveSample = (toSave) => {
  return Instance.create(toSave).then(data => console.log(data))
    .catch(err => console.error(err.message))
}

const db = { Instance, save: saveSample}

module.exports = db