import { KubeConfig, Attach, Log } from '@kubernetes/client-node';
import { PassThrough } from 'node:stream';

const config = new KubeConfig();
config.loadFromDefault();
const attach = new Attach(config);
const log = new Log(config);

export async function attachToContainer() {
  const stdout = new PassThrough();
  const stderr = new PassThrough();
  const stdin = new PassThrough();
  const hostname: string = process.env['HOSTNAME'] ?? '';

  await attach.attach(
    'default',
    hostname,
    'minecraft',
    null,
    stderr,
    stdin,
    false,
  );

  await log.log('default', hostname, 'minecraft', stdout, {
    follow: true,
  });

  return { stdout, stderr, stdin };
}
