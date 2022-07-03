const { ApolloServer, gql } = require("apollo-server");


const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Post {
    id: ID
    title: String
    text: String
    comment: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    post(id:ID): Post
  }

  type Mutation {
    createPost(id: Int, title:String, text: String, comment:String): Post,
    deletePost(id: ID):Post,
    updatePost(id: Int, title:String): Post
  }
`;

let posts = [
    {
      id: 1,
      title: 'The Awakening',
      text: 'Kate Chopin',
    },
    {
      id: 2,
      title: 'The Sleeping',
      text: 'Kate Chopin',
    },
    {
      id: 3,
      title: 'The Awakening-sleeping',
      text: 'Kate Chopin',
    },
  ];

  // Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      post: (_, {id}) => {
        const Spost = posts.find(post => post.id == id);
        return Spost;
      },
    },
    Mutation:{
      deletePost: (_, {id}) => {
        posts = posts.filter(post => post.id != id);
        return posts;
      },
      createPost: (_, {id, title, text, comment}) => {
        posts.push({id, title, text, comment});
        console.log(title)
        return posts[posts.length-1];
      },
      updatePost: (_, {id, title}) => {
        /* posts.map(post => {
          post.id == id,
          post.title = title
        }); */
        const updated = posts.filter(post => post.id != id);
        updated.id = id;
        updated.title = title;
        return updated;
      }
    }
  };

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
  });
  
  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
