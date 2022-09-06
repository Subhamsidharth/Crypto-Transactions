const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({

    address: { type: String ,unique:true},
    Data: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });


module.exports = mongoose.model('transaction', transactionSchema)