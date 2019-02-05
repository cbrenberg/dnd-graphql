const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const namedAPIResourceType = require('./namedAPIResourceType');

const SpellType = new GraphQLObjectType({
  name: 'Spell',
  description: '...',

  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: (spell) => spell._id
    },
    index: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: {
      type: GraphQLString,
      resolve: (spell) => spell.desc[0]
    },
    higherLevel: {
      type: GraphQLString,
      resolve: (spell) => spell.higher_level[0]
    },
    page: { type: GraphQLString },
    range: { type: GraphQLString },
    components: {
      type: new GraphQLList(GraphQLString)
    },
    material: { type: GraphQLString },
    ritual: { type: GraphQLString },
    duration: { type: GraphQLString },
    concentration: { type: GraphQLString },
    castingTime: {
      type: GraphQLString,
      resolve: spell => spell.casting_time
    },
    level: { type: GraphQLInt },
    school: {
      type: namedAPIResourceType('schools')
    },
    classes: {
      type: new GraphQLList(
        namedAPIResourceType('classes')
      )
    },
    subclasses: {
      type: new GraphQLList(
        namedAPIResourceType('subclasses')
      )
    },
    url: { type: GraphQLString }
  })
})

module.exports = SpellType;