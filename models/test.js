const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Commodity = require('./commodity')
const User = require('./user')

const seller = new User({
    username: 'myron'
});

seller.save(function (err) {
    if (err) return handleError(err);
    const commodity1 = new Commodity({
        name: 'Cotton T-shirt',
        seller: seller._id
    });

    commodity1.save(function (err) {
        if (err) return handleError(err);
    })

console.log('success');



})