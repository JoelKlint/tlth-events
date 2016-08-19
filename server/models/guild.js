const Guild = (sequelize, DataTypes) => {
  return sequelize.define('guild', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    defaultScope: {
      attributes: { exclude: ['updatedAt', 'createdAt'] }
    }
  })
}

export default Guild
