const typeDefinitions = `
type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}

type Post {
  id: Int
  title: String
  text: String
  views: Int
  author: Author
}

type Player {
  name: String
  elo: Int
}

type Query {
 author(firstName: String, lastName: String): Author
 getFortuneCookie: String # we'll use this later
 players: [Player]
}

schema {
  query: Query
}
`;

export default [typeDefinitions];
