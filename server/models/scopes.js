
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

const addGuildScopes = (Models) => {
  Models.Guild.addScope('defaultScope', {
    include: [
      {
        model: Models.User,
        as: 'administrators'
      }
    ]
  }, { override: true })
}

const addScopes = (Models) => {
  addEventScopes(Models)
  addUserScopes(Models)
  addGuildScopes(Models)
}

export default addScopes
