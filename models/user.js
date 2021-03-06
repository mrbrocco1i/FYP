const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    /*commodity_ids: [{type: Schema.Types.ObjectId, ref: 'commodity'}],
    transaction_ids: [{type: Schema.Types.ObjectId, ref: 'transaction'}],
    complaint_ids: [{type: Schema.Types.ObjectId, ref: 'complaint'}],*/
    isDeleted: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        default: 'No phone number stored'
    },
    complaint: {
        type: Array,
        default: []
    }

},
    {collection: 'user'});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = User = mongoose.model('user',UserSchema);