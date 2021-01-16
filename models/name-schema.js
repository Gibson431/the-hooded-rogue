const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const nameSchema = new mongoose.Schema({
    // Guild ID
    _id: reqString,
    nickname: reqString,
})

module.exports = mongoose.model('name-schema', nameSchema)