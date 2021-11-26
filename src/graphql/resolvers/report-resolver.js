// import {
//   getReportsInArea
// } from '@lib/elastic/readReports'
import Report from 'models/report'
import { getReportsInArea } from '@lib/elastic/read/report'
import writeSingleReport from '@lib/elastic/write/report'

import checkUser from '@lib/utils/checkUser'

export default {
  Query: {
    getReportsInArea: async (_, { location, distance }, ctx) => {

      try {
        // athentication 
        // await checkUser(ctx.user)

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
    submitReport: async (_, report) => {
      try {
        const thisReport = await Report.create(report)

        // were intreseted in the plain object not the mongoos doc, hence deepClone
        writeSingleReport(deepClone(thisReport))

        return {
          msg: 'success'
        }

      } catch (error) {
        throw error
      }
    }
  }
}