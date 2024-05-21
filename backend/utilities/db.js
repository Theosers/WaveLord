const mongoose = require('mongoose');

module.exports.dbConnect = async () => {
    console.log('Connecting to database')
    try {
        await mongoose.connect(process.env.DB_URL,{useNewURLParser: true})
        console.log('Database connected..');
    }
    catch (err) {
        console.log('Database connection failed');
        console.log(err.message);
        
    }
}