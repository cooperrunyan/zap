import { cliffy } from '../../../../deps.ts';
import { openApp } from '../../../lib/openApp.ts';

export const gui = new cliffy.Command();

gui
  .name('gui')
  .description("Open Zap's settings UI")
  .action(async () => {
    await openApp(['--settings']);
  });
