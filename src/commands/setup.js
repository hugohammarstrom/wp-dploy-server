import config from "@modules/config";
import logger from "@modules/logger";
import fs from "fs-extra"

import applicationSample from "@static/application-sample"
import customUploadDir from "@static/custom_upload_dir"
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

  logger.log(`Ensuring that ${dir}/data/uploads exists`);
  await fs.ensureDir(`${dir}/data/uploads`);

  logger.log(`Ensuring that ${dir}/data/config exists`);
  await fs.ensureDir(`${dir}/data/config`);

  if (!fs.existsSync(`${dir}/data/config/application.php`)) {
    logger.log(`Adding application.php to ${dir}/data/config`);
    await fs.writeFile(`${dir}/data/config/application.php`, applicationSample);
  }

  if (!fs.existsSync(`${dir}/data/config/custom_upload_dir.php`)) {
    logger.log(`Adding custom_upload_dir.php to ${dir}/data/config`);
    await fs.writeFile(`${dir}/data/config/custom_upload_dir.php`, customUploadDir);
  }

  logger.log(`Ensuring that ${dir}/hooks exists`);
  await fs.ensureDir(`${dir}/hooks`);

  if (!fs.existsSync(`${dir}/hooks/readme.md`)) {
    logger.log(`Adding readme.md to ${dir}/hooks`);
    await fs.writeFile(`${dir}/hooks/readme.md`, hooksReadme);
  }

  if (!fs.existsSync(`${dir}/hooks/pre-download`)) {
    logger.log(`Ensuring that ${dir}/hooks/pre-download exists`);
    await fs.ensureDir(`${dir}/hooks/pre-download`);
  }

  if (!fs.existsSync(`${dir}/hooks/pre-deploy`)) {
    logger.log(`Ensuring that ${dir}/hooks/pre-deploy exists`);
    await fs.ensureDir(`${dir}/hooks/pre-deploy`);
  }


  if (!fs.existsSync(`${dir}/hooks/post-download`)) {
    logger.log(`Ensuring that ${dir}/hooks/post-download exists`);
    await fs.ensureDir(`${dir}/hooks/post-download`);
  }

  if (!fs.existsSync(`${dir}/hooks/post-deploy`)) {
    logger.log(`Ensuring that ${dir}/hooks/post-deploy exists`);
    await fs.ensureDir(`${dir}/hooks/post-deploy`);
  }

  logger.success("Setup successfully completed!");
}
