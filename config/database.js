const mongoose = require("mongoose");

// Define your MongoDB database name
const dbName = 'ib_mk_collection'; // Replace with your actual database name

exports.connect = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/ib_mk_collection`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB database: ib_mk_collection`);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

exports.getDb = () => {
    return mongoose.connection;
};
