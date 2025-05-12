import { describe, expect, test } from 'vitest';
import { parseLogMessage } from './LogParser';
import type MinecraftLogMessage from '~/types/MinecraftLogMessage';

describe.each([
  {
    message:
      ' [04:56:27] [RCON Client /172.21.0.1 #38/INFO]: Thread RCON Client /172.21.0.1 shutting down',
    excludeRcon: true,
    expected: null,
  },
  {
    message:
      ' [04:54:50] [RCON Listener #2/INFO]: Thread RCON Client /172.21.0.1 started',
    excludeRcon: true,
    expected: null,
  },
  {
    message:
      ' [04:56:27] [RCON Client /172.21.0.1 #38/INFO]: Thread RCON Client /172.21.0.1 shutting down',
    excludeRcon: false,
    expected: {
      timestamp: '04:56:27',
      level: 'INFO',
      user: 'RCON Client /172.21.0.1 #38',
      message: 'Thread RCON Client /172.21.0.1 shutting down',
    } as Partial<MinecraftLogMessage>,
  },
  {
    message: ' [04:49:46] [Server thread/INFO]: [Not Secure] <dannypas00> t',
    excludeRcon: true,
    expected: {
      timestamp: '04:49:46',
      level: 'INFO',
      user: 'Server thread',
      player: 'dannypas00',
      message: 't',
    } as Partial<MinecraftLogMessage>,
  },
])('Parse log message $message', ({ message, excludeRcon, expected }) => {
  test(
    'should return expected ' + (excludeRcon ? 'without' : 'with') + ' rcon',
    () => {
      console.log(excludeRcon);
      const result = parseLogMessage(message, excludeRcon);
      if (expected === null) {
        expect(result).toBeNull();
      } else {
        expect(result).toMatchObject(expected);
      }
    },
  );
});
