const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/testdb', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err)
});

db.once('open', () => {
    console.log('Database Connection Established!')
})
module.exports = db;
