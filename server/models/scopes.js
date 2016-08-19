
const addEventScopes = (Models) => {
  Models.Event.addScope('with invitations', {
    include: [
      {
        model: Models.Guild,
        as: 'invitedGuilds',
        through: { attributes: [] }
      }
    ]
  })
}

const addUserScopes = (Models) => {
  Models.User.addScope('all fields', {
    attributes: { exclude: ['updatedAt', 'createdAt'] }
  })
}

const addScopes = (Models) => {
  addEventScopes(Models)
  addUserScopes(Models)
}

export default addScopes
