const express = require('express');
const router = express.Router();

const Commodity = require('../../models/commodity');

// @route   GET api/commodities
// @desc    Get All Commodities
// @access  Public
router.get('/', (req,res) => {
    Commodity.find()
        .then(commodities => res.json(commodities));
});

// @route   POST api/commodities
// @desc    Create A Post
// @access  Public
router.post('/', (req,res) => {
    const newCommodity = new Commodity({
        name: req.body.name,
        type: req.body.type,
        material: req.body.material,
        price: req.body.price,
        manufacturer: req.body.manufacturer,
        recycling_index: req.body.recycling_index,
        description: req.body.description
    });
    newCommodity.save().then(commodity => res.json(commodity));
});

// @route   DELETE api/commodities/:id
// @desc    Delete a Commodity
// @access  Public
router.delete('/:id', (req,res) => {
    Commodity.findById(req.params.id)
        .then(commodity => commodity.remove().then(() => res.json({success:true})))
        .catch(err => res.status(404).json({ success: false }));
})


module.exports = router;