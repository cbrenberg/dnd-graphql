const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const ClassType = new GraphQLObjectType({
  name: 'Class',
  description: '...',

  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: (spell) => spell._id
    },
    index: { type: GraphQLInt },
    name: { type: GraphQLString },
    hit_die: { type: GraphQLInt },
    proficiency_choices: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'Proficiency_choices',
          fields: () => ({
            from: {
              type: new GraphQLList(
                new GraphQLObjectType({
                  name: 'Skill',
                  fields: () => ({
                    name: { type: GraphQLString },
                    url: { type: GraphQLString }
                  })
                })
              )
            },
            type: { type: GraphQLString },
            choose: { type: GraphQLInt }
          })
        })
      )
    },
    proficiencies: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'Proficiencies',
          fields: () => ({
            name: { type: GraphQLString },
            url: { type: GraphQLString }
          })
        })
      )
    },
    saving_throws: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'saving_throw',
          fields: () => ({
            name: { type: GraphQLString },
            url: { type: GraphQLString }
          })
        })
      )
    },
    starting_equipment: {
      type: new GraphQLObjectType({
        name: 'equipment',
        fields: () => ({
          url: { type: GraphQLString },
          class: { type: GraphQLString }
        })
      })
    },
    class_levels: {
      type: new GraphQLObjectType({
        name: 'level',
        fields: () => ({
          url: { type: GraphQLString },
          class: { type: GraphQLString }
        })
      })
    },
    subclasses: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'subclass',
          fields: () => ({
            name: { type: GraphQLString },
            url: { type: GraphQLString }
          })
        })
      )
    },
    spellcasting: {
      type: new GraphQLObjectType({
        name: 'spellcasting',
        fields: () => ({
          class: { type: GraphQLString },
          url: { type: GraphQLString }
        })
      })
    },
    url: { type: GraphQLString }
  })
})

module.exports = ClassType;