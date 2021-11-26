export default {
  index: 'report',
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
}