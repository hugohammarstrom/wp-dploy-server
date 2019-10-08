import fs from "fs-extra"
import config from "@modules/config"
import logger from "@modules/logger"

export const get = async function({site: site_name, dir}){
  if (!dir){
    let site = config.sites.find(site => site.name == site_name);
    if (!site){
      logger.error("Site not found")
      process.exit(-1)
    }
    dir = site.dir
  }

  if (!fs.existsSync(`${dir}/state.json`)){
    await fs.writeJSON(`${dir}/state.json`, {history: []})
  }

  return await fs.readJson(`${dir}/state.json`)
}

export const set = async function({site: site_name, state, dir}){
  if (!dir){
    let site = config.sites.find(site => site.name == site_name);
    if (!site){
      logger.error("Site not found")
      process.exit(-1)
    }
    dir = site.dir
  }
  
  await fs.writeJSON(`${dir}/state.json`, state, {
    spaces: 2
  })
}