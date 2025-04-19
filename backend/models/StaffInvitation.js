module.exports = (sequelize, DataTypes) => {
  const Invitation = sequelize.define('Invitation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    guestName: {
      type: DataTypes.STRING,
      field: 'guest_name',  // Explicit mapping
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Guest name is required'
        },
        len: {
          args: [2, 255],
          msg: 'Guest name must be 2-255 characters'
        }
      }
    },
    guestEmail: {
      type: DataTypes.STRING,
      field: 'guest_email',
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Please enter a valid email address'
        },
        notEmpty: {
          msg: 'Guest email is required'
        }
      }
    },
    collegeName: {
      type: DataTypes.STRING,
      field: 'college_name',
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'College name is required'
        },
        len: {
          args: [2, 255],
          msg: 'College name must be 2-255 characters'
        }
      }
    },
    eventTitle: {
      type: DataTypes.STRING,
      field: 'event_title',
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Event title is required'
        },
        len: {
          args: [2, 255],
          msg: 'Event title must be 2-255 characters'
        }
      }
    },
    subject: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Subject is required'
        },
        len: {
          args: [5, 1000],
          msg: 'Subject must be 5-1000 characters'
        }
      }
    },
    staffNumber: {
      type: DataTypes.STRING,
      field: 'staff_number',
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Staff number is required'
        },
        len: {
          args: [3, 50],
          msg: 'Staff number must be 3-50 characters'
        }
      }
    },
    staffEmail: {
      type: DataTypes.STRING,
      field: 'staff_email',
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Please enter a valid staff email address'
        },
        notEmpty: {
          msg: 'Staff email is required'
        }
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'sent', 'accepted', 'declined'),
      defaultValue: 'pending'
    }
  }, {
    tableName: 'invitations',
    timestamps: true,
    createdAt: 'created_at',  // Maps to created_at column
    updatedAt: 'updated_at',  // Maps to updated_at column
    deletedAt: 'deleted_at',  // Maps to deleted_at column
    paranoid: true,
    indexes: [
      {
        fields: ['guest_email']  // Use actual column name
      },
      {
        fields: ['status']
      },
      {
        fields: ['staff_email']  // Use actual column name
      }
    ]
  });

  return Invitation;
};