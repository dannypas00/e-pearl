import type { JavaStatusResponse } from 'minecraft-server-util';

export const useServerStore = defineStore('Server', () => {

  async function sendCommand(command: string) {
    return await $fetch('/api/rcon/command', {
      method: 'POST',
      body: { command: command },
    });
  }

  return {
    status,
    sendCommand,
  }
});
