import Scalars from './scalars'
import reportResolver from "./report-resolver"
import userResolver from './user-resolver'

export default {
  ...Scalars,
  Query: {
    hello: () => 'world!',
    ...reportResolver.Query,
    ...userResolver.Query,
  },
  Mutation: {
    ...reportResolver.Mutation,
    ...userResolver.Mutation
  }
}