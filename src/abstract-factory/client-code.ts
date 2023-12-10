import { LoggerFactory } from './factory';

export async function clientCode (factory: LoggerFactory)
{
     // perform some operations and log the result
     let result = '';
     for (let i = 0; i < 10; i++)
         result += Math.floor(Math.random() * 10);

    const logInformer = factory.createLogInformer();
    console.log('Current log settings: ', logInformer.info());

    const logWriter = factory.createLogWriter();
    const loggerWriteIsSucceed = await logWriter.write(result);
    if (!loggerWriteIsSucceed)
        console.log('Logger error: can not log the result');

    // read logs
    const logReader = factory.createLogReader();
    console.log(await logReader.read());
}
