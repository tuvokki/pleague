const typeDefinitions = `
type Player {
  name: String
  elo: Int
}

type Query {
 players: [Player]
}

schema {
  query: Query
}
`;

export default [typeDefinitions];
