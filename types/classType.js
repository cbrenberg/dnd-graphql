const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const ChoiceType = require('./ChoiceType');
const NamedAPIResourceType = require('./namedAPIResourceType');
const classAPIResourceType = require('./classAPIResourceType');

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
      type: ChoiceType('proficiency_choices', 'skills')
    },
    proficiencies: {
      type: new GraphQLList(
        NamedAPIResourceType('proficiencies')
      )
    },
    saving_throws: {
      type: new GraphQLList(
        NamedAPIResourceType('saving_throws')
      )
    },
    starting_equipment: {
      type: classAPIResourceType('equipment')
    },
    class_levels: {
      type: classAPIResourceType('level')
    },
    subclasses: {
      type: new GraphQLList(
        NamedAPIResourceType('subclass')
      )
    },
    spellcasting: {
      type: classAPIResourceType('spellcasting')
    },
    url: { type: GraphQLString }
  })
})

module.exports = ClassType;