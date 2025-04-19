module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Please enter a valid email address'
        },
        notEmpty: {
          msg: 'Email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        len: {
          args: [8, 255],
          msg: 'Password must be at least 8 characters long'
        }
      }
    },
    role: {
      type: DataTypes.ENUM('Admin', 'Staff'),
      allowNull: false,
      defaultValue: 'Staff',
      validate: {
        isIn: {
          args: [['Admin', 'Staff']],
          msg: 'Role must be either Admin or Staff'
        }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'users',
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (user) => {
        user.createdAt = new Date();
      }
    }
  });

  // =====================================
  // Add static methods (from first snippet)
  // =====================================
  User.findByEmail = async function(email) {
    return await this.findOne({ 
      where: { email } 
    });
  };

  User.createUser = async function(userData) {
    return await this.create(userData);
  };

  // =====================================
  // Associations (if needed)
  // =====================================
  User.associate = (models) => {
    // Example:
    // User.hasMany(models.Invitation, { foreignKey: 'user_id' });
  };

  return User;
};