var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	email:String,
	username: String,
	password: String
}),
user = mongoose.model('user', userSchema);

module.exports = user;