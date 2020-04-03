const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-Parser');

const commodities = require('./routes/api/commodities');
const users = require('./routes/api/users');

const app = express();

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// api-commodity
app.use('/api/commodities',commodities);

// api-user
app.use('/api/users',users);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));


