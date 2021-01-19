const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const reactionroleSchema = new mongoose.Schema({
    // Guild ID
    _id: reqString,
    channelId: reqString,
    channelName: reqString,
    emojiId: reqString,
    roleId: reqString
})

module.exports = mongoose.model('reactionrole', reactionroleSchema)