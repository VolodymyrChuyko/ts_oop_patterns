import path from 'path';
import { appendFile, readFile } from 'fs/promises';

export interface LogWriter
{
    write:(msg: string) => Promise<boolean>;
}

export interface LogReader
{
    read:() => Promise<string>;
}

export interface LogInformer
{
    info: () => string;
}

const LOG_SERVER_URL = 'https://httpbin.org';
export class ServerLogWriter implements LogWriter
{
    private __logServerURL = LOG_SERVER_URL + '/post';
    public write = async (msg: string) =>
    {
        try
        {
            const response = await fetch(this.__logServerURL, { method : 'POST', body: msg });
            return response.status === 200;
        }
        catch {return false}
    };
}

export class ServerLogReader implements LogReader
{
    private __logServerURL = LOG_SERVER_URL + '/get';
    public read = async () =>
    {
        try
        {
            const response = await fetch(this.__logServerURL, { method : 'GET' });
            const text = await response.text();
            return text;
        }
        catch {return 'Failed to read logs'}
    };
}

export class ServerLogInformer implements LogInformer
{
    public info = () => `Log to the server ${LOG_SERVER_URL}`;
}

const FILE_NAME = path.resolve('log.txt');
export class FileLogWriter implements LogWriter
{
    public write = async (msg: string) =>
    {
        try
        {
            await appendFile(FILE_NAME, msg + '\n');
            return true;
        }
        catch { return Promise.resolve(false) }
    };

}

export class FileLogReader implements LogReader
{
    public read = async () =>
    {
        try
        {
            const data = await readFile(FILE_NAME, { encoding: 'utf8' });
            return data;
        }
        catch { return Promise.resolve('Failed to read logs') }
    };
}

export class FileLogInformer implements LogInformer
{
    public info = () => `Log to the file ${FILE_NAME}`;
}

export class ConsoleLogWriter implements LogWriter
{
    public write = (msg: string) =>
    {
        console.log(msg);
        return Promise.resolve(true);
    };
}

export class ConsoleLogReader implements LogReader
{
    public read = () => Promise.resolve('Read operations are not supported for current logging settings.');
}

export class ConsoleLogInformer implements LogInformer
{
    public info = () => 'Log to the console';
}
