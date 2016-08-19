const Invitation = (sequelize, DataTypes) => {
  return sequelize.define('invitation', {
    declined: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })
}

export default Invitation
