import createIndexes from './models'
import { Client } from '@elastic/elasticsearch'
import dotenv from 'dotenv'

dotenv.config()

const client = new Client({ node: process.env.ELASTICSEARCH_URL });

createIndexes(client)

// dont import this outside this folder
export default client