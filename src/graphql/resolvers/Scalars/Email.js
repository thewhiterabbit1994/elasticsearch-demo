import { UserInputError } from 'apollo-server-express'
import { GraphQLScalarType, Kind } from 'graphql'

function validateEmail(value) {

  // this for preventing ddos operations
  if (value.length > 100) throw new UserInputError("Provided value is not a valid Email")

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isValid = re.test(String(value).toLowerCase());

  if (isValid) return value;
  
  throw new UserInputError("Provided value is not a valid Email");
}

export default new GraphQLScalarType({
  name: 'Email',
  description: 'Valid Emails Only',
  parseValue: validateEmail,
  serialize: validateEmail,
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) return validateEmail(ast.value);
    
    throw new UserInputError("Provided value is not a valid Email");
  },
})