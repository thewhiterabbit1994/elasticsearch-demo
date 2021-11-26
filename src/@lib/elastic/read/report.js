import readFromElastic from './index'

export const getReportsInArea = async ({ distance, location }) => {
  
  const { body: { hits: { hits } } } = await readFromElastic({
    index: 'report',
    query: {
      "bool": {
        "must": [],
        "filter": {
          "geo_distance": {
            "distance": `${distance}km`,
            location
          }
        }
      }
    }
  })

  return hits.map(({ _source: { id, ...rest } }) => ({
    _id: id,
    ...rest
  }))

}