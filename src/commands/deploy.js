import config from "@modules/config";
import logger from "@modules/logger";
import * as github from "@modules/github";
import symlink from "symlink-dir";
import * as hooks from "@modules/hooks"
import * as state from "@modules/state"
import cleanup from "./cleanup"

export default async function(args) {
  let { tag = "latest", site: site_name } = args;
  if (!site_name) return logger.error("No site specified: use flag '--site'");
  if (!args.tag) {
    logger.warn("No tag specified, using latest...");
  }
  let site = config.sites.find(site => site.name == site_name);
  if (!site){
    logger.error("Site not found")
    process.exit(-1)
  }
  let { dir, repo } = site;

  logger.log("Fetching release info from github.com");
  let release = await github.get_release_from_tag({
    repo,
    tag
  });

  let {history=[]} = await state.get({ site: site.name });
  if (history[history.length-1] == release.tag_name){
    logger.warn("This version is already deployed")
    return 
  }

  await github.download_release({
    release,
    dir
  });

  logger.log(`Deploying version: ${release.tag_name}`);

  await hooks.run({ name: "pre-deploy", dir });
  await symlink(`${dir}/versions/${release.tag_name}`, `${dir}/current`);
  await hooks.run({ name: "post-deploy", dir });

  //Set history
  let siteState = await state.get({ site: site.name });
  siteState.history = siteState.history || [];
  siteState.history.push(release.tag_name);
  await state.set({ site: site.name, state: siteState });

  
  if (args.cleanup){
    await cleanup(args)
  }
  
  logger.success(`Version successfully deployed!`);
}
