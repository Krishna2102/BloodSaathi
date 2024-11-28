const mongoose=require('mongoose');
const adminSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String, // for admin login
    token: String, // for admin login
    role: { type: String, default: 'Admin' },
});


const Admin=mongoose.model('admin',adminSchema);
module.exports=Admin;