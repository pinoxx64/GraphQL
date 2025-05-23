import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    id: {
        type: String
    },
    nombre: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
}, { collection: 'user' , versionKey: false});

const User = mongoose.model('User', userSchema);

export default User