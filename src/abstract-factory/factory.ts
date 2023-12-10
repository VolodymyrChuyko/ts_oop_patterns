import * as products from './products';

export interface LoggerFactory
{
    createLogWriter: () => products.LogWriter;
    createLogReader: () => products.LogReader;
    createLogInformer: () => products.LogInformer;
}

export class ServerLoggerFactory implements LoggerFactory
{
    public createLogWriter = () => new products.ServerLogWriter();
    public createLogReader = () => new products.ServerLogReader();
    public createLogInformer = () => new products.ServerLogInformer();
}

export class FileLoggerFactory implements LoggerFactory
{
    public createLogWriter = () => new products.FileLogWriter();
    public createLogReader = () => new products.FileLogReader();
    public createLogInformer = () => new products.FileLogInformer();
}

export class ConsoleLoggerFactory implements LoggerFactory
{
    public createLogWriter = () => new products.ConsoleLogWriter();
    public createLogReader = () => new products.ConsoleLogReader();
    public createLogInformer = () => new products.ConsoleLogInformer();
}
