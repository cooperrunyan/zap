import { cliffy } from '../../../../deps.ts';

export const gui = new cliffy.Command();

gui
  .name('gui')
  .description("Open Zap's settings UI")
  .action(() => {
    console.log('opening...');
  });
