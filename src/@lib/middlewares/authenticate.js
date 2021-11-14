import {
  decodeToken
} from '@lib/utils/decode-token'

export default async (req, res, next) => {

  const token = req.headers.authorization;

  // FIRST: Check If there is a token at all
  // if there isn't we set user to null
  if (token == null) {
    req.user = null
    return next()
  }

  try {
    req.user = await decodeToken(token);
  } catch (error) {
    req.user = null
  }

  next()

}