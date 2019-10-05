import fs from "fs-extra"
import config from "@modules/config"
import logger from "@modules/logger"

export const get = async function({site: site_name}){
  let site = config.sites.find(site => site.name == site_name);
  if (!site){
    logger.error("Site not found")
    process.exit(-1)
  }

  if (!fs.existsSync(`${site.dir}/state.json`)){
    await fs.writeJSON(`${site.dir}/state.json`, {history: []})
  }

  return await fs.readJson(`${site.dir}/state.json`)
}

export const set = async function({site: site_name, state}){
  let site = config.sites.find(site => site.name == site_name);
  await fs.writeJSON(`${site.dir}/state.json`, state)
}