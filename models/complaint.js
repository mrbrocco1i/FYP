const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplaintSchema = new ComplaintSchema({
    message: String,
    user_id: [{type: Schema.Types.ObjectId, ref: 'user'}]
},
    {collection:'complaint'});

module.exports = Complaint = mongoose.model('complaint',ComplaintSchema);