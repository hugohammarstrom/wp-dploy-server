import program from 'commander';
import * as commands from "@commands/"
import * as state from "@modules/state"
import logger from "@modules/logger"


program
  .command('cleanup')
  .description("Cleanup unused versions")
  .option('-s, --site <string>', 'site argument')
  .action(commands.cleanup);

program
  .command('deploy')
  .description("Download version from github and deploy")
  .option('-s, --site <string>', 'site argument')
  .option('-t, --tag <string>', 'tag argument')
  .option('-c, --cleanup', 'cleanup after deploy')
  .action(commands.deploy);

program
  .command('rollback')
  .description("Rollback to latest active version")
  .option('-s, --site <string>', 'site argument')
  .option('-c, --cleanup', 'cleanup after deploy')
  .action(async function(args) {
    if (!args.site){
      if (!args.site) return logger.error("No site specified: use flag '--site'");
    }
    let {history=[]} = await state.get({site: args.site})
    if (history.length >= 2){
      args.tag = history[history.length-2]
      await commands.deploy(args)
    } else {
      return logger.warn("Nothing to rollback to - skipping...")
    }
  });

program
  .command('setup')
  .description("Setup site at the desired directory")
  .option('-s, --site <string>', 'site argument')
  .action(commands.setup);

program
  .command('sites')
  .option("--format <string>", "print as json")
  .description("List all configured sites")
  .action(commands.sites);

program.parse(process.argv)

// Check the program.args obj
var NO_COMMAND_SPECIFIED = program.args.length === 0;

// Handle it however you like
if (NO_COMMAND_SPECIFIED) {
  // e.g. display usage
  program.help();
}