export default interface MinecraftLogMessage {
  timestamp?: string;
  user: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG' | string;
  player?: string;
  message: string;
}
