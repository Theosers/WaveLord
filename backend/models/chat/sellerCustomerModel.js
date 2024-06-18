const { Schema, model } = require('mongoose');

const sellerCustomerSchema = new Schema({
    myId: {
        type: String,
        required: true
    },
    myFriends: {
        type: Array,
        default: []
        },
}, {timestamps : true});

module.exports = model('seller_customers', sellerCustomerSchema);
// Admin avec 'A' majuscule car c'est le nom de la collection dans la base de données