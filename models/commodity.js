const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommoditySchema = new Schema({
    name: String,
    type: String,
    material: String,
    price: Number,
    manufacturer: String,
    recycling_index: Number,
    description: String,
    seller_email: String,
    isRecycPackaging: Boolean,
    isRecycMaterial: Boolean,
    isRecycManufacturer: Boolean
},
    {collection:'commodity'});

module.exports = Commodity = mongoose.model('commodity',CommoditySchema);