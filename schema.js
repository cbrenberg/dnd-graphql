const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const axios = require('axios');

const BASE_URL = 'http://dnd5eapi.co/api'

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
      type: new GraphQLList(GraphQLString),
      resolve: (spell) => spell.desc
    },
    higherLevel: {
      type: new GraphQLList(GraphQLString),
      resolve: (spell) => spell.higher_level
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
    casting_time: { type: GraphQLString },
    level: { type: GraphQLInt },
    school: {
      type: new GraphQLObjectType({
        name: 'school',
        description: 'which school of magic',
        fields: () => ({
          name: { type: GraphQLString },
          url: { type: GraphQLString }
        })
      })
    },
    classes: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "classes",
          description: "classes with access to this spell",
          fields: () => ({
            name: { type: GraphQLString },
            url: { type: GraphQLString }
          })
        })
      )
    },
    subclasses: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "subclasses",
          description: "subclasses with access to this spell",
          fields: () => ({
            name: { type: GraphQLString },
            url: { type: GraphQLString }
          })
        })
      )
    },
    url: { type: GraphQLString }
  })
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',

  fields: () => ({
    spell: {
      type: SpellType,
      args: {
        index: {
          type: GraphQLInt
        }
      },
      resolve: async (root, args) => {
        const response = await axios.get(`${BASE_URL}/spells/${args.index}`)
        console.log(response.data);
        return response.data
      }
    }
  })

})

module.exports = new GraphQLSchema({
  query: QueryType,
})