const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const NamedAPIResourceType = require('./namedAPIResourceType');

//takes string choicesName as its own name, and string chooseFrom as the name of items to be chosen from
const ChoiceType = (choicesName, chooseFrom) => {
  return new GraphQLList(
    new GraphQLObjectType({
      name: choicesName,
      fields: () => ({
        from: {
          type: new GraphQLList(
            NamedAPIResourceType(chooseFrom)
          )
        },
        type: { type: GraphQLString },
        choose: { type: GraphQLInt }
      })
    })
  )
}

module.exports = ChoiceType;