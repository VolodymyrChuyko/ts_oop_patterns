import { Logger, FileLogger, ServerLogger, ConsoleLogger } from './product';

export abstract class Process
{
    public abstract factoryMethod: () => Logger;


    public run = async () =>
    {
        const logger = this.factoryMethod();

        // perform some operations and log the result
        let result = '';
        for (let i = 0; i < 10; i++)
            result += Math.floor(Math.random() * 10);

        console.log('Current log settings: ', logger.info());
        const loggerIsSucceed = await logger.log(result);
        if (!loggerIsSucceed)
            console.log('Logger error: can not log the result');
    };
}

export class ProcessWithLoggingToServer extends Process
{
    public factoryMethod = () =>
    {
        return new ServerLogger;
    };
}

export class ProcessWithLoggingToFile extends Process
{
    public factoryMethod = () =>
    {
        return new FileLogger;
    };
}

export class ProcessWithLoggingToConsole extends Process
{
    public factoryMethod = () =>
    {
        return new ConsoleLogger;
    };
}
