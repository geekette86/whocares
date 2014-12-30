//load the the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
//Define user model
var userSchema = mongoose.Schema({
    local : {
        email : String,
        password : String
    },
    twitter : {
        id : String,
        token : String,
        displayName : String,
        username : String
    },
    google : {
        id : String,
        token : String,
        email : String,
        name  : String
    }
});
//Methods
//generating hash
userSchema.methods.generateHash = function(password){
return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
//check if pass is correct
userSchema.methods.validPassword = function(password) {
return bcrypt.compareSync(password, this.local.password);
};
//Create model 
module.exports = mongoose.model('User',userSchema);

    