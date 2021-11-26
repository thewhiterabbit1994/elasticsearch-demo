import client from '../index'



export default async ({ index, query }) => {
  
  return client.search({
    index,
    body: {
      query
    }
  })

}