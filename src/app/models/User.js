const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
       name: DataTypes.STRING,
       email: DataTypes.STRING,
       password: DataTypes.VIRTUAL,  //A virtual DataType only is present in the model
       password_hash: DataTypes.STRING,
    },{
        hooks: {
            beforeSave: async user => {
                if (user.password){
                    user.password_hash = await bcrypt.hash(user.password, 8);
                }
            }
        }
    });


    User.prototype.checkPassword = function(password){        //Create a new method in the User model
        return bcrypt.compare(password, this.password_hash);  
    }

    User.prototype.generateToken = function(){
      return jwt.sign({
          id: this.id
      },
      process.env.APP_SECRET
      );  
    };

    return User;
};