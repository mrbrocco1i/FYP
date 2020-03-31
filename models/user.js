const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    total_ranking: Number,
    commodity_ids: [{type: Schema.Types.ObjectId, ref: 'commodity'}],
    transaction_ids: [{type: Schema.Types.ObjectId, ref: 'transaction'}],
    complaint_ids: [{type: Schema.Types.ObjectId, ref: 'complaint'}]
},
    {collection: 'user'});

module.exports = User = mongoose.model('user',UserSchema);