import { CoffeeMachine, UserInterface } from './context';

export abstract class State
{
    protected __context!: CoffeeMachine;
    protected __ui!: UserInterface;

    public constructor()
    {
        this.__ui = new UserInterface();
    }

    public setContext(context: CoffeeMachine)
    {
        this.__context = context;
    }

    protected __wait(delay: number): Promise<string>
    {
        return new Promise((resolve) =>
        {
          setTimeout(() => resolve(''), delay);
        });
    }

    public handlePrev() {}
    public handleNext() {}
    public handleAction() {}
    public abstract renderUserInterface(): Promise<string>;
}

export class ReadyState extends State
{
    public handlePrev()
    {
        this.__context.beverageIndex--;
        if (this.__context.beverageIndex < 0)
            this.__context.beverageIndex = this.__context.beverages.length - 1;
    }

    public handleNext()
    {
        this.__context.beverageIndex++;
        if (this.__context.beverageIndex > this.__context.beverages.length - 1)
            this.__context.beverageIndex = 0;
    }

    public renderUserInterface()
    {
        return this.__ui.render(
            'Choose a beverage (use "<"/">")',
            '[Start]',
            this.__context.beverages[this.__context.beverageIndex].name,
        );
    }

    public handleAction()
    {
        const recipe = this.__context.beverages[this.__context.beverageIndex].recipe
            .map(item => Object.entries(item)[0]);
        while (recipe.length)
        {
            const [ingredient, quantity] = recipe.pop() as [string, number];
            let fraction = Math.ceil(quantity / 10);
            let remaining = quantity;
            for (let i = 0; i < 10; i++)
            {
                if (fraction > remaining)
                    fraction = remaining;

                this.__context.iterations.push([ingredient, fraction, 10 - i]);
                remaining -= fraction;
            }
        }
        this.__context.setState(new WorkingState());
    }
}

export class WorkingState extends State
{
    public async renderUserInterface()
    {
        if (this.__context.iterations.isEmpty())
        {
            this.__context.setState(new DoneState());
            return '';
        }

        const [ingredient, quantity, stepNum] = this.__context.iterations.peek() as [ string, number, number ];

        if (quantity > this.__context.ingredients[ingredient].available)
        {
            this.__context.setState(new ErrorState());
            return '';
        }

        this.__context.ingredients[ingredient].available -= quantity;
        this.__context.iterations.pop();
        const render = this.__ui.render(
            `Please, wait! Making your ${this.__context.beverages[this.__context.beverageIndex].name}`,
            '[Pause]',
            `Preparing ${ingredient}`,
            '|'.repeat(stepNum),
        );
        const delay = this.__wait(400);
        const command: string = await Promise.any([render, delay]);
        this.__ui.abortReadKey();

        return command;
    }

    public handleAction()
    {
        this.__context.setState(new PausedState());
    }
}

export class PausedState extends State
{
    public async renderUserInterface()
    {
        if (this.__context.iterations.isEmpty())
        {
            this.__context.setState(new WorkingState());
            return '';
        }

        const [ingredient, , stepNum] = this.__context.iterations.peek() as [ string, number, number ];
        return this.__ui.render(
            `Please, wait! Making your ${this.__context.beverages[this.__context.beverageIndex].name}`,
            '[Resume]',
            `Preparing ${ingredient}`,
            '|'.repeat(stepNum) + ' '.repeat(11 - stepNum) + 'paused...',
        );
    }

    public handleAction()
    {
        this.__context.setState(new WorkingState());
    }
}

export class DoneState extends State
{
    public async renderUserInterface()
    {
        const render = this.__ui.render('Done!', '[OK]', 'Enjoy your coffee :)');
        const delay = this.__wait(3000);
        await Promise.any([render, delay]);
        this.__ui.abortReadKey();
        this.__context.setState(new ReadyState());

        return '';
    }
}

export class ErrorState extends State
{
    public renderUserInterface()
    {
        const [ingredient] = this.__context.iterations.peek() as [ string, number, number ];
        // assume that you have filled the machine with the required ingredient
        this.__context.ingredients[ingredient].available = this.__context.ingredients[ingredient].max;

        return this.__ui.render(`Fill with ${ingredient} and press "Cancel" to clear the error`, '[Cancel]', `No ${ingredient}`);
    }

    public handleAction()
    {
        this.__context.setState(new WorkingState());
    }
}
