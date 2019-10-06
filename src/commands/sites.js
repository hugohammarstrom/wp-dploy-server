import config from "@modules/config";
import Table from "cli-table";
import logger from "@modules/logger"

export default async function(args) {
  let {sites=[]} = config
  if (sites.length == 0){
    logger.warn("No sites configured");
    return
  }
  if (args.format === "json"){
    console.log(JSON.stringify(sites, null, 2))
  } else {
    let table = new Table({
      head: ["Name", "Directory", "Repository"],
    });
    for (let i = 0; i < sites.length; i++) {
      const site = sites[i];
      table.push([site.name, site.dir, site.repo])
    }
    console.log(table.toString());
  }
}
