const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
        },
    password: {
        type: String,
        required: true
        },
    image: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin'
    }
});

module.exports = model('admins', adminSchema);
// Admin avec 'A' majuscule car c'est le nom de la collection dans la base de données