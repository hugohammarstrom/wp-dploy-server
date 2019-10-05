import config from "@modules/config";
import logger from "@modules/logger";
import fs from "fs-extra"

import applicationSample from "@static/application-sample"
import hooksReadme from "@static/hooks-readme"

export default async function(args) {
  let { site: site_name } = args;
  if (!site_name) return logger.error("No site specified: use flag '--site'");
  let site = config.sites.find(site => site.name == site_name);
  if (!site){
    logger.error("Site not found")
    process.exit(-1)
  }

  let { dir } = site;

  logger.log(`Ensuring that ${dir} exists`);
  await fs.ensureDir(`${dir}`);

  logger.log(`Ensuring that ${dir}/data exists`);
  await fs.ensureDir(`${dir}/data`);

  logger.log(`Ensuring that ${dir}/data/wp-uploads exists`);
  await fs.ensureDir(`${dir}/data/wp-uploads`);

  logger.log(`Ensuring that ${dir}/config exists`);
  await fs.ensureDir(`${dir}/config`);

  if (!fs.existsSync(`${dir}/config/application.php`)) {
    logger.log(`Adding application.php to ${dir}/config`);
    await fs.writeFile(`${dir}/config/application.php`, applicationSample);
  }

  logger.log(`Ensuring that ${dir}/hooks exists`);
  await fs.ensureDir(`${dir}/hooks`);

  if (!fs.existsSync(`${dir}/hooks/readme.md`)) {
    logger.log(`Adding readme.md to ${dir}/hooks`);
    await fs.writeFile(`${dir}/hooks/readme.md`, hooksReadme);
  }

  logger.success("Setup successfully completed!");
}
