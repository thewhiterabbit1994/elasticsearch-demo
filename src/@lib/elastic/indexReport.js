import esClient from './index'

const Queue = []

const indexSingleReport = async report => {

  const {
    _id,
    ...rest
  } = report

  try {
    await esClient.index({
      index: 'report',
      body: {
        id: _id,
        ...rest
      }
    })

    print('successfully indexed')
  } catch (error) {
    print('error in indexing')
    print(error)
    Queue.push(report)
  }
}

// check every 10 minutes to see if there are
// failed index attemps and retry
setInterval(() => {
  const arr = [...Queue]
  Queue.length = 0
  arr.forEach(item => {
    indexSingleReport(item)
  })
}, 1000 * 60 * 10)

export default indexSingleReport