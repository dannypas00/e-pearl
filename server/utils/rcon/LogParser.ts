import type MinecraftLogMessage from '~/types/MinecraftLogMessage';

export function parseLogMessage(
  message: string,
  excludeRcon: boolean = true,
): MinecraftLogMessage | null {
  const regex =
    /^\s*\[(?<time>\d{2}:\d{2}:\d{2})]\s\[(?<user>.+)\/(?<level>INFO|WARN|ERROR|DEBUG)]: (?:\[.*] )?(?:<(?<player>.*)> )?(?<message>.*?)$/;

  // Remove carriage returns from buffer outputs
  const trimmedMessage = message.replace(/\r|\\r/, '');
  const match = trimmedMessage.match(regex);

  if (!match) {
    return {
      user: 'Server',
      level: 'INFO',
      message: trimmedMessage,
    } as MinecraftLogMessage;
  }

  if (excludeRcon && match.groups?.user?.includes('RCON ')) {
    return null;
  }

  return {
    timestamp: match.groups?.time,
    user: match.groups?.user,
    level: match.groups?.level,
    player: match.groups?.player,
    message: match.groups?.message.trim(),
  } as MinecraftLogMessage;
}
