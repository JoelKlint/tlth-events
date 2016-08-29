import Sequelize from 'sequelize'
const port = 3000
let dbUri = 'postgres://qwgqyjhj:kK1Jh1G73sti8bJUaTipn9Mr67ugb7X7@horton.elephantsql.com:5432/qwgqyjhj'
const NODE_ENV = process.env.NODE_ENV;
if(NODE_ENV === 'test') {
  dbUri = 'postgres://hxmaiqjb:M6fkgV9OYWmbzvMUr8jCZZSqSCdCMkNZ@horton.elephantsql.com:5432/hxmaiqjb'
}

// Connect to database
const sequelize = new Sequelize(dbUri, { logging: false })

// Import all models
const modelNames = [
  'Event',
  'Guild',
  'User',
  'Invitation'
]

// Import all models onto models object
let Models = {}
modelNames.forEach(model => {
  Models[model] = sequelize.import(__dirname + '/' + model)
})

// Declare relationsships
Models.Event.belongsToMany(Models.Guild, { as: 'invitedGuilds', through: Models.Invitation })
Models.Event.belongsTo(Models.Guild, { as: 'ownerGuild', foreignKey: 'ownerGuildId' })
Models.Guild.hasMany(Models.User, { as: 'administrators', foreignKey: 'adminGuildId'})

// Add scopes
import addScopes from './scopes'
addScopes(Models)

// Syncronize database with model definitions
sequelize.sync()

// Export model object
Models.sequelize = sequelize
export default Models
