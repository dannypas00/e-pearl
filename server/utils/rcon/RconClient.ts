import { Rcon } from 'rcon-client';

const runtimeConfig = useRuntimeConfig();

export default await Rcon.connect({
  host: runtimeConfig.minecraft.host as string,
  port: Number(runtimeConfig.rcon.port),
  password: runtimeConfig.rcon.password as string,
});
