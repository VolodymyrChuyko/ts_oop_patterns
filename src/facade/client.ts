import { CalculatorFacade } from './facade';

export class CalculatorApp
{
    private __calc = new CalculatorFacade();

    public constructor()
    {
        this.__calc.config({ decimals: 3 });
    }

    public reset()
    {
        this.__calc.reset();
    }

    public setInput(input: string)
    {
        this.__calc.setInput(input);
    }

    public calculate()
    {
        return this.__calc.calculate();
    }
}
