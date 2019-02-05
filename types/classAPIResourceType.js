const { GraphQLString, GraphQLObjectType } = require('graphql');

const classAPIResourceType = (name) => {
  return new GraphQLObjectType({
    name: name,
    fields: () => ({
      class: { type: GraphQLString },
      url: { type: GraphQLString }
    })
  })
}

module.exports = classAPIResourceType;