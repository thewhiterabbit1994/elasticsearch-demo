import client from './index'

export const getReportsInArea = async ({
  location,
  distance
}) => {

  const {
    body
  } = await client.search({
    index: 'report',
    body: {
      "query": {
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
    }
  })

  const results = body.hits.hits.map(({
    _source: {
      id,
      ...rest
    }
  }) => {
    return {
      _id: id,
      ...rest
    }
  })

  return results
}