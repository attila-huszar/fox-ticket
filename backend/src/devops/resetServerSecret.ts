import fs from 'fs';
import path from 'path';

function generateServerSecret(): string {
  let secret: string = '';
  const secretBase: string =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let i = 0; i < 64; i++) {
    secret += secretBase[Math.floor(Math.random() * 62)];
  }
  return secret;
}

export function resetServerSecret(): void {
  let env: string = '';
  const access: string = generateServerSecret();
  const refresh: string = generateServerSecret();

  try {
    fs.renameSync(
      path.join(__dirname, '..', '..', '.env.local'),
      path.join(__dirname, '..', '..', '.env.old'),
    );

    env = fs.readFileSync(
      path.join(__dirname, '..', '..', '.env.old'),
      'utf-8',
    );

    const envTemp = env.replace(/(?<=ACCESS_TOKEN=).*/, access);
    const envNew = envTemp.replace(/(?<=REFRESH_TOKEN=).*/, refresh);

    fs.writeFileSync(path.join(__dirname, '..', '..', '.env.local'), envNew);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    return;
  }
}
resetServerSecret();
