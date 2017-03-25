const typeDefinitions = `
scalar Date
type Player {
  name: String
  elo: Int
  joinDate: String
  retired: Boolean
  retireDate: String
  claim: Boolean
  belongsTo: String
  lastPlayed: String
}

type Query {
 players: [Player]
}

schema {
  query: Query
}
`;

export default [typeDefinitions];
