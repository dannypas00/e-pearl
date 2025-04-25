import { Rcon } from 'rcon-client';

export default await Rcon.connect({
  host: process.env.MINECRAFT_HOST as string,
  port: Number(process.env.RCON_PORT),
  password: process.env.RCON_PASSWORD as string,
});
