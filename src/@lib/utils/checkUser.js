import User from 'models/user'

const UnathorizedError = new Error('unathorized')

//  VALIDATE THE User REQUESTING THE MUTATION OR QUERY
export default async user => {

  try {

    if (!user || !user._id) throw UnathorizedError

    const thisUser = await User.findById(user._id)

    if (!thisUser || !thisUser._id || !thisUser.isActive) throw UnathorizedError

    return thisUser

  } catch (error) {
    throw UnathorizedError
  }
}