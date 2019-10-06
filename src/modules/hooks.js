import { exec } from 'child_process';
import logger from "@modules/logger"
import indentString from "indent-string"
import fs, {existsSync, lstat} from "fs-extra"



export const run = function({dir, name}){
  return new Promise(async (resolve, reject) => {
    let file = `${dir}/hooks/${name}`
    if (existsSync(file)){
      let stat = await lstat(file)
      if (stat.isFile()){
        logger.log(`Running hook "${name}"`)
        await run_hook_file({file, name})
        resolve()
      } else {
        let files = await fs.readdir(file)
        if (files.length > 0){
          logger.log(`Running hook "${name}"`)
          for (let i = 0; i < files.length; i++) {
            console.log(`--> Running ${files[i]} (${i+1}/${files.length})`)
            await run_hook_file({file: `${file}/${files[i]}`, name, indent: 3})
          }
        }
        resolve()
      }
      
    } else resolve()
  })
}


const run_hook_file = async function({file, name, indent=0}){
  return new Promise((resolve) => {
    exec(`sh ${file}`, (err, stdout, stderr) => {
      if (err) {
        logger.error(`Hook "${name}" failed!`)
        console.error(stderr);
        process.exit(-1)
        return
      }
      if (stdout) console.log(indentString(stdout.trim(), indent))
      resolve()
    });
  })
}