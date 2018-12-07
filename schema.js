const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const axios = require('axios');

const BASE_URL = 'http://dnd5eapi.co/api'

async function getSpellByIndex(index) {
  const response = await axios.get(`${BASE_URL}/spells/${index}`);
  return response.data;
}

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
      resolve: (root, args) => {
        return getSpellByIndex(args.index);
      }
    },
    spells: {
      type: new GraphQLList(SpellType),
      resolve: async (root) => {
        const { data: { results } } = await axios.get(`${BASE_URL}/spells`)
        // console.log(results)
        const dataToSend = results.map(async (spell) => {
          // console.log(spell)
          const { data } = await axios.get(spell.url);
          // console.log(data)
          return data;
        })
        return dataToSend;
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: QueryType,
})