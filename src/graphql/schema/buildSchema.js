import {
  readFileSync,
  readdirSync
} from "fs"
import path from "path"

const dirname = path.join(process.cwd(), '/src/graphql/schema')

export default () =>
readdirSync(dirname) // not __dirname
  .filter(item => item.includes('.graphql'))
  .reduce((acc, cur) => {
    print(path.join(dirname, `/${cur}`))
    return acc + readFileSync(path.join(process.cwd(), `/src/graphql/schema/${cur}`), {
      encoding: "utf8"
    })
  }, '')