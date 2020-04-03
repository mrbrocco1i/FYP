const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const UserSession = require('../../models/UserSession');

// @route   GET api/users
// @desc    Get All Users
// @access  Public
router.get('/', (req,res) => {
    User.find()
        .then(users => res.json(users));
});

// @route   POST api/users
// @desc    Sign Up
// @access  Public
router.post('/signup', (req,res,next) => {
    const { body } = req;
    const {
        username,
        password
    } = body;
    let {
        email
    } = body;

    if (!username) {
        return res.send({
            success: false,
            message: 'Error: Username cannot be blank.'
        })
    }

    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        })
    }

    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        })
    }

    email = email.toLowerCase();

    User.find({
        email: email
    }, (err,previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        }
        else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: Account already exist.'
            })
        }
        // save new user
        const newUser = new User();
        newUser.email = email;
        newUser.username = username;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                })
            }
            return res.send({
                success: true,
                message: "Signed up"
            })
        })

    })

});

// @route   DELETE api/users/:id
// @desc    Delete an account
// @access  Public
router.delete('/:id', (req,res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({success:true})))
        .catch(err => res.status(404).json({ success: false }));
})

// @route   POST api/users
// @desc    Sign In
// @access  Public
router.post('/login', (req,res,next) => {
    const { body } = req;
    const {
        password
    } = body;
    let {
        email
    } = body;


    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        })
    }

    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        })
    }

    email = email.toLowerCase();

    User.find({
        email: email
    }, (err,users) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            })
        }

        const user = users[0];
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: "Error: Wrong password"
            })
        }

        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: server error'
                })
            }

            return res.send({
                success: true,
                message: 'Valid sign in',
                token: doc._id
            })
        })


    })

});

router.put('/verify', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        }

        if (sessions.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            })
        }
        else {
            return res.send({
                success: true,
                message: 'Good'
            })
        }
    })
})


router.put('/logout', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, {
        $set:{
            isDeleted:true
        }
    }, null,  (err, sessions) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        }

        else {
            return res.send({
                success: true,
                message: 'Good'
            })
        }
    })
})

module.exports = router;