import {
  UserInputError
} from 'apollo-server-express'
import {
  GraphQLScalarType,
  Kind
} from 'graphql'


function validatePhoneNumber(value) {

  if (value.length > 13) throw new UserInputError("Provided value is not a valid Phone Number")

  const re = /^(\+98|0|0098)?9\d{9}$/;

  const isValid = re.test(String(value));

  if (isValid) {
    return `+98${value.slice(value.length - 10, value.length)}`;
  }
  throw new UserInputError("Provided value is not a valid Phone Number");
}


export default new GraphQLScalarType({
  name: 'PhoneNumber',
  description: 'Valid PhoneNumber Only',
  parseValue: validatePhoneNumber,
  serialize: validatePhoneNumber,
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return validatePhoneNumber(ast.value);
    }
    throw new UserInputError("Provided value is not a valid Phone Number");
  },
})