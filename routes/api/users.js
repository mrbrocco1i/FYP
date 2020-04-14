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

// @route   Get api/users/getByEmail
// @desc    Get User Info By User Email
// @access  Public
router.post('/getByEmail', (req,res) => {
    User.findOne({
        email: req.body.email,
    })
        .then(user => res.json(user));
})


// @route   POST api/users/signup
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

// @route   POST api/users/login
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

// @route   PUT api/users/verify
// @desc    Verify Token
// @access  Public
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

// @route   PUT api/users/logout
// @desc    Log Out
// @access  Public
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

// @route   POST api/users/updUsername
// @desc    Update Username
// @access  Public
router.post('/updUsername', (req,res) => {
    User.findOne({
        email: req.body.email,
    })
        .then(user => {
            if (!req.body.username) {
                res.send({
                    success:false,
                    message: 'Username cannot be blank!'
                })
            }
            else {
                user.username = req.body.username;
                user.save();
                res.send({
                    success: true,
                    message: 'Good'
                })
            }
        });
})

// @route   POST api/users/updPhone
// @desc    Update Phone
// @access  Public
router.post('/updPhone', (req,res) => {
    User.findOne({
        email: req.body.email,
    })
        .then(user => {
            if (!req.body.phone) {
                res.send({
                    success:false,
                    message: 'Phone Number cannot be blank!'
                })
            }
            else {
                user.phone = req.body.phone;
                user.save();
                res.send({
                    success: true,
                    message: 'Good'
                })
            }
        });
})

// @route   POST api/users/updPsd
// @desc    Update Psd
// @access  Public
router.post('/updPsd', (req,res) => {
    const tempUser = new User();
    const newPsw = tempUser.generateHash(req.body.password);
    User.findOne({
        email: req.body.email,
    })
        .then(user => {
            if (!newPsw) {
                res.send({
                    success:false,
                    message: 'Password cannot be blank!'
                })
            }
            else {
                user.password = newPsw;
                user.save();
                res.send({
                    success: true,
                    message: 'Good'
                })
            }
        });
})



module.exports = router;