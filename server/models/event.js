const Event = (sequelize, DataTypes) => {
  return sequelize.define('event', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    defaultScope: {
      attributes: { exclude: ['updatedAt', 'createdAt'] }
    }
  })
}


export default Event
