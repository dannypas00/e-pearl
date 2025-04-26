export const useServerStore = defineStore('Server', () => {
  async function sendCommand(command: string) {
    return await $fetch('/api/rcon/command', {
      method: 'POST',
      body: { command: command },
    });
  }

  return {
    sendCommand,
  };
});
