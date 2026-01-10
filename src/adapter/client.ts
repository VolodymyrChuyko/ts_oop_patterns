import readline from 'readline';
import { MathLib } from './service';
import { MathModuleAdapter } from './adapter';

export function cliCalculator()
{
    const mathLib = new MathLib();                      // adaptee
    const mathModule = new MathModuleAdapter(mathLib);  // adapter
    const calculator = new Calculator(mathModule);      // client

    createInterface(calculator);
}

function createInterface(calc: Calculator)
{
    const cli = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    cli.question('Enter the expression to be calculated or "q" to exit:\n', (input) =>
    {
         cli.close();

        if (input === 'q')
        {
            console.log('Exiting...');
            return;
        }

        calc.setInput(input);
        console.log('=', calc.getResult());

        createInterface(calc);
    });
}

// target interface
export interface IMathModule
{
    calculate: (a: string, b: string, operator: string) => string;
    convert: (infixNotation: string) => string[];
}

const __OPERATIONS__ = [ '-', '+', '*', '/', '^' ];
class Calculator
{
    private __infixNotation!: string;
    private __mathModule: IMathModule;
    private __operations = __OPERATIONS__;

    public constructor(mathModule: IMathModule)
    {
        this.reset();
        this.__mathModule = mathModule;
    }

    public reset()
    {
        this.__infixNotation = '';
    }

    public setInput(input: string)
    {
        this.__infixNotation = input;
    }

    public getResult()
    {
        const stack: string[] = [];
        const postfixNotation = this.__convertFromInfixNotation();
        let index = 0;

        while (index < postfixNotation.length)
        {
            const current = postfixNotation[index];
            if (this.__operations.includes(current))
            {
                const b = stack.pop();
                const a = stack.pop();

                if (!a || !b)
                    throw new Error('Malformed expression: failed to calculate');

                stack.push(this.__mathModule.calculate(a, b, current));
            }
            else
            {
                stack.push(current);
            }

            index++;
        }

        this.reset();
        return stack[0];
    }

    private __convertFromInfixNotation = () =>
    {
        return this.__mathModule.convert(this.__infixNotation);
    };
}
