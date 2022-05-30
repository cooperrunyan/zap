import { cliffy } from '../../../../deps.ts';

export const cat = new cliffy.Command();

cat
  .name('cat')
  .description('Get the contents of the zap config file')
  .action(() => {
    console.log('contents');
  });
