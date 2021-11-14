import {
  getReportsInArea
} from '@lib/elastic/readReports'

import checkUser from '@lib/utils/checkUser'

export default {
  Query: {
    getReportsInArea: async (_, {
      location,
      distance
    }, {
      user
    }) => {

      try {
        await checkUser(user)

        return getReportsInArea({
          location,
          distance
        })

      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {

  }
}