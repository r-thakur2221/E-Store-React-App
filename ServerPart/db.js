const mongoose = require('mongoose');
const dbConfigs = require('./configs/dbconfigs')

mongoose.connect(dbConfigs.connectionURL + '/' + dbConfigs.dbName, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', function () {
    console.log('db connection established');
})
mongoose.connection.on('error', function (err) {
    console.log('error connecting to db');
})
