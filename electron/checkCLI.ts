import { exec } from 'child_process';
import { join } from 'path';

export async function checkCLI() {
  return new Promise<void>((resolve) => {
    exec('zap -V').on('close', (code) => {
      if (code !== 0) {
        console.log(`CLI not set up! Run: \`export PATH="$PATH:${join(__dirname, `../cli/`)}"\``);
        resolve();
      }
    });
  });
}
