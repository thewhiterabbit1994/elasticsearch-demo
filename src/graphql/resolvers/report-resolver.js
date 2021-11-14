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

      await checkUser(user)

      const result = await getReportsInArea({
        location,
        distance
      })

      return result
    }
  },
  Mutation: {

  }
}