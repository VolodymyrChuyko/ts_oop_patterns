import path from 'path';
import { appendFile } from 'fs/promises';

export interface Logger
{
    log:(msg: string) => Promise<boolean>;
    info: () => string;
}

const LOG_SERVER_URL = 'https://httpbin.org/post';
export class ServerLogger implements Logger
{
    private __logServerURL = LOG_SERVER_URL;

    public log = async (msg: string) =>
    {
        try
        {
            const response = await fetch(this.__logServerURL, { method : 'POST', body: msg });
            return response.status === 200;
        }
        catch {return false}
    };

    public info = () => `Log to the server ${this.__logServerURL}`;
}

const FILE_NAME = 'log.txt';
export class FileLogger implements Logger
{
    private __logFilePath = path.resolve(FILE_NAME);

    public log = async (msg: string) =>
    {
        try
        {
            await appendFile(this.__logFilePath, msg + '\n');
            return true;
        }
        catch { return Promise.resolve(false) }
    };

    public info = () => `Log to the file ${this.__logFilePath}`;
}

export class ConsoleLogger implements Logger
{
    public log = (msg: string) =>
    {
        console.log(msg);
        return Promise.resolve(true);
    };

    public info = () => 'Log to the console';
}
