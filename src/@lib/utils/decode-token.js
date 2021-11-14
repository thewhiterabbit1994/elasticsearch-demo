import dotenv from 'dotenv'

import jwt from 'jsonwebtoken'

dotenv.config()

export function decodeToken(token) {
  try {
    const arr = token.split(' ');

    if (arr[0] && arr[0] === 'Bearer' && arr[1]) return jwt.verify(arr[1], process.env.JWT_SECRET);

    throw new Error('BAD REQUEST: INVALID TOKEN')
  } catch (error) {
    throw error
  }
}