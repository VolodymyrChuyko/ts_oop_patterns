import readline from 'readline';
import { State, ReadyState } from './state';

export class CoffeeMachine
{
    private __state!: State;
    public iterations = new Iterations();
    public ingredients: { [key: string]: { available: number; max: number } } = {
        'coffee': { available: 100, max: 100 },
        'water': { available: 300, max: 300 },
        'milk': { available: 300, max: 300 },
    };

    public beverageIndex = 0;
    public beverages: { name: string; recipe: { [key: string]:number }[] }[] = [
        { name: 'Espresso', recipe : [ { 'coffee': 10 }, { 'water': 30 } ] },
        { name: 'Double Espresso', recipe : [ { 'coffee': 20 }, { 'water': 60 } ] },
        { name: 'Cappuccino', recipe : [ { 'coffee': 10 }, { 'water': 30 }, { 'milk': 90 } ] },
        { name: 'Double Cappuccino', recipe: [ { 'coffee': 20 }, { 'water': 60 }, { 'milk': 180 } ] },
    ];

    public constructor(state: State = new ReadyState())
    {
        this.setState(state);
    }

    public setState(newState: State)
    {
        this.__state = newState;
        this.__state.setContext(this);
    }

    public async init()
    {
        let keyPressed = '';
        while (keyPressed != 'exit')
        {
            keyPressed = await this.__state.renderUserInterface();

            if (keyPressed === 'prev')
                this.__state.handlePrev();

            if (keyPressed === 'next')
                this.__state.handleNext();

            if (keyPressed === 'action')
                this.__state.handleAction();
        }
    }
}


export type Iteration = [ string, number, number ];
class Iterations
{
    private __iterations: Iteration[] = [];

    public isEmpty()
    {
        return !this.__iterations.length;
    }

    public push(item: Iteration)
    {
        this.__iterations.push(item);
    }

    public pop()
    {
        return this.__iterations.pop();
    }

    public peek()
    {
        return this.__iterations[this.__iterations.length - 1];
    }
}

type KeypressEvent = {
    sequence: string;
    name: string;
    code: string;
    ctrl: boolean;
    shift: boolean;
    meta: boolean;
};

export class UserInterface
{
    private __controller!: AbortController;
    private __uiCommands: { [k: string]: string } = {
        'return': 'action',
        'left': 'prev',
        'right': 'next',
        'CTRL+q': 'exit',
        'escape': 'exit',
        'CTRL+c': 'exit',
    };

    public constructor()
    {
        this.__setAbortController();
    }

    public async render(tips: string, action: string, msg: string, progress = ''): Promise<string>
    {
        console.clear();
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        console.log(tips);
        console.log(' ' + '-'.repeat(35));
        console.log('|' + ' '.repeat(35) + '|');
        console.log('|', action, ' '.repeat(10 - action.length), msg, ' '.repeat(20 - msg.length), '|');
        console.log('|', ' '.repeat(11), progress, ' '.repeat(20 - progress.length), '|');
        console.log('|' + ' '.repeat(35) + '|');
        console.log(' ' + '-'.repeat(35));

        try
        {
            const keyPressed = await this.__readKey();
            const keyName = keyPressed.ctrl? 'CTRL+' + keyPressed.name : keyPressed.name;

            if (this.__uiCommands[keyName])
                return this.__uiCommands[keyName];
        }
        catch { /* empty */ }
        finally
        {
            rl.close();
        }

        return '';
    }

    private __readKey = () =>
    {
        this.abortReadKey();
        this.__setAbortController();

        return new Promise((resolve: (value: KeypressEvent) => void, reject) =>
        {
            const listener = (_: unknown, key: KeypressEvent)=>
            {
                process.stdin.removeListener('keypress', listener);
                resolve(key);
            };
            const abort = () =>
            {
                process.stdin.removeListener('keypress', listener);
                reject(new Error('Aborted'));
            };

            process.stdin.on('keypress', listener );

            if (this.__controller.signal.aborted)
                abort();

            this.__controller.signal.addEventListener('abort', () => abort());
        });
    };

    private __setAbortController()
    {
        this.__controller = new AbortController();
    }

    public abortReadKey()
    {
        this.__controller.abort();
    }
}
