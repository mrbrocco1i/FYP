const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSessionSchema = new Schema({
        userId: {
            type: String,
            default: ''
        },
        timestamp: {
            type: Date,
            default: Date.now()
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {collection: 'UserSession'});

module.exports = User = mongoose.model('UserSession',UserSessionSchema);