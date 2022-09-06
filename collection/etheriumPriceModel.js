const mongoose = require('mongoose')

const etheriumPriceSchema = new mongoose.Schema({

    etheriumPrice: { type: Number },
}, { timestamps: true });


module.exports = mongoose.model('etheriumPrice', etheriumPriceSchema)