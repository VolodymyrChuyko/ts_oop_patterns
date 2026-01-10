import { CoffeeMachine } from './context';
import {
    MakeCappuccino,
    MakeDoubleCappuccino,
    MakeDoubleEspresso,
    MakeEspresso,
} from './strategy';

const BEVERAGES = [
    { name: 'Espresso', strategy : () => new MakeEspresso() },
    { name: 'Double Espresso', strategy : () => new MakeDoubleEspresso() },
    { name: 'Cappuccino', strategy : () => new MakeCappuccino() },
    { name: 'Double Cappuccino', strategy: () => new MakeDoubleCappuccino() },
];

export async function client()
{
    let beverageIndex = 0;
    const coffeeMachine = new CoffeeMachine(BEVERAGES[beverageIndex].strategy());
    let keyPressed = '';

    while (keyPressed != 'exit')
    {
        keyPressed = await coffeeMachine.renderUserInterface(BEVERAGES[beverageIndex].name);

        if (keyPressed === 'prev')
            beverageIndex = beverageIndex > 0 ? beverageIndex - 1 : BEVERAGES.length - 1;

        if (keyPressed === 'next')
            beverageIndex = beverageIndex < (BEVERAGES.length - 1) ? beverageIndex + 1 : 0;

        if (keyPressed === 'start')
        {
            coffeeMachine.setStrategy(BEVERAGES[beverageIndex].strategy());
            await coffeeMachine.start();
        }
    }
}
