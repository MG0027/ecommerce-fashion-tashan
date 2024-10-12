const mongoose = require('mongoose');

const BagSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bagItems: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 },
            productName:{type: String},
            productPrice:{type: Number},
            productImage:{type: String}
        },
    ],
}, { timestamps: true });

const Bag = mongoose.model('Bag', BagSchema);
module.exports = Bag;
