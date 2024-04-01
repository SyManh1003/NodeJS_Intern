const mongoose = require("mongoose")
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL, {
            family: 4,
        })
        if (conn.connection.readyState === 1) {
            console.log("Database connect successfully!");
        } else {
            console.log("Database connecting");
        }
    } catch (error) {
        console.log("Connection failed~");
        throw new Error(error)
    }
}
module.exports = connectDB