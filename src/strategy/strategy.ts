import { UserInterface } from './context';

export abstract class MakeCoffeStrategy
{
    protected abstract __beverageName: string;
    protected abstract __steps: string[];
    public async makeCoffee(ui: UserInterface)
    {
        for (const step of this.__steps)
        {
            for (let i = 1; i < 11; i++)
            {
                await ui.renderProgressDisplay(
                    `Please, wait! Making your ${this.__beverageName}`,
                    step,
                    i,
                );
            }
        }
    }
}

export class MakeEspresso extends MakeCoffeStrategy
{
    protected __coffee = 10;
    protected __water = 30;
    protected __beverageName = 'espresso';
    protected __steps = [
        `Take ${this.__coffee}g of coffee`,
        'Grind coffee',
        'Press coffee',
        `Take ${this.__water}ml of water`,
        'Heat water',
        `Make ${this.__beverageName}`,
    ];
}

export class MakeDoubleEspresso extends MakeEspresso
{
    public constructor()
    {
        super();
        this.__coffee *= 2;
        this.__water *= 2;
        this.__beverageName = 'double espresso';
        this.__steps = [
            `Take ${this.__coffee}g of coffee`,
            'Grind coffee',
            'Press coffee',
            `Take ${this.__water}ml of water`,
            'Heat water',
            `Make ${this.__beverageName}`,
        ];
    }
}

export class MakeCappuccino extends MakeEspresso
{
    protected __milk = 90;

    public constructor()
    {
        super();
        this.__beverageName = 'cappuccino';
        this.__steps = [
            `Take ${this.__coffee}g of coffee`,
            'Grind coffee',
            'Press coffee',
            `Take ${this.__water}ml of water`,
            'Heat water',
            'Make espresso',
            `Take ${this.__milk}ml of milk`,
            'Froth milk',
            `Make ${this.__beverageName}`,
        ];
    }
}

export class MakeDoubleCappuccino extends MakeCappuccino
{
    public constructor()
    {
        super();
        this.__coffee *= 2;
        this.__water *= 2;
        this.__milk *= 2;
        this.__beverageName = 'double cappuccino';
        this.__steps = [
            `Take ${this.__coffee}g of coffee`,
            'Grind coffee',
            'Press coffee',
            `Take ${this.__water}ml of water`,
            'Heat water',
            'Make espresso',
            `Take ${this.__milk}ml of milk`,
            'Froth milk',
            `Make ${this.__beverageName}`,
        ];
    }
}
