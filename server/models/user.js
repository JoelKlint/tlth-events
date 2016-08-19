const User = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    username: {
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

export default User
