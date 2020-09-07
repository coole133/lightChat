const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    text: {type: String, required: true},
    user: {type: String, required: true},
    time: {type: String, required: true},
    room: {type: Types.ObjectId, ref: 'Room'},
})

module.exports = model('Message', schema)