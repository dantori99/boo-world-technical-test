'use strict';

const express = require('express');
const app = express();
const port =  process.env.PORT || 3000;
const { dbConnect } = require('./db/mongo');

// set the view engine to ejs
app.use('/public/static/', express.static('./public/static'));
app.set('view engine', 'ejs');

app.use(express.json());

dbConnect().then(() => app.listen(port, () => console.log('Express started. Listening on %s', port)));

// routes
app.use('/', require('./routes/profile')());
app.use('/user', require('./routes/user')());
app.use('/comment', require('./routes/comment')());

module.exports = {
    app
}