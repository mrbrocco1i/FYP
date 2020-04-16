const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplaintSchema = new ComplaintSchema({
    message: String,
    email: String
},
    {collection:'complaint'});

module.exports = Complaint = mongoose.model('complaint',ComplaintSchema);