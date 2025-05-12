export default interface MinecraftLogMessage {
  timestamp: string;
  user: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  player?: string;
  message: string;
}
