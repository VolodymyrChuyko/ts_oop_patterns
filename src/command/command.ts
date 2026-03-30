import { CommandHistory, Cursor, ListOfWords, State, UI } from './client';

export interface ICommand
{
    execute(): void;
    undo?(): void;
}

export class IgnoreCommand implements ICommand
{
    public execute() {}
}

export class CofigWizardCommand implements ICommand
{
    public ui: UI;
    public currentCursor: string;
    public currentFormat: string;

    public constructor(ui: UI, currentCursor: string, currentFormat: string)
    {
        this.ui = ui;
        this.currentCursor = currentCursor;
        this.currentFormat = currentFormat;
    }

    public execute()
    {
        this.ui.config(this.currentCursor, this.currentFormat);
    }
}

export class ExitCommand implements ICommand
{
    public appState: State;

    public constructor(appState: State)
    {
        this.appState = appState;
    }

    public execute()
    {
        this.appState.isQuit = true;
        console.clear();
    }
}

abstract class MoveCommand implements ICommand
{
    public listSize: number;
    public cursor: Cursor;

    public constructor(cursor: Cursor, listSize: number)
    {
        this.listSize = listSize;
        this.cursor = cursor;
    }

    public abstract execute(): void;
}

export class MoveUpCommand extends MoveCommand
{
    public execute()
    {
        console.log('Execute move up command');
        this.cursor.position--;
        if (this.cursor.position < 0)
            this.cursor.position = this.listSize - 1;
    }
}

export class MoveDownCommand extends MoveCommand
{
    public execute()
    {
        console.log('Execute move down command');
        this.cursor.position++;
            if (this.cursor.position > this.listSize - 1)
                this.cursor.position = 0;
    }
}

export class TypeInCommand implements ICommand
{
    public appState: State;
    public char: string;

    public constructor(appState: State, char: string)
    {
        this.appState = appState;
        this.char = char;
    }

    public execute()
    {
        this.appState.input += this.char ? this.char : '';
    }
}

export class BackspaceCommand implements ICommand
{
    public appState: State;

    public constructor(appState: State)
    {
        this.appState = appState;
    }

    public execute()
    {
        this.appState.input = this.appState.input.slice(0, -1);
    }
}

export class AddListItemCommand implements ICommand
{
    public list: ListOfWords;
    public appState: State;
    public cursor: Cursor;
    public backup: string[] = [];
    public cursorBackup!: number;

    public constructor(list: ListOfWords, appState: State, cursor: Cursor)
    {
        this.list = list;
        this.appState = appState;
        this.cursor = cursor;
    }

    public execute()
    {
        this.backup = this.list.get();
        this.cursorBackup = this.cursor.position;
        this.list.add(this.appState.input);
        this.appState.input = '';
        this.cursor.position = this.list.size() -1;
    }

    public undo()
    {
        this.list.clear();
        this.list.bulkAdd(this.backup);
        this.cursor.position = this.cursorBackup;
    }
}

export class PasteListItemCommand implements ICommand
{
    public list: ListOfWords;
    public appState: State;
    public cursor: Cursor;
    public backup: string[] = [];
    public cursorBackup!: number;

    public constructor(list: ListOfWords, appState: State, cursor: Cursor)
    {
        this.list = list;
        this.appState = appState;
        this.cursor = cursor;
    }

    public execute()
    {
        this.backup = this.list.get();
        this.cursorBackup = this.cursor.position;
        this.list.paste(this.appState.clipboard, this.cursor.position);
    }

    public undo()
    {
        this.list.clear();
        this.list.bulkAdd(this.backup);
        this.cursor.position = this.cursorBackup;
    }
}

export class DeleteListItemCommand implements ICommand
{
    public list: ListOfWords;
    public cursor: Cursor;
    public listBackup: string[] = [];
    public cursorBackup!: number;

    public constructor(list: ListOfWords, cursor: Cursor)
    {
        this.list = list;
        this.cursor = cursor;
    }

    public execute()
    {
        this.listBackup = this.list.get();
        this.cursorBackup = this.cursor.position;
        this.list.remove(this.cursor.position);
        if (this.cursor.position > 0)
            this.cursor.position--;
    }

    public undo()
    {
        this.list.clear();
        this.list.bulkAdd(this.listBackup);
        this.cursor.position = this.cursorBackup;
    }
}

export class CutListItemCommand implements ICommand
{
    public list: ListOfWords;
    public cursor: Cursor;
    public appState: State;
    public listBackup: string[] = [];
    public cursorBackup!: number;

    public constructor(list: ListOfWords, appState: State, cursor: Cursor)
    {
        this.list = list;
        this.cursor = cursor;
        this.appState = appState;
    }

    public execute()
    {
        this.listBackup = this.list.get();
        this.cursorBackup = this.cursor.position;
        this.appState.clipboard = this.list.remove(this.cursor.position);
        if (this.cursor.position > 0)
            this.cursor.position--;
    }

    public undo()
    {
        this.list.clear();
        this.list.bulkAdd(this.listBackup);
        this.cursor.position = this.cursorBackup;
    }
}

export class CopyListItemCommand implements ICommand
{
    public list: ListOfWords;
    public cursor: Cursor;
    public appState: State;

    public constructor(list: ListOfWords, appState: State, cursor: Cursor)
    {
        this.list = list;
        this.cursor = cursor;
        this.appState = appState;
    }

    public execute()
    {
        this.appState.clipboard = this.list.getItem(this.cursor.position);
    }
}

export class UndoCommand implements ICommand
{
    public comandHistory: CommandHistory;

    public constructor(comandHistory: CommandHistory)
    {
        this.comandHistory = comandHistory;
    }

    public execute()
    {
        const command = this.comandHistory.pop();
        if (command && command.undo)
            command.undo();
    }
}
