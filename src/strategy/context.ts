import readline from 'readline';
import { MakeCoffeStrategy } from './strategy';

export class CoffeeMachine
{
    private __strategy!: MakeCoffeStrategy;
    private __ui = new UserInterface;

    public constructor(strategy: MakeCoffeStrategy)
    {
        this.setStrategy(strategy);
    }

    public setStrategy(newStrategy: MakeCoffeStrategy)
    {
        this.__strategy = newStrategy;
    }

    public async start()
    {
        await this.__strategy.makeCoffee(this.__ui);
    }

    public renderUserInterface(beverage: string)
    {
        return this.__ui.renderControlDisplay(
            'Choose a beverage ("<"/">") and press "Enter" to start',
            beverage,
        );
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
    private __uiCommands: { [k: string]: string } = {
        'return': 'start',
        'left': 'prev',
        'right': 'next',
        'CTRL+q': 'exit',
        'escape': 'exit',
        'CTRL+c': 'exit',
    };

    public async renderControlDisplay(tips: string, msg: string): Promise<string>
    {
        const command = await this.__render(tips, msg);
        return command;
    }

    public async renderProgressDisplay(tips: string, msg: string, progress = 0, delay = 200): Promise<void>
    {
        await this.__render(tips, msg, progress, delay, false);
    }

    private async __render(tips: string, msg: string, progress = 0, delay = 200, readKey = true): Promise<string>
    {
        console.clear();
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        console.log(tips);
        console.log(' ' + '-'.repeat(30));
        console.log('|' + ' '.repeat(30) + '|');
        console.log('|  ', msg, ' '.repeat(25 - msg.length), '|');
        console.log('|  ', '|'.repeat(progress), ' '.repeat(25 - progress), '|');
        console.log('|' + ' '.repeat(30) + '|');
        console.log(' ' + '-'.repeat(30));

        let command = '';
        if (readKey)
        {
            const keyPressed = await this.__readKey();
            const keyName = keyPressed.ctrl? 'CTRL+' + keyPressed.name : keyPressed.name;

            if (this.__uiCommands[keyName])
                command = this.__uiCommands[keyName];
        }
        else
        {
            await this.__wait(delay);
        }

        rl.close();
        return command;
    }

    private __wait(delay: number): Promise<void>
    {
        return new Promise((resolve) =>
        {
          setTimeout(() => resolve(), delay);
        });
    }

    private __readKey = () =>
    {
        return new Promise((resolve: (value: KeypressEvent) => void) =>
        {
            const listener = (_: unknown, key: KeypressEvent)=>
            {
                process.stdin.removeListener('keypress', listener);
                resolve(key);
            };

            process.stdin.on('keypress', listener );
        });
    };
}
