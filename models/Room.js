const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true, unique: true},
    users: {type: Types.ObjectId, ref: 'User'},
    admin: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Room', schema)