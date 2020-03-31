const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new transactionSchema({
        buyerConfirmed: {
            type: Boolean,
            default: false
        },
        sellerConfirmed: {
            type: Boolean,
            default: false
        },
        isFinished: {
            type: Boolean,
            default: false
        },
        ranking: Number,
        seller_id: [{type: Schema.Types.ObjectId, ref: 'user'}],
        buyer_id: [{type: Schema.Types.ObjectId, ref: 'user'}],
        commodity_id: [{type: Schema.Types.ObjectId, ref: 'commodity'}]

    },
    {collection: 'transaction'});

module.exports = User = mongoose.model('transaction',transactionSchema);