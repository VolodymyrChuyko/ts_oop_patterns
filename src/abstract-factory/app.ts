import {
    ServerLoggerFactory,
    FileLoggerFactory,
    ConsoleLoggerFactory,
} from './factory';

import { clientCode } from './client-code';

const env = {
    'dev' : new ConsoleLoggerFactory(),
    'stage' : new FileLoggerFactory(),
    'prod' : new ServerLoggerFactory(),
};

const mapEnv:{ [key: number]: 'dev' | 'stage' | 'prod' } = {
    1: 'dev',
    2: 'stage',
    3: 'prod',
};

// instantiate one of the concrete factory classes, depending on the current environment
const currentEnv = mapEnv[Math.floor(Math.random() * 3) + 1];
export const loggerFactory = env[currentEnv];

export function app()
{
    void clientCode(loggerFactory);
}
