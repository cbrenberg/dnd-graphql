const { GraphQLString, GraphQLObjectType } = require('graphql');

const NamedAPIResourceType = (name) => {
  return new GraphQLObjectType({
    name: name,
    fields: () => ({
      name: { type: GraphQLString },
      url: { type: GraphQLString }
    })
  })
}

module.exports = NamedAPIResourceType;