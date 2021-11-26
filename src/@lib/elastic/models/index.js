import ReportIndex from './report'

const arr = [ReportIndex]

const createSingleIndex = (client, index) => {

  return new Promise(async (resolve, reject) => {

    try {

      const { body } = await client.indices.exists({ index: index.index })

      if (body) {
        print(`${index.index} index already exists`)
        return resolve('ok')
      }
      
      await client.indices.create({ index: index.index })
  
      await client.indices.putMapping(index)
  
      print(`created the ${index.index} index`)

      resolve('ok')
    } catch (error) {
      reject('nok')
    }
  })

}

export default async client => {

  try {

    const promisesArray = arr.map((item) => createSingleIndex(client, item))

    await Promise.all(promisesArray)

    print('created all the indexs')
  } catch (error) {
    print('###########################################################')
    print('there seems to be a problem, the code should never reach here')
    print('note: check elastic search url and make sure its really running')
    print('###########################################################')
    process.exit()
  }

}