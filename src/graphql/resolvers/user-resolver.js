import User from 'models/user'
const temporaryUserHolder = {}

export default {
  Query: {

  },
  Mutation: {
    sign_up_step_one: async (_, {
      data: {
        name,
        email,
        phoneNumber,
      }
    }) => {
      try {

        const doesUserExist = await User.checkIfUserExists(phoneNumber)

        if (doesUserExist) throw new Error('this phoneNumber already exists in the database')

        const thisUser = new User({
          name,
          email,
          phoneNumber,
          isActive: false
        })

        thisUser._createLoginObject()

        temporaryUserHolder[phoneNumber] = thisUser
        setTimeout(() => delete temporaryUserHolder[phoneNumber], 200 * 1000)

        // send an sms to the user containing thisUser.loginObject.code

        return {
          msg: 'ok'
        }

      } catch (error) {
        throw error
      }
    },
    sign_up_step_two: async (_, {
      phoneNumber,
      code
    }) => {

      try {

        if (!temporaryUserHolder[phoneNumber]) throw new Error('bad request')

        let thisUser = temporaryUserHolder[phoneNumber]

        await thisUser._validatCode(code)

        thisUser.isActive = true

        thisUser._clearLoginObject()
        thisUser = await thisUser.save()

        const token = thisUser._createToken()
        delete temporaryUserHolder[phoneNumber]

        return {
          token
        }

      } catch (error) {
        throw error
      }

    },
    login_step_one: async (_, {
      phoneNumber
    }) => {

      try {

        const thisUser = await User.findOne({
          phoneNumber
        })

        if (!thisUser) throw new Error('wrong phone number')

        thisUser._createLoginObject()

        await thisUser.save()
        // send an sms to the user containing thisUser.loginObject.code

        return {
          msg: 'ok'
        }


      } catch (error) {
        throw error
      }
    },
    login_step_two: async (_, {
      phoneNumber,
      code
    }) => {

      try {

        const thisUser = await User.findOne({
          phoneNumber
        })

        if (!thisUser) throw new Error('wrong phone number')

        await thisUser._validatCode(code)

        thisUser._clearLoginObject()

        await thisUser.save()

        const token = thisUser._createToken()

        return {
          token
        }

      } catch (error) {
        throw error
      }
    },
  }
}