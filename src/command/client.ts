import readline from 'readline/promises';
import { Invoker } from './invoker';
import {
    MoveDownCommand,
    MoveUpCommand,
    ICommand,
    TypeInCommand,
    ExitCommand,
    AddListItemCommand,
    IgnoreCommand,
    BackspaceCommand,
    CofigWizardCommand,
    DeleteListItemCommand,
    UndoCommand,
    CutListItemCommand,
    PasteListItemCommand,
    CopyListItemCommand,
} from './command';

type UICommands = { [k: string]: (...args: string[]) => ICommand };
const __DEFAULT_WORDS__: string[] = ['builder', 'Adapter', 'VISITOR'];

export async function app()
{
    const state = new State();
    const list = new ListOfWords(__DEFAULT_WORDS__);
    const ui = new UI();
    const commandHistry = new CommandHistory();
    const invoker = new Invoker(commandHistry);
    const moveUp = () => new MoveUpCommand(ui.cursor, list.size());
    const moveDown = () => new MoveDownCommand(ui.cursor, list.size());
    const typeIn = (char: string) => new TypeInCommand(state, char);
    const exit = () => new ExitCommand(state);
    const ignore = () => new IgnoreCommand();
    const addListItem = () => new AddListItemCommand(list, state, ui.cursor);
    const delListItem = () => new DeleteListItemCommand(list, ui.cursor);
    const cutListItem = () => new CutListItemCommand(list, state, ui.cursor);
    const pasteListItem = () => new PasteListItemCommand(list, state, ui.cursor);
    const copyListItem = () => new CopyListItemCommand(list, state, ui.cursor);
    const backspace = () => new BackspaceCommand(state);
    const cofigWizard = (currentCursor: string, currentFormat: string) => new CofigWizardCommand(ui, currentCursor, currentFormat);
    const undo = () => new UndoCommand(commandHistry);
    const uiCommands: UICommands = {
        'CTRL+q': exit,
        'escape': exit,
        'up': moveUp,
        'down': moveDown,
        'input': typeIn,
        'return': addListItem, //enter
        'left': ignore,
        'right': ignore,
        'backspace': backspace,
        'configWizard': cofigWizard,
        'CTRL+d': delListItem,
        'CTRL+x': cutListItem,
        'CTRL+v': pasteListItem,
        'CTRL+c': copyListItem,
        'CTRL+u': undo,
    };
    ui.setCommands(uiCommands);

    const configCommand = await ui.configWizard();
    if (configCommand && await ui.question('Do you want to apply new config?'))
    {
        invoker.setCommand(configCommand);
        invoker.executeCommand();
    }

    while (!state.isQuit)
    {
        const command = await ui.render(list.get(), state.input);
        invoker.setCommand(command);
        invoker.executeCommand();
    }
}

export class State
{
    public isQuit = false;
    public input = '';
    public clipboard = '';
}

export class CommandHistory
{
    private readonly __history: ICommand[] = [];

    public push(command: ICommand)
    {
        this.__history.push(command);
    }

    public pop()
    {
        if (this.isEmpty())
            return null;

        return this.__history.pop();
    }

    public isEmpty()
    {
        return !this.__history.length;
    }
}

export class ListOfWords
{
    private readonly __list: string[] = [];
    public constructor(words?: string | string[])
    {
        if (typeof words == 'string')
            this.add(words);

        if (Array.isArray(words))
            this.bulkAdd(words);
    }

    public size = () => this.__list.length;
    public add = (word: string) => this.__list.push(word);
    public get = () => [...this.__list];
    public getItem = (index: number) => this.__list[index] || '';
    public paste = (word: string, index: number) => this.__list.splice(index, 0, word);
    public remove = (index: number) => this.__list.splice(index, 1)[0];
    public clear = () => this.__list.length = 0;
    public bulkAdd = (words: string[]) => this.__list.push(...words);
}

type KeypressEvent = {
    sequence: string;
    name: string;
    code: string;
    ctrl: boolean;
    shift: boolean;
    meta: boolean;
};

