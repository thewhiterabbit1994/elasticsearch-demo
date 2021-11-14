import {
  readFileSync,
  readdirSync
} from "fs"
import path from "path"

export default () =>
readdirSync(__dirname)
  .filter(item => item.includes('.graphql'))
  .reduce((acc, cur) => acc + readFileSync(path.join(__dirname, `/${cur}`), {
    encoding: "utf8"
  }), '')