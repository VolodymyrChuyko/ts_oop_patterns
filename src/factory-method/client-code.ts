import {
    Process,
    ProcessWithLoggingToConsole,
    ProcessWithLoggingToFile,
    ProcessWithLoggingToServer,
} from './creator';

const env = {
    'dev' : new ProcessWithLoggingToConsole(),
    'stage' : new ProcessWithLoggingToFile(),
    'prod' : new ProcessWithLoggingToServer(),
};

const mapEnv:{ [key: number]: 'dev' | 'stage' | 'prod' } = {
    1: 'dev',
    2: 'stage',
    3: 'prod',
};

export function client()
{
    // run a concrete process depending on the current environment
    const currentEnv = mapEnv[Math.floor(Math.random() * 3) + 1];
    const process: Process = env[currentEnv];

    void process.run();
}
