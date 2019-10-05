import { exec } from 'child_process';
import logger from "@modules/logger"
import {existsSync} from "fs-extra"

export const run = function({dir, name}){
  return new Promise((resolve, reject) => {
    let file = `${dir}/hooks/${name}`
    if (existsSync(file)){
      logger.log(`Running hook "${name}"`)
      exec(`sh ${file}`, (err, stdout, stderr) => {
        if (err) {
          logger.error(`Hook "${name}" failed!`)
          console.error(stderr);
          process.exit(-1)
          return
        }
        if (stdout) console.log(stdout.trim())
        resolve()
      });
    } else resolve()
  })
}