import config from "@modules/config";
import logger from "@modules/logger";
import * as state from "@modules/state"
import fs from "fs-extra";

export default async function(args){
  let { site: site_name, all=true, max} = args;

  if (!site_name) return logger.error("No site specified: use flag '--site'");
  let site = config.sites.find(site => site.name == site_name);
  if (!site){
    logger.error("Site not found")
    process.exit(-1)
  }

  let versions = []
  let {history=[]} = await state.get({ site: site.name });
  if (all && !max){
    let current = history[history.length - 1]

    versions = await fs.readdir(`${site.dir}/versions`)
    versions = versions.filter(version => version !== current)
  } else if (max){
    let historyCommits = history.reverse().unique().reverse()
    versions = await fs.readdir(`${site.dir}/versions`)
    historyCommits = historyCommits.filter(commit => versions.includes(commit))

    versions = historyCommits.splice(0, Math.max(historyCommits.length - max, 0))
  }




  
  if (versions.length > 0){
    logger.log("Removing unused versions")
    for (let i = 0; i < versions.length; i++) {
      await fs.remove(`${site.dir}/versions/${versions[i]}`)
    }
    logger.success("Successfully removed all unused versions")
  } else {
    logger.warn("No versions to remove")
  }

}


Array.prototype.unique = function(){
  function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
  }
  return this.filter( onlyUnique );
}