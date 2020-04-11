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


// @route   GET api/commodities/getByEmail
// @desc    Get All Commodities Posed by Designated User
// @access  Public
router.post('/getByEmail', (req,res) => {
    Commodity.find(
        {
            seller_email: req.body.seller_email
        }
    )
        .then(commodities => res.json(commodities));
});

// @route   POST api/commodities
// @desc    Create A Post
// @access  Public
/*router.post('/', (req,res) => {
    const newCommodity = new Commodity({
        name: req.body.name,
        type: req.body.type,
        material: req.body.material,
        price: req.body.price,
        manufacturer: req.body.manufacturer,
        recycling_index: req.body.recycling_index,
        description: req.body.description,
    });
    newCommodity.save().then(commodity => res.json(commodity));
});*/

// @route   DELETE api/commodities/:id
// @desc    Delete a Commodity
// @access  Public
router.delete('/:id', (req,res) => {
    Commodity.findById(req.params.id)
        .then(commodity => commodity.remove().then(() => res.json({success:true})))
        .catch(err => res.status(404).json({ success: false }));
})

// @route   POST api/commodities
// @desc    Create A Post
// @access  Public
router.post('/', (req,res,next) => {
    const { body } = req;
    const {
        type,
        description,
        material,
        manufacturer,
        price,
        name,
        seller_email
    } = body;


    if (!name) {
        return res.send({
            success: false,
            message: 'Error: Title cannot be blank.'
        })
    }

    if (!seller_email) {
        return res.send({
            success: false,
            message: 'Error: Invalid user.'
        })
    }

    if (!type) {
        return res.send({
            success: false,
            message: 'Error: Type cannot be blank.'
        })
    }

    if (!description) {
        return res.send({
            success: false,
            message: 'Error: Description cannot be blank.'
        })
    }

    if (!material) {
        return res.send({
            success: false,
            message: 'Error: Material cannot be blank.'
        })
    }

    if (!manufacturer) {
        return res.send({
            success: false,
            message: 'Error: Manufacturer cannot be blank.'
        })
    }

    if (!price) {
        return res.send({
            success: false,
            message: 'Error: Price cannot be blank.'
        })
    }

    // save new commodity
    const newCommodity = new Commodity({
        name: req.body.name,
        type: req.body.type,
        material: req.body.material,
        price: req.body.price,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        seller_email: req.body.seller_email,
        isRecycPackaging: req.body.isRecycPackaging,
        isRecycMaterial: req.body.isRecycMaterial,
        isRecycManufacturer: req.body.isRecycManufacturer
    });
    newCommodity.save((err, good) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        }
        return res.send({
            success: true,
            message: "Post created"
        })
    })

});


module.exports = router;