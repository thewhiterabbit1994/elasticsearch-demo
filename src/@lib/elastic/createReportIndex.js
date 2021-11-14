export default async client => {
  const {
    body
  } = await client.indices.exists({
    index: 'report'
  })

  if (body) return print('index already exists')

  await client.indices.create({
    index: 'report'
  })

  await client.indices.putMapping({
    index: 'report',
    // type: 'staff',
    body: {
      properties: {
        title: {
          type: 'text'
        },
        description: {
          type: 'text'
        },
        location: {
          type: 'geo_point'
        },
        createdAt: {
          type: 'date'
        },
        updatedAt: {
          type: 'date'
        }
      }
    }
  })

  print('created the report index')
}