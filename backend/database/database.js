const mongoose = require('mongoose');
const connectDatabase = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_LINK).then(() => console.log('Connected to MONGODB')).catch((err)=>{
            console.log(err);
        })
    } catch(e) {
        console.log(e);
    }
}
module.exports = connectDatabase;