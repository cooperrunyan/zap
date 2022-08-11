import { cliffy } from '../../../../deps.ts';

export const help = new cliffy.Command();

help
  .name('help')
  .description('Get help for config settings')
  .arguments('[key:string]')
  .example('help', 'Displays all categories')
  .example('help theme', 'Displays the properties of the "theme" key')
  .example('help theme.backgroundColor', 'Displays the properties of the "theme.backgroundColor" key')
  .action(async (options, key) => {
    if (!key) null; // help with every index
  });
