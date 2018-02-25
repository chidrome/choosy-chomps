'use strict';
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    name: {
	    	type: DataTypes.STRING,
	    	validate: {
	    		len: {
	    			args: [1,99],
	    			msg: 'Invalid username. Must be between 1-99 characters.'
		    	}
		    }
    },
    email: {
    		type: DataTypes.STRING,
    		validate: {
    			isEmail: {
    				msg: 'Invalid e-mail address.'
    			}
    		}
    },
    password: {
	    	type: DataTypes.STRING,
	    	validate: {
	    		len: {
	    			args: [8,99],
	    			msg: 'Password must be at least eight (8) characters.'
	    		}
	    	}
    }
  }, {
  	hooks: {
  		//before the user is created, we will do this to it
  		beforeCreate: function(pendingUser, options) {
  			//if both of these evaluate to true, then do this
  			if (pendingUser && pendingUser.password) {
  				//this stores the hashed password. 10 is the level of encryption
  				var hash = bcrypt.hashSync(pendingUser.password, 10);
  				pendingUser.password = hash;
  			}
  		}
  	}
  });
  user.associate = function(models) {
  	//this is a class method
    // associations can be defined here
  };

  //validPassword is a new function that we created, could be named
  //anything. check out prototypal inheritance 
  user.prototype.validPassword = function(pendingPassword) {
  	//return the result of checking the hash password v pendingPassword
  	//compare is asynchronous so use callback but we dont
  	//want that so we use (compareSync())
  	return bcrypt.compareSync(pendingPassword, this.password);
  };

  //this will be used in the routes 
  user.prototype.toJSON = function() {
  	var userData = this.get(); //this parses data and stores in variable
  	delete userData.password; 
  	return userData;
  };

  return user;
};