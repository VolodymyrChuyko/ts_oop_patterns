import { CalculatorModule, Memory, MathLib, NotationConverter } from './subsystem';

type Config = { decimals: number };

export class CalculatorFacade
{
    private __memory = new Memory();
    private __mathLib = new MathLib();
    private __calculator = new CalculatorModule(this.__memory, this.__mathLib);
    private __notationConverter = new NotationConverter();

    public reset()
    {
        this.__memory.reset();
    }

    public config(config: Config)
    {
        this.__mathLib.config(config.decimals);
    }

    public setInput(input: string)
    {
        this.__memory.setToDisplay(input);
    }

    public calculate()
    {
        const postfixNotation = this.__notationConverter.infixToPostfix(this.__memory.getToDisplay());
        this.__memory.setExpresion(postfixNotation);
        this.__calculator.run();

        return this.__memory.getToDisplay();
    }
}

