import fs from 'fs-extra';
import logger from '@modules/logger';
const config = require('yaml-config');

if(!fs.existsSync(process.env.config || '/etc/wp-dploy/config.yaml')) {
  logger.error(`Config not found at path: ${process.env.config || '/etc/wp-dploy/config.yaml'}`)
  process.exit(-1)
}
const settings = config.readConfig( process.env.config || '/etc/wp-dploy/config.yaml' ); // path from your app root without slash
export default settings