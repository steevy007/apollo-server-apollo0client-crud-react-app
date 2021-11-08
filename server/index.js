const { ApolloServer} = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const combine=require('graphql-combine')
const path=require('path')

// Get combined typeDefs and resolvers
const { typeDefs, resolvers } = combine({
    // TypeDefs glob pattern
    typeDefs: path.join(__dirname, 'graphql/*/schema.graphql'),
   
    // Resolvers glob pattern
    resolvers: path.join(__dirname, 'graphql/*/resolver.js')
  })

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
            // options
        })
    ]
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
