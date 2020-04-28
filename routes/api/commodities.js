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


// @route   POST api/commodities/getByEmail
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
        .then(commodity => commodity.remove().then(() => res.send({
            success: true,
            message: "Deleted"
            })
        ))
        .catch(err => res.send({
                success: false,
                message: 'Error: Server error'
            })
        );
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
        isRecycManufacturer: req.body.isRecycManufacturer,
        recycling_index: req.body.recycling_index
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

// @route   POST api/commodities/getByType
// @desc    Get Commodities by type
// @access  Public
router.post('/getByType', (req,res) => {
    Commodity.find({type: req.body.type})
        .then(commodities => res.json(commodities))
})

// @route   POST api/commodities/getWithMaxIndex
// @desc    Get Commodities with Max Recycling Index
// @access  Public
router.get('/getWithMaxIndex', (req,res) => {
    Commodity.find({recycling_index: 3})
        .then(commodities => res.json(commodities))
})

// @route   POST api/commodities/getWithMaxIndex
// @desc    Get Commodities with Max Recycling Index
// @access  Public

router.post('/fuzzySearch', (req,res) => {
    var regex = new RegExp(req.body.input,'i');
    Commodity.find({"name":regex}, function(err,commodities) {
        if (commodities.length === 0)
            res.json({message:'No Such Commodity!'});
        else
            res.json(commodities);

    })
})

module.exports = router;