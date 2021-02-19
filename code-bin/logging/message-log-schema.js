const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const loggingSchema = new mongoose.Schema({
    // Guild ID
    _id: reqString,
    channelId: reqString,
    channelName: reqString
})

module.exports = mongoose.model('message-logging', loggingSchema)