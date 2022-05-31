import { cliffy } from '../../../../deps.ts';

export const use = new cliffy.Command();

use
  .name('use')
  .description('Reinstall a specific Zap version')
  .arguments('<version:string>')
  .action((options, version) => {
    console.log(version);
  });
