const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String,required: true,trim: true,default:''},
    password: {type: String , required: true,trim: true,minlength: 5,default:''},
    username: {type: String,required: true,trim: true,minlength: 3,default:''},
    isDeleted: {type: Boolean,default: false}
},{
    timestamps: true,
});

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password,this.password);
};
const User = mongoose.model('User',userSchema);

module.exports = User;