export class UI
{
    public cursors: { [key: string]: () => Cursor } = {
        '[X]': () => new CursorX(),
        '[O]': () => new CursorO(),
        '->': () => new CursorArrow(),
    };

    public formats: { [key: string]: () => IFormat } = {
        'As is': () => new FormatAsIs(),
        'Upper Case': () => new FormatUpperCase(),
        'Lower Case': () => new FormatLowerCase(),
    };

    public cursor!: Cursor;
    public format!: IFormat;
    private __uiCommands: UICommands = {};

    public constructor()
    {
        this.config();
    }

    public config(cursor = '[X]', format = 'As is')
    {
        this.cursor = this.cursors[cursor]();
        this.format = this.formats[format]();
    }

    public setCommands(commands: UICommands)
    {
        this.__uiCommands = { ...this.__uiCommands, ...commands };
    }

    public async render(list: string[], input: string): Promise<ICommand>
    {
        console.clear();
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        list.forEach((item, i) =>
        {
            console.log(i === this.cursor.position ? this.cursor.type.active : this.cursor.type.inactive, this.format.apply(item));
        });

        rl.write(input);
        const keyPressed = await this.__readKey();
        const keyName = keyPressed.ctrl? 'CTRL+' + keyPressed.name : keyPressed.name;
        rl.close();

        if (this.__uiCommands[keyName])
            return this.__uiCommands[keyName]();

        return this.__uiCommands['input'](keyPressed.ctrl? '' : keyPressed.sequence);
    }

    private __readKey = () => new Promise((resolve: (value: KeypressEvent) => void) =>
    {
        const listener = (_: unknown, key: KeypressEvent)=>
        {
            process.stdin.removeListener('keypress', listener);
            resolve(key);
        };

        process.stdin.on('keypress', listener );
    });

    public async configWizard()
    {
        let answer = '';
        console.clear();
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        while (answer.toLowerCase() != 'y')
        {
            answer = await rl.question('Do you want to start configure? (y/n): ');

            if (answer.toLowerCase() === 'n')
            {
                rl.close();
                return null;
            }

        }
        rl.close();

        const cursorStyles = Object.keys(this.cursors);
        const formatStyles = Object.keys(this.formats);
        const currentCursor = await this.__chooseFromList(cursorStyles, 'Choose corsor style: ');
        const currentFormat = await this.__chooseFromList(formatStyles, 'Choose format style: ');

        return this.__uiCommands['configWizard'](currentCursor, currentFormat);
    }

    private async __chooseFromList(list: string[], question: string)
    {
        let answer = 'NaN';
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        console.clear();
        list.forEach((item, i) =>
        {
            console.log(i, item);
        });

        while (isNaN(+answer) || +answer < 0 || +answer > list.length - 1)
            answer = await rl.question(question);

        rl.close();

        return list[+answer];
    }

    public async question(question: string)
    {
        let answer = '';
        console.clear();
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        while (!['y', 'n'].includes(answer.toLowerCase()))
            answer = await rl.question(`${question} (y/n): `);
        rl.close();

        return answer.toLowerCase() === 'y';
    }
}

interface IFormat
{
    apply(item: string): string;
}

class FormatAsIs implements IFormat
{
    public apply = (item: string) =>
    {
        return item;
    };
}

class FormatUpperCase implements IFormat
{
    public apply = (item: string) =>
    {
        return item.toUpperCase();
    };
}

class FormatLowerCase implements IFormat
{
    public apply = (item: string) =>
    {
        return item.toLowerCase();
    };
}

export abstract class Cursor
{
    public position = 0;
    public abstract type: { active: string; inactive: string };
}

class CursorX extends Cursor
{
    public type = { active: '[X]', inactive: '[ ]' };
}

class CursorO extends Cursor
{
    public type = { active: '[O]', inactive: '[ ]' };
}

class CursorArrow extends Cursor
{
    public type = { active: '->', inactive: '  ' };
}
