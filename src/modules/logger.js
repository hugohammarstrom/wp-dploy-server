import chalk from "chalk"

export default {
  log: (...log) => {
    console.log(`${chalk.blue("wp-dploy-server")}: ${log}`)
  },
  error: (...log) => {
    console.log(`${chalk.red("wp-dploy-server")}: ${log}`)
  },
  warn: (...log) => {
    console.log(`${chalk.yellow("wp-dploy-server")}: ${log}`)
  },
  success: (...log) => {
    console.log(`${chalk.green("wp-dploy-server")}: ${log}`)
  }
}