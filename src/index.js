import '@lib/globalVariables'
import runServer from "@lib/server/run-server";
import resolvers from 'graphql/resolvers'
import buildSchema from 'graphql/schema/buildSchema'
import dotenv from 'dotenv'

dotenv.config()

const typeDefs = buildSchema()

runServer({
  port: process.env.PORT || 3000,
  typeDefs,
  resolvers
})