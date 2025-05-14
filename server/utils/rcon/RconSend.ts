import getRconClient from '~/server/utils/rcon/RconClient';

export default async function (command: string): Promise<string[]> {
  const rcon = await getRconClient();

  try {
    const response = await rcon.send(command);

    return handleNewlines(command, response);
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send command',
      data: e,
    });
  }
}

/**
 * Add newlines where they are missing in common commands.
 * This is a workaround for https://bugs.mojang.com/browse/MC/issues/MC-7569
 *
 * @param command input command
 * @param response response from RCON
 * @return array of lines, to be joined by newlines in the front-end
 */
function handleNewlines(command: string, response: string): string[] {
  // If command was help, add newlines before each command
  if (command.startsWith('help') || command.startsWith('/help')) {
    return response
      .split('/')
      .filter((line) => !!line)
      .map((line) => `/${line.trim()}`);
  }

  // If command returns unknown command, put command on new line
  if (
    response.startsWith('Unknown or incomplete command, see below for error')
  ) {
    return response.replace('error', 'error\n').split('\n');
  }

  return [response];
}
