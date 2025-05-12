import type MinecraftLogMessage from '~/types/MinecraftLogMessage';

export function parseLogMessage(
  message: string,
  excludeRcon: boolean = true,
): MinecraftLogMessage | null {
  const regex =
    /^.*\[(?<time>\d{2}:\d{2}:\d{2})]\s\[(?<user>.+)\/(?<level>INFO|WARN|ERROR|DEBUG)]: (?:.* <(?<player>.*)> )?(?<message>.*)$/;

  const match = message.match(regex);

  if (!match) {
    return null;
  }

  if (excludeRcon && match.groups?.user?.includes('RCON ')) {
    return null;
  }

  return {
    timestamp: match.groups?.time,
    user: match.groups?.user,
    level: match.groups?.level as 'INFO' | 'WARN' | 'ERROR' | 'DEBUG',
    player: match.groups?.player,
    message: match.groups?.message,
  } as MinecraftLogMessage;
}
