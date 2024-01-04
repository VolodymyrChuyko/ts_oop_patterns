import { CommandHistory } from './client';
import { ICommand } from './command';

export class Invoker
{
    private __command: ICommand | null = null;
    private __commandHistory: CommandHistory;

    public constructor(commandHistory: CommandHistory)
    {
        this.__commandHistory = commandHistory;
    }

    public setCommand(command: ICommand)
    {
        this.__command = command;
    }

    public executeCommand()
    {
        if (!this.__command)
            return;

        this.__command.execute();

        if (this.__command.undo)
            this.__commandHistory.push(this.__command);
    }
}
